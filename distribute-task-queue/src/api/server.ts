import express, { type Request, type Response } from "express";
import cors from "cors";
import { QueueEvents } from "bullmq";
import { taskQueue } from "../queue/worker";
import cron from "node-cron";
const app = express();

app.use(cors());
app.use(express.json());

const queueEvents = new QueueEvents("tasks", {
  connection: taskQueue.queue.opts.connection,
});

app.post("/jobs", async (req, res) => {
  try {
    const { type, payload, priority, delay, maxAttempts } = req.body;

    if (!type) {
      return res.status(400).json({ error: "type is required" });
    }

    let job;

    if (delay) {
      job = await taskQueue.enqueueDelayed(type, payload, delay, {
        priority,
        attempts: maxAttempts,
      });
    } else {
      job = await taskQueue.enqueue(type, payload, {
        priority,
        attempts: maxAttempts,
      });
    }

    res.json({ jobId: job.id });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/jobs/:id", async (req, res) => {
  try {
    const job = await taskQueue.queue.getJob(req.params.id);

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.json({
      id: job.id,
      name: job.name,
      status: await job.getState(),
      progress: job.progress,
      attemptsMade: job.attemptsMade,
      returnvalue: job.returnvalue,
      failedReason: job.failedReason,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/jobs/cron", async (req, res) => {
  try {
    const { type, payload, cron: cronExp } = req.body;

    if (!cronExp) {
      return res.status(400).json({ error: "cron pattern is required" });
    }

    cron.schedule(cronExp, () => {
      console.log(`⏱ Running cron job: ${type}`);
      taskQueue.enqueue(type, payload);
    });

    res.json({ scheduled: true, cron: cronExp });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000);
