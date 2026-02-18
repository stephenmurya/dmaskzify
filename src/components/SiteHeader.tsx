"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getRadioSourceLinks, getRadioStatusCopy } from "@/config/radio";
import styles from "./SiteHeader.module.css";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/radio", label: "Radio" },
  { href: "/community", label: "Community" },
  { href: "/backstage", label: "Backstage" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const radioStatus = getRadioStatusCopy();
  const sourceLinks = getRadioSourceLinks();
  const showLiveDot = radioStatus.label === "Live";

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [menuOpen]);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.brand} onClick={() => setMenuOpen(false)}>
          <span className={styles.brandMark} aria-hidden />
          <span className={styles.brandName}>DMASKZIFY</span>
        </Link>

        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ""}`}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span aria-hidden />
          <span aria-hidden />
          <span aria-hidden />
        </button>

        <nav className={styles.nav} aria-label="Primary">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${isActive ? styles.active : ""}`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className={styles.actions}>
          <span className={styles.liveStatus}>
            {showLiveDot ? <span className="live-dot" aria-hidden /> : null}
            {radioStatus.label}
          </span>
          <a
            href={sourceLinks.primaryHref}
            className={styles.listenButton}
            target={sourceLinks.primaryHref.startsWith("http") ? "_blank" : undefined}
            rel={sourceLinks.primaryHref.startsWith("http") ? "noreferrer" : undefined}
          >
            {sourceLinks.primaryLabel}
          </a>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}
        aria-hidden={!menuOpen}
      >
        <nav className={styles.mobileNav} aria-label="Mobile">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));

            return (
              <Link
                key={`mobile-${link.href}`}
                href={link.href}
                className={`${styles.mobileNavLink} ${
                  isActive ? styles.mobileNavLinkActive : ""
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className={styles.mobileFooter}>
          <p className={styles.mobileStatus}>
            {showLiveDot ? <span className="live-dot" aria-hidden /> : null}
            {radioStatus.label}
          </p>
          <a
            href={sourceLinks.primaryHref}
            className="button button-primary"
            target={sourceLinks.primaryHref.startsWith("http") ? "_blank" : undefined}
            rel={sourceLinks.primaryHref.startsWith("http") ? "noreferrer" : undefined}
            onClick={() => setMenuOpen(false)}
          >
            {sourceLinks.primaryLabel}
          </a>
        </div>
      </div>
    </header>
  );
}
