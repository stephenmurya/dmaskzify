import { mkdir, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { NextResponse } from "next/server";

/**
 * Local JSON storage remains the primary intake record.
 * Google Sheets forwarding (via Apps Script webhook) is a secondary pathway.
 * This provides lightweight CRM tracking without introducing a database.
 */
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
  source?: string;
};

type IntakeRecord = IntakePayload & {
  submittedAt: string;
};

type WebhookFormType =
  | "newsletter"
  | "live_alert"
  | "merch_alert"
  | "artist_submission";

type WebhookPayload = {
  formType: WebhookFormType;
  timestamp: string;
  name: string | null;
  email: string;
  genre: string | null;
  links: string | null;
  source: string | null;
};

const primaryIntakeFilePath = path.join(
  process.cwd(),
  "data",
  "intake-submissions.json",
);
const fallbackIntakeFilePath = path.join(
  tmpdir(),
  "dmaskzify",
  "intake-submissions.json",
);

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
  if (typeof payload.source === "string") {
    output.source = payload.source;
  }

  if (output.type === "artist_submission") {
    if (!output.name || !output.genre || !output.links) {
      return null;
    }
  }

  return output;
}

async function saveRecordToPath(record: IntakeRecord, filePath: string) {
  const directory = path.dirname(filePath);
  await mkdir(directory, { recursive: true });

  let current: IntakeRecord[] = [];
  try {
    const content = await readFile(filePath, "utf8");
    current = JSON.parse(content) as IntakeRecord[];
  } catch {
    current = [];
  }

  current.push(record);
  await writeFile(filePath, JSON.stringify(current, null, 2), "utf8");
}

async function saveRecord(record: IntakeRecord) {
  try {
    await saveRecordToPath(record, primaryIntakeFilePath);
  } catch (primaryError) {
    console.error(
      "Primary intake file write failed. Trying tmp fallback.",
      primaryError,
    );
    await saveRecordToPath(record, fallbackIntakeFilePath);
  }
}

function toWebhookFormType(type: IntakeType): WebhookFormType {
  if (type === "live_notifications") {
    return "live_alert";
  }
  return type;
}

function toWebhookPayload(record: IntakeRecord): WebhookPayload {
  return {
    formType: toWebhookFormType(record.type),
    timestamp: record.submittedAt,
    name: record.name ?? null,
    email: record.email,
    genre: record.genre ?? null,
    links: record.links ?? null,
    source: record.source ?? null,
  };
}

async function forwardToWebhook(record: IntakeRecord) {
  const webhookUrl = process.env.INTAKE_WEBHOOK_URL;
  if (!webhookUrl) {
    return;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => {
    controller.abort();
  }, 5000);

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(toWebhookPayload(record)),
      signal: controller.signal,
    });

    if (!response.ok) {
      console.error(
        `Intake webhook failed with status ${response.status} ${response.statusText}`,
      );
    }
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      console.error("Intake webhook timed out after 5000ms");
    } else {
      console.error("Intake webhook request failed", error);
    }
  } finally {
    clearTimeout(timeout);
  }
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = (await request.json()) as unknown;
  } catch {
    return NextResponse.json(
      { message: "Invalid JSON request body." },
      { status: 400 },
    );
  }

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

  try {
    await saveRecord(record);
  } catch (error) {
    console.error("Local intake storage failed", error);
  }
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
