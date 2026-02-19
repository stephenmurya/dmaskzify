import type { Metadata } from "next";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About",
  description: "Mission, vision, and Abuja-first philosophy behind DMASKZIFY.",
  alternates: {
    canonical: "/about",
  },
};

const principles = [
  {
    title: "Mission",
    copy: "To amplify underground and independent sounds from Abuja through a digital radio and community-led platform.",
  },
  {
    title: "Vision",
    copy: "To become the trusted cultural frequency where emerging African voices are heard, archived, and supported.",
  },
  {
    title: "Abuja-First Philosophy",
    copy: "We start with local context, local stories, and local creators, then connect them to wider global audiences.",
  },
];

export default function AboutPage() {
  return (
    <main className="page-shell">
      <section className="section">
        <div className="container">
          <div className={styles.textStack}>
            <p className="kicker">About DMASKZIFY</p>
            <h1 className={`section-title ${styles.heroTitle}`}>
              Built for Sound, Culture, and Community in Abuja
            </h1>
            <p className={`section-copy ${styles.lead}`}>
              DMASKZIFY is not a generic streaming clone. It is a local-first
              cultural platform designed around the realities of artists,
              listeners, and event ecosystems in Abuja.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.principleGrid}>
            {principles.map((principle) => (
              <article key={principle.title} className={styles.principleCard}>
                <h2>{principle.title}</h2>
                <p>{principle.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <article className={styles.statementCard}>
            <h2>What we prioritize</h2>
            <p>
              A clear signal over noise. Cultural integrity over trend chasing.
              Artist sustainability over short-term hype.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
