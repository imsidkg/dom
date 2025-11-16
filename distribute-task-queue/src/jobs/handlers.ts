import type { Job } from "bullmq";

export const handlers = {
  email: async (data: Job["data"], updateProgress: Job["updateProgress"]) => {
    let promise = Promise.resolve();
    for (let i = 0; i < 5; i++) {
      promise = promise
        .then(() => new Promise((res) => setTimeout(res, 300)))
        .then(() => updateProgress(i * 20));
    }

    return { status: "sent", to: data.to };
  },

  videoProcess: async (
    data: Job["data"],
    updateProgress: Job["updateProgress"]
  ) => {
    let promise = Promise.resolve();
    for (let i = 0; i < 5; i++) {
      promise = promise
        .then(() => new Promise((res) => setTimeout(res, 300)))
        .then(() => updateProgress(i * 20));
    }

    return { status: "sent", to: data.videoId };
  },
};
