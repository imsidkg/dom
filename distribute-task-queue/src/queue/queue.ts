import { Job, Queue, type BackoffOptions, type JobsOptions } from "bullmq";

interface EnqueueOptions extends JobsOptions {
  priority?: number;
  attempts?: number;
  backoff?: number | BackoffOptions;
}

export class TaskEnqueue {
  queue: Queue;
  dlq: Queue;

  constructor(name: string, connection: any) {
    this.queue = new Queue(name, { connection });
    this.dlq = new Queue("dead-letter", { connection });
  }

  enqueue = async (
    type: string,
    payload: any,
    options: EnqueueOptions = {}
  ): Promise<Job> => {
    return this.queue.add(type, payload, {
      attempts: options.attempts ?? 3,
      priority: options.priority,
      backoff: options.backoff ?? { type: "exponential", delay: 3000 },
      removeOnComplete: true,
    });
  };

  enqueueDelayed = async (
    type: string,
    payload: any,
    delay: number,
    options: EnqueueOptions = {}
  ): Promise<Job> => {
    return this.queue.add(type, payload, {
      attempts: options.attempts ?? 3,
      priority: options.priority,
      delay,
      backoff: options.backoff ?? { type: "exponential", delay: 3000 },
      removeOnComplete: true,
    });
  };

  enqueueCron = async (
    type: string,
    payload: any,
    cronExp: string,
    options: EnqueueOptions = {}
  ): Promise<Job> => {
    return this.queue.add(type, payload, {
      attempts: options.attempts ?? 3,
      priority: options.priority,
      repeat: { pattern: cronExp },
      backoff: options.backoff ?? { type: "exponential", delay: 3000 },
      removeOnComplete: true,
    });
  };

  moveToDeadLetter = async (job: Job, reason: string) => {
    const payload = {
      originalQueue: this.queue.name,
      originalJobId: job.id,
      type: job.name,
      payload: job.data,
      attemptsMade: job.attemptsMade,
      failedReason: reason ?? job.failedReason,
      timestamp: Date.now(),
    };
  };
}
