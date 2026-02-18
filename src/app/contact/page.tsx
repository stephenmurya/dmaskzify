import type { Metadata } from "next";
import { ArtistSubmissionForm } from "@/components/ArtistSubmissionForm";
import { EmailCaptureForm } from "@/components/EmailCaptureForm";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact DMASKZIFY and submit artist information for future programming and collaborations.",
};

export default function ContactPage() {
  return (
    <main className="page-shell">
      <section className="section">
        <div className="container">
          <div className={styles.header}>
            <p className="kicker">Contact</p>
            <h1 className="section-title">Artist Submissions</h1>
            <p className="section-copy">
              Simple Phase 1 intake form. No dashboard, no account setup.
              Submissions route to the DMASKZIFY intake backend.
            </p>
          </div>

          <div className={styles.layout}>
            <article className={styles.card}>
              <h2>Submit Your Sound</h2>
              <p>
                Share your profile and links for future radio rotation and
                community programming.
              </p>
              <ArtistSubmissionForm />
            </article>

            <article className={styles.card}>
              <h2>General Inbox</h2>
              <p>
                For direct questions or partnerships, email{" "}
                <a href="mailto:hello@dmaskzify.com">hello@dmaskzify.com</a>.
              </p>
              <p className={styles.small}>
                Optional: set `INTAKE_WEBHOOK_URL` in your environment to
                forward form entries into your inbox workflow.
              </p>

              <div className={styles.alertCard}>
                <p className="kicker">Merch Alerts</p>
                <h3>Merch drops coming soon</h3>
                <EmailCaptureForm
                  type="merch_alert"
                  buttonLabel="Join Merch Alerts"
                  className={styles.alertForm}
                />
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
