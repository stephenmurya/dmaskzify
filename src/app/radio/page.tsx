import type { Metadata } from "next";
import { EmailCaptureForm } from "@/components/EmailCaptureForm";
import {
  getRadioSourceLinks,
  getRadioStatusCopy,
  radioConfig,
} from "@/config/radio";
import styles from "./radio.module.css";

export const metadata: Metadata = {
  title: "Radio",
  description: "DMASKZIFY Radio on Stationhead with weekly programming.",
};

const replayArchive = [
  {
    title: "Midnight Blend Vol. 03",
    host: "DJ K-Slaw",
    date: "January 31, 2026",
  },
  {
    title: "Back Alley Sessions: Nneka Soul",
    host: "Nneka Soul",
    date: "January 24, 2026",
  },
  {
    title: "Capital Corner Live Cut",
    host: "Abuja Collective",
    date: "January 17, 2026",
  },
];

export default function RadioPage() {
  const status = getRadioStatusCopy();
  const sourceLinks = getRadioSourceLinks();
  const isLive = status.label === "Live";
  const isComingSoon = status.label === "Coming Soon";

  return (
    <main className="page-shell">
      <section className="section">
        <div className="container">
          <div className="section-intro">
            <p className="kicker">DMASKZIFY Radio</p>
            <h1 className={`section-title ${styles.heroTitle}`}>
              Live Radio, External Stream Mode
            </h1>
            <p className="section-copy">
              DMASKZIFY streams through Stationhead to keep live sessions
              licensed and reliable.
            </p>
          </div>

          <article className={`card ${styles.liveModule}`}>
            <header className={styles.liveModuleHeader}>
              <p className={styles.statusTag}>
                {isLive ? <span className="live-dot" aria-hidden /> : null}
                {status.label}
              </p>
              <p className={styles.statusCopy}>{status.detail}</p>
            </header>

            {radioConfig.stationhead.embedSupported && radioConfig.stationhead.embedUrl ? (
              <div className={styles.embedWrap}>
                <iframe
                  src={radioConfig.stationhead.embedUrl}
                  title="DMASKZIFY Stationhead Embed"
                  allow="autoplay; encrypted-media"
                />
              </div>
            ) : (
              <div className={styles.previewBlock}>
                <h2>Stationhead Room Preview</h2>
                <p>
                  Direct embed is currently unavailable. Use the live links
                  below to enter the room.
                </p>
              </div>
            )}

            <div className={styles.ctaStack}>
              <a href={sourceLinks.primaryHref} className="button button-primary">
                {sourceLinks.primaryLabel}
              </a>
              <a
                href={sourceLinks.fallbackHref}
                className={styles.browserFallback}
                target={sourceLinks.fallbackHref.startsWith("http") ? "_blank" : undefined}
                rel={sourceLinks.fallbackHref.startsWith("http") ? "noreferrer" : undefined}
              >
                {sourceLinks.fallbackLabel}
              </a>
            </div>

            <p className={styles.caption}>
              {radioConfig.radio_source_type === "stationhead"
                ? "DMASKZIFY Radio is powered by Stationhead for licensed live streaming."
                : "Stream source set from radio_source_type configuration."}
            </p>
            {!isLive && !isComingSoon ? (
              <p className={styles.nextShow}>Next show at {radioConfig.nextShowLabel}</p>
            ) : null}
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-intro">
            <p className="kicker">Weekly Schedule</p>
            <h2 className="section-title">Recurring Shows</h2>
            <p className="section-copy">
              A clean timetable with flagship programming called out clearly.
            </p>
          </div>

          <div className={styles.scheduleTable}>
            {radioConfig.weeklySchedule.map((show) => (
              <article
                key={`${show.day}-${show.title}`}
                className={`${styles.scheduleRow} ${show.flagship ? styles.flagship : ""}`}
              >
                <div className={styles.scheduleDay}>{show.day}</div>
                <div>
                  <h3>{show.title}</h3>
                  <p>{show.host}</p>
                </div>
                <div className={styles.scheduleTime}>{show.time}</div>
                {show.flagship ? <p className={styles.flagshipTag}>Flagship Program</p> : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-intro">
            <p className="kicker">Replay Archive</p>
            <h2 className="section-title">Recent Sessions</h2>
            <p className="section-copy">Replay archive launching soon.</p>
          </div>

          <div className={styles.replayGrid}>
            {replayArchive.map((item) => (
              <article key={item.title} className={styles.replayCard}>
                <h3>{item.title}</h3>
                <p>{item.host}</p>
                <small>{item.date}</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <article className={styles.notifyCard}>
            <div>
              <p className="kicker">Live Alerts</p>
              <h2>Get notified when we go live</h2>
              <p>
                Receive alerts when DMASKZIFY goes on air, plus schedule
                changes and featured sessions.
              </p>
            </div>
            <EmailCaptureForm
              type="live_notifications"
              buttonLabel="Notify Me"
              compact
              className={styles.notifyForm}
            />
          </article>
        </div>
      </section>
    </main>
  );
}
