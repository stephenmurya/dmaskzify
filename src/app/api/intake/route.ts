import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type IntakeType =
  | "live_notifications"
  | "newsletter"
  | "merch_alert"
  | "artist_submission";

type IntakePayload = {
  type: IntakeType;
  email: string;
  name?: string;
  genre?: string;
  links?: string;
};

type IntakeRecord = IntakePayload & {
  submittedAt: string;
};

const intakeFilePath = path.join(process.cwd(), "data", "intake-submissions.json");

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePayload(input: unknown): IntakePayload | null {
  if (!input || typeof input !== "object") {
    return null;
  }

  const payload = input as Record<string, unknown>;
  const type = payload.type;
  const email = payload.email;

  const validType =
    type === "live_notifications" ||
    type === "newsletter" ||
    type === "merch_alert" ||
    type === "artist_submission";

  if (!validType || typeof email !== "string" || !isValidEmail(email)) {
    return null;
  }

  const output: IntakePayload = {
    type,
    email,
  };

  if (typeof payload.name === "string") {
    output.name = payload.name;
  }
  if (typeof payload.genre === "string") {
    output.genre = payload.genre;
  }
  if (typeof payload.links === "string") {
    output.links = payload.links;
  }

  if (output.type === "artist_submission") {
    if (!output.name || !output.genre || !output.links) {
      return null;
    }
  }

  return output;
}

async function saveRecord(record: IntakeRecord) {
  const directory = path.dirname(intakeFilePath);
  await mkdir(directory, { recursive: true });

  let current: IntakeRecord[] = [];
  try {
    const content = await readFile(intakeFilePath, "utf8");
    current = JSON.parse(content) as IntakeRecord[];
  } catch {
    current = [];
  }

  current.push(record);
  await writeFile(intakeFilePath, JSON.stringify(current, null, 2), "utf8");
}

async function forwardToWebhook(record: IntakeRecord) {
  const webhookUrl = process.env.INTAKE_WEBHOOK_URL;
  if (!webhookUrl) {
    return;
  }

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
    });
  } catch {
    // Persisting locally is the primary path for Phase 1.
  }
}

export async function POST(request: Request) {
  const body = (await request.json()) as unknown;
  const payload = validatePayload(body);

  if (!payload) {
    return NextResponse.json(
      { message: "Invalid request. Check required fields." },
      { status: 400 },
    );
  }

  const record: IntakeRecord = {
    ...payload,
    submittedAt: new Date().toISOString(),
  };

  await saveRecord(record);
  await forwardToWebhook(record);

  if (payload.type === "artist_submission") {
    return NextResponse.json({
      message: "Artist submission received. We will reach out by email.",
    });
  }

  return NextResponse.json({
    message: "Thanks. You are now on the update list.",
  });
}
