"use client";

import { FormEvent, useState } from "react";
import styles from "./ArtistSubmissionForm.module.css";

type SubmissionState = "idle" | "loading" | "success" | "error";

export function ArtistSubmissionForm() {
  const [status, setStatus] = useState<SubmissionState>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    setStatus("loading");
    setMessage("");

    const payload = {
      type: "artist_submission" as const,
      name: String(form.get("name") ?? ""),
      genre: String(form.get("genre") ?? ""),
      links: String(form.get("links") ?? ""),
      email: String(form.get("email") ?? ""),
    };

    try {
      const response = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const raw = await response.text();
      let result: { message?: string } = {};
      if (raw) {
        try {
          result = JSON.parse(raw) as { message?: string };
        } catch {
          result = {};
        }
      }

      if (!response.ok) {
        throw new Error(
          result.message ??
            `Unable to send submission. Request failed (${response.status}).`,
        );
      }

      setStatus("success");
      setMessage(result.message ?? "Submission received.");
      event.currentTarget.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to send form.");
    }
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <label className={styles.field}>
        <span>Name</span>
        <input type="text" name="name" required />
      </label>

      <label className={styles.field}>
        <span>Genre</span>
        <input type="text" name="genre" required />
      </label>

      <label className={styles.field}>
        <span>Links</span>
        <input type="url" name="links" placeholder="https://..." required />
      </label>

      <label className={styles.field}>
        <span>Email</span>
        <input type="email" name="email" required autoComplete="email" />
      </label>

      <button type="submit" className="button button-primary" disabled={status === "loading"}>
        {status === "loading" ? "Submitting..." : "Send Submission"}
      </button>

      {message ? (
        <p className={`${styles.message} ${status === "error" ? styles.error : ""}`}>
          {message}
        </p>
      ) : null}
    </form>
  );
}
