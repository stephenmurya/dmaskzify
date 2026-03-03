import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { EmailCaptureForm } from "@/components/EmailCaptureForm";
import { appleMusicLinkProps, artists } from "@/config/artists";
import {
  getRadioSourceLinks,
  getRadioStatusCopy,
  radioConfig,
} from "@/config/radio";
import styles from "./home.module.css";

export const metadata: Metadata = {
  title: "Home",
  alternates: {
    canonical: "/",
  },
};

const communityFrames = [
  {
    title: "Abuja Creatives",
    body: "Producers, DJs, vocalists, and visual storytellers shaping local sound identity.",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Event Energy",
    body: "Night sessions, pop-ups, and crowd-led moments amplified through community radio.",
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Abuja Identity",
    body: "Grounded stories from neighborhoods, venues, and sounds that define youth culture.",
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1200&q=80",
  },
];

function imageStyle(image: string): CSSProperties {
  return {
    backgroundImage: `linear-gradient(180deg, rgba(10, 10, 14, 0.22) 0%, rgba(10, 10, 14, 0.88) 85%), url("${image}")`,
  };
}

export default function HomePage() {
  const radioStatus = getRadioStatusCopy();
  const sourceLinks = getRadioSourceLinks();
  const live = radioStatus.label === "Live";
  const liveTitle =
    radioConfig.radio_state === "live"
      ? "Listen Live on Stationhead"
      : radioConfig.radio_state === "coming_soon"
        ? "Radio Coming Soon"
        : "Radio is Offline";

  return (
    <main className="page-shell">
      <section className={`section ${styles.heroSection}`}>
        <div className="container">
          <div className={styles.heroContent}>
            <p className="kicker fade-rise">Broadcasting from Abuja</p>
            <h1 className={`${styles.heroTitle} fade-rise`}>
              Abuja-first digital radio &{" "}
              <span className={styles.heroAccent}>artist community</span>
            </h1>
            <p className={`${styles.heroCopy} fade-rise`}>
              Grounded in city culture, DMASKZIFY amplifies independent sounds
              and youth-led creative energy.
            </p>
            <div className={`${styles.heroActions} fade-rise`}>
              <Link href="/radio" className="button button-primary">
                Enter the Radio
              </Link>
              <Link href="/community" className="button button-secondary">
                Explore the Community
              </Link>
            </div>
          </div>

          <article className={`card ${styles.liveCard}`}>
            <header className={styles.liveHeader}>
              <p className={styles.liveTag}>
                {live ? <span className="live-dot" aria-hidden /> : null}
                {radioStatus.label}
              </p>
              <p className={styles.liveMeta}>{radioStatus.detail}</p>
            </header>

            <div className={styles.liveBody}>
              <div className={styles.liveShow}>
                <h2>{liveTitle}</h2>
                <p>
                  {radioConfig.radio_state === "live"
                    ? "External mode is active for licensed live streaming and reliable playback."
                    : radioConfig.radio_state === "coming_soon"
                      ? "DMASKZIFY is preparing the next wave of live shows."
                      : `Next broadcast starts ${radioConfig.nextShowLabel}.`}
                </p>
              </div>
              <div className={styles.stationheadActions}>
                <a href={sourceLinks.primaryHref} className="button button-primary">
                  {sourceLinks.primaryLabel}
                </a>
                <a
                  href={sourceLinks.fallbackHref}
                  className={styles.fallbackLink}
                  target={sourceLinks.fallbackHref.startsWith("http") ? "_blank" : undefined}
                  rel={sourceLinks.fallbackHref.startsWith("http") ? "noreferrer" : undefined}
                >
                  {sourceLinks.fallbackLabel}
                </a>
              </div>
            </div>

            <footer className={styles.liveFooter}>
              <p>
                {radioConfig.radio_source_type === "stationhead"
                  ? "DMASKZIFY Radio is powered by Stationhead for licensed live streaming."
                  : "DMASKZIFY Radio source is configurable for future stream switching."}
              </p>
              <Link href="/radio">View weekly schedule</Link>
            </footer>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.splitGrid}>
            <article className={`${styles.splitCard} ${styles.radioPanel}`}>
              <p className={styles.splitIcon}>Radio</p>
              <h2>The Radio</h2>
              <p>
                Public, live, collective. Curated sets and recurring programs
                flowing through Abuja.
              </p>
              <Link href="/radio">Tune In</Link>
            </article>
            <article className={`${styles.splitCard} ${styles.backstagePanel}`}>
              <p className={styles.splitIcon}>Backstage</p>
              <h2>The Backstage</h2>
              <p>
                Private and intimate. Artist-first tooling and collaborative
                preparation space.
              </p>
              <Link href="/backstage">See Concept</Link>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-intro">
            <p className="kicker">Social Proof</p>
            <h2 className="section-title">Artists, Events, Abuja Identity</h2>
            <p className="section-copy">
              DMASKZIFY grows through community sessions, local events, and
              artists shaping the next wave of sound.
            </p>
          </div>

          <div className={styles.artistGrid}>
            {artists.map((artist) => (
              <a
                key={artist.name}
                href={artist.appleMusicUrl}
                className={styles.artistCard}
                aria-label={`Open ${artist.name} on Apple Music`}
                {...appleMusicLinkProps}
              >
                <div className={styles.artistImage} style={imageStyle(artist.image)} />
                <div className={styles.artistBody}>
                  <p className={styles.artistVibe}>{artist.projectLabel}</p>
                  <h3>{artist.name}</h3>
                  <p>Open the Apple Music profile to explore available releases.</p>
                  <small>Listen on Apple Music</small>
                </div>
              </a>
            ))}
          </div>

          <div className={styles.communityGrid}>
            {communityFrames.map((frame) => (
              <article key={frame.title} className={styles.communityCard}>
                <div
                  className={styles.communityImage}
                  style={imageStyle(frame.image)}
                />
                <div className={styles.communityBody}>
                  <h3>{frame.title}</h3>
                  <p>{frame.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <article className={styles.merchCard}>
            <div>
              <p className="kicker">Merch</p>
              <h2>Merch Drops Coming Soon</h2>
              <p>
                Early supporters can join the merch alert list for first access
                when drops go live.
              </p>
            </div>
            <EmailCaptureForm
              type="merch_alert"
              buttonLabel="Join Merch Alerts"
              compact
              className={styles.merchForm}
            />
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <article className={styles.cultureFooter}>
            <div>
              <p className="kicker">Stay Connected</p>
              <h2>Stay connected to the culture</h2>
              <p>
                Get updates on live sessions, artist drops, and community
                events.
              </p>
            </div>
            <EmailCaptureForm
              type="newsletter"
              buttonLabel="Subscribe"
              compact
              className={styles.cultureForm}
            />
          </article>
        </div>
      </section>
    </main>
  );
}
