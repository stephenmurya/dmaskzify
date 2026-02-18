import Link from "next/link";
import { EmailCaptureForm } from "./EmailCaptureForm";
import styles from "./SiteFooter.module.css";

const footerColumns = [
  {
    title: "Discover",
    links: [
      { label: "Home", href: "/" },
      { label: "Radio", href: "/radio" },
      { label: "Community", href: "/community" },
      { label: "Backstage", href: "/backstage" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Artist Submission", href: "/contact" },
      { label: "Merch", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  },
];

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "X", href: "https://x.com" },
  { label: "YouTube", href: "https://youtube.com" },
];

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.layout}`}>
        <div className={styles.brandBlock}>
          <Link href="/" className={styles.brand}>
            DMASKZIFY
          </Link>
          <p className={styles.brandCopy}>
            Abuja-first digital radio and artist community for youth culture,
            grounded sound, and city energy.
          </p>

          <div className={styles.socialRow}>
            {socialLinks.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <article className={styles.signupCard}>
          <p className="kicker">Culture Updates</p>
          <h2>Stay connected to the culture</h2>
          <EmailCaptureForm
            type="newsletter"
            buttonLabel="Subscribe"
            compact
            className={styles.signupForm}
          />
        </article>

        {footerColumns.map((column) => (
          <div key={column.title} className={styles.column}>
            <h2>{column.title}</h2>
            {column.links.map((link) => (
              <Link key={link.label} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        ))}
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>© {new Date().getFullYear()} DMASKZIFY. All rights reserved.</p>
      </div>
    </footer>
  );
}
