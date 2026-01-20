import { GeneratedFile } from "@/types/file";

export type JobStatus = "pending" | "done" | "error";

interface Job {
  status: JobStatus;
  progress: number;
  files?: GeneratedFile[];
  error?: string;
  createdAt: number;
}

const JOB_TTL = 1000 * 60 * 30; // 30 minutes

const jobs = new Map<string, Job>();

export function createJob(id: string) {
  jobs.set(id, {
    status: "pending",
    progress: 0,
    createdAt: Date.now(),
  });
}

export function updateJob(
  id: string,
  update: Partial<Job>
) {
  const job = jobs.get(id);
  if (!job) return;
  jobs.set(id, { ...job, ...update });
}

export function getJob(id: string) {
  return jobs.get(id);
}

export function cleanupJobs() {
  const now = Date.now();
  for (const [id, job] of jobs.entries()) {
    if (now - job.createdAt > JOB_TTL) {
      jobs.delete(id);
    }
  }
}
