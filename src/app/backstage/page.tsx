import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { appleMusicLinkProps, artists } from "@/config/artists";
import styles from "./backstage.module.css";

export const metadata: Metadata = {
  title: "Backstage",
  description:
    "The private DMASKZIFY artist layer for collaboration, profile building, and support tools.",
  alternates: {
    canonical: "/backstage",
  },
};

const workflow = [
  {
    step: "1. Build your profile",
    detail:
      "Set your sonic identity, references, availability, and current projects.",
  },
  {
    step: "2. Connect with collaborators",
    detail:
      "Find producers, vocalists, photographers, and event curators inside the Abuja scene.",
  },
  {
    step: "3. Launch with support",
    detail:
      "Open future fan support channels, exclusive drops, and release support pathways.",
  },
];

function styleFromImage(image: string): CSSProperties {
  return {
    backgroundImage: `linear-gradient(180deg, rgba(10, 10, 14, 0.22) 0%, rgba(10, 10, 14, 0.84) 82%), url("${image}")`,
  };
}

export default function BackstagePage() {
  return (
    <main className="page-shell">
      <section className="section">
        <div className="container">
          <div className="section-intro">
            <p className="kicker">Artist Backstage</p>
            <h1 className={`section-title ${styles.heroTitle}`}>
              Private Infrastructure for Creative Growth
            </h1>
            <p className="section-copy">
              Backstage is DMASKZIFY&apos;s intimate layer for artists who want
              to collaborate, build sustainable practice, and prepare releases
              with community support.
            </p>
          </div>

          <p className={styles.launchingSoon}>Backstage is launching soon.</p>

          <div className={styles.productLayout}>
            <article className={styles.conceptCard}>
              <h2>Backstage Concept</h2>
              <p>
                Think of it as a calm production room behind the public stream.
                It prioritizes trusted collaboration over noise and puts artist
                control at the center.
              </p>
              <ul>
                <li>Private artist profiles and project spaces</li>
                <li>Collaboration matching for Abuja-based creatives</li>
                <li>Upcoming direct support and subscription tools</li>
              </ul>
            </article>

            <article className={styles.workflowCard}>
              <h2>Product Flow</h2>
              <div className={styles.flowStack}>
                {workflow.map((item) => (
                  <div key={item.step} className={styles.flowItem}>
                    <h3>{item.step}</h3>
                    <p>{item.detail}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-intro">
            <p className="kicker">Profile Mockups</p>
            <h2 className="section-title">Artist Spaces</h2>
          </div>

          <div className={styles.mockupGrid}>
            {artists.map((artist) => (
              <article key={artist.name} className={styles.mockupCard}>
                <div className={styles.mockupVisual} style={styleFromImage(artist.image)} />
                <div className={styles.mockupBody}>
                  <h3>{artist.name}</h3>
                  <p className={styles.role}>{artist.projectLabel}</p>
                  <p className={styles.tags}>Listen on Apple Music</p>
                  <a
                    href={artist.appleMusicUrl}
                    className="button button-secondary"
                    aria-label={`Open ${artist.name} on Apple Music`}
                    {...appleMusicLinkProps}
                  >
                    View on Apple Music
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
