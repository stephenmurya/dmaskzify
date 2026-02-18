"use client";

import { FormEvent, useState } from "react";
import styles from "./EmailCaptureForm.module.css";

type CaptureType = "live_notifications" | "newsletter" | "merch_alert";

type EmailCaptureFormProps = {
  type: CaptureType;
  buttonLabel: string;
  placeholder?: string;
  compact?: boolean;
  className?: string;
};

export function EmailCaptureForm({
  type,
  buttonLabel,
  placeholder = "you@example.com",
  compact = false,
  className,
}: EmailCaptureFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, email }),
      });

      const raw = await response.text();
      let payload: { message?: string } = {};
      if (raw) {
        try {
          payload = JSON.parse(raw) as { message?: string };
        } catch {
          payload = {};
        }
      }

      if (!response.ok) {
        throw new Error(
          payload.message ??
            `Unable to save email. Request failed (${response.status}).`,
        );
      }

      setStatus("success");
      setMessage(payload.message ?? "You are on the list.");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  return (
    <form onSubmit={onSubmit} className={`${styles.form} ${compact ? styles.compact : ""} ${className ?? ""}`}>
      <label className={styles.field}>
        <span className={styles.label}>Email</span>
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder={placeholder}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={status === "loading"}
        />
      </label>
      <button type="submit" className="button button-primary" disabled={status === "loading"}>
        {status === "loading" ? "Sending..." : buttonLabel}
      </button>
      {message ? (
        <p className={`${styles.message} ${status === "error" ? styles.error : ""}`}>
          {message}
        </p>
      ) : null}
    </form>
  );
}
