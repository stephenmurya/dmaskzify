import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import styles from "./community.module.css";

export const metadata: Metadata = {
  title: "Community",
  description:
    "Abuja creatives, events, culture stories, and fan energy around DMASKZIFY.",
  alternates: {
    canonical: "/community",
  },
};

const creatives = [
  {
    name: "Nneka Soul",
    role: "Singer / Songwriter",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=80",
  },
  {
    name: "DJ K-Slaw",
    role: "DJ / Curator",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1000&q=80",
  },
  {
    name: "Tunde X",
    role: "Producer / Performer",
    image:
      "https://images.unsplash.com/photo-1557862921-37829c790f19?auto=format&fit=crop&w=1000&q=80",
  },
  {
    name: "Ada Prism",
    role: "Visual Director",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=80",
  },
];

const upcomingEvents = [
  {
    title: "Capital Rooftop Session",
    date: "March 6, 2026",
    location: "Wuse II, Abuja",
  },
  {
    title: "Late Night Listening Club",
    date: "March 13, 2026",
    location: "Maitama, Abuja",
  },
];

const pastEvents = [
  {
    title: "Warehouse Frequencies",
    date: "February 1, 2026",
    location: "Jabi District",
  },
  {
    title: "Underground Open Decks",
    date: "January 17, 2026",
    location: "Central Area",
  },
];

const stories = [
  {
    title: "Streetwear Meets Sound Design",
    excerpt:
      "How independent stylists and beatmakers co-create show identity in small Abuja venues.",
  },
  {
    title: "Night Economy, New Voices",
    excerpt:
      "A look at the spaces giving first-time performers room to test new work.",
  },
  {
    title: "From Bedroom Session to Main Stage",
    excerpt:
      "Community support systems that help artists move from drafts to live performance.",
  },
];

const fanFrames = [
  {
    title: "Crowd Pulse",
    image:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "After-hours Energy",
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1200&q=80",
  },
];

function imageStyle(image: string): CSSProperties {
  return {
    backgroundImage: `linear-gradient(180deg, rgba(10, 10, 14, 0.2) 0%, rgba(10, 10, 14, 0.88) 82%), url(${image})`,
  };
}

export default function CommunityPage() {
  return (
    <main className="page-shell">
      <section className="section">
        <div className="container">
          <div className="section-intro">
            <p className="kicker">Community</p>
            <h1 className={`section-title ${styles.heroTitle}`}>
              Editorial Lens on Abuja Culture
            </h1>
            <p className="section-copy">
              A minimum-viable community page focused on creative people, event
              moments, and cultural context.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-intro">
            <p className="kicker">Abuja Creatives</p>
            <h2 className="section-title">Artist Grid</h2>
          </div>

          <div className={styles.creativesGrid}>
            {creatives.map((artist) => (
              <article key={artist.name} className={styles.creativeCard}>
                <div className={styles.creativeImage} style={imageStyle(artist.image)} />
                <div className={styles.creativeBody}>
                  <h3>{artist.name}</h3>
                  <p>{artist.role}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="events">
        <div className="container">
          <div className="section-intro">
            <p className="kicker">Events</p>
            <h2 className="section-title">Past + Upcoming</h2>
          </div>

          <div className={styles.eventsLayout}>
            <article className={styles.eventColumn}>
              <h3>Upcoming</h3>
              {upcomingEvents.map((event) => (
                <div key={event.title} className={styles.eventItem}>
                  <p>{event.date}</p>
                  <h4>{event.title}</h4>
                  <small>{event.location}</small>
                </div>
              ))}
            </article>

            <article className={styles.eventColumn}>
              <h3>Past</h3>
              {pastEvents.map((event) => (
                <div key={event.title} className={styles.eventItem}>
                  <p>{event.date}</p>
                  <h4>{event.title}</h4>
                  <small>{event.location}</small>
                </div>
              ))}
            </article>
          </div>
        </div>
      </section>

      <section className="section" id="stories">
        <div className="container">
          <div className="section-intro">
            <p className="kicker">Culture Stories</p>
            <h2 className="section-title">Placeholder Editorials</h2>
          </div>

          <div className={styles.storyGrid}>
            {stories.map((story) => (
              <article key={story.title} className={styles.storyCard}>
                <h3>{story.title}</h3>
                <p>{story.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-intro">
            <p className="kicker">Fan Energy</p>
            <h2 className="section-title">Visual Pulse</h2>
          </div>

          <div className={styles.fanGrid}>
            {fanFrames.map((frame) => (
              <article key={frame.title} className={styles.fanCard}>
                <div className={styles.fanImage} style={imageStyle(frame.image)} />
                <h3>{frame.title}</h3>
              </article>
            ))}
          </div>

          <Link href="/contact" className={styles.submissionLink}>
            Artist submissions opening soon
          </Link>
        </div>
      </section>
    </main>
  );
}
