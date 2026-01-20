import { NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { generateArchitecture } from "@/lib/generators";
import { createZipStream } from "@/lib/zip";
import { rateLimit } from "@/lib/rateLimiter";
import {
  createJob,
  updateJob,
  getJob,
  cleanupJobs,
} from "@/lib/jobs";
import { getSession } from "@/lib/session";

export async function POST(req: NextRequest) {
  cleanupJobs();

  const ip =
    req.headers.get("x-forwarded-for") ?? "local";

  if (!rateLimit(ip)) {
    return new Response("Too many requests", { status: 429 });
  }

  const config = await req.json();

  const { apiKey, aiProvider } = await getSession();

  if (!config.framework) {
    return new Response(
      JSON.stringify({ error: "Invalid framework" }),
      { status: 400 }
    );
  }

  if (!config.description) {
    return new Response(
      JSON.stringify({ error: "Invalid project description" }),
      { status: 400 }
    );
  }

  if (!apiKey || !aiProvider) {
    return new Response(
      JSON.stringify({ error: "Missing required AI config" }),
      { status: 400 }
    );
  }

  const jobId = uuidv4();
  createJob(jobId);

  try {
    const files = await generateArchitecture(
      { ...config, apiKey, aiProvider },
      {
        onProgress: (progress) => updateJob(jobId, { progress }),
      }
    );

    updateJob(jobId, { status: "done", progress: 100, files });

    return Response.json({ jobId, files });
  } catch (err: any) {
    console.error("Generation failed:", err);

    updateJob(jobId, { status: "error", progress: 0, error: err?.message });

    return new Response(
      JSON.stringify({
        error:
          // err?.message ||
          "Generation failed. Please check your quota and retry later.",
      }),
      { status: 429 }
    );
  }
}

export async function GET(req: NextRequest) {
  const jobId = req.nextUrl.searchParams.get("id");
  if (!jobId)
    return new Response("Missing job ID", {
      status: 400,
    });

  const job = getJob(jobId);
  if (!job)
    return new Response("Job not found", {
      status: 404,
    });

  if (job.status !== "done" || !job.files) {
    return Response.json({
      status: job.status,
      progress: job.progress,
    });
  }

  const stream = await createZipStream(job.files);

  return new Response(stream, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="ui-scaffold-${jobId}.zip"`,
    },
  });
}
