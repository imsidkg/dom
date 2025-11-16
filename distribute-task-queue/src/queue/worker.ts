import Redis from "ioredis";
import { TaskEnqueue } from "./queue";
import { Job, Worker } from "bullmq";
import { handlers } from "../jobs/handlers";

const connection = new Redis();
export const taskQueue = new TaskEnqueue("tasks", connection);

export const worker = new Worker(
  "tasks",
  async (job: Job) => {
    const handler = handlers[job.name as keyof typeof handlers];

    if (!handler) {
      throw new Error(`No handler registered for job type : ${job.name}`);
    }

    const updateProgress = (p: number) => job.updateProgress(p);

    const result = await handler(job.data, updateProgress);

    return result;
  },
  {
    connection,
    concurrency: 10,
  }
);

worker.on(
  "failed",
  async (job: Job | undefined, error: Error, prev: string) => {
    if (!job) return;
    const attempts = job.opts.attempts || 1;
    const attemptsMade = job.attemptsMade;
    const isFinalAttempt = attempts - attemptsMade;

    if (isFinalAttempt) {
      await taskQueue.moveToDeadLetter(job, error.message);
    }
  }
);

worker.on("completed", async (job, result) => {
  if (job.name === "email") {
    return taskQueue.enqueue("processVideo", { videoId: job.data.videoId });
  }

  if (job.name === "processVideo") {
    return taskQueue.enqueueDelayed(
      "notifyUser",
      { userId: job.data.userId },
      10_000
    );
  }
});
