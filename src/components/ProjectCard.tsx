import Image from "next/image";
import Link from "next/link";
import { Icon } from "@once-ui-system/core";
import styles from "./ProjectCard.module.scss";

export interface ProjectCardProps {
  href: string;
  title: string;
  summary: string;
  company?: string;
  logo?: string;
  brandColor?: string;
  role?: string;
  timeframe?: string;
  tags?: string[];
  highlights?: { value: string; label: string }[];
  link?: string;
  linkLabel?: string;
}

export function ProjectCard({
  href,
  title,
  summary,
  company,
  logo,
  brandColor,
  role,
  timeframe,
  tags = [],
  highlights = [],
  link,
  linkLabel,
}: ProjectCardProps) {
  const meta = [role, timeframe].filter(Boolean).join(" · ");

  return (
    <article
      className={styles.card}
      style={brandColor ? ({ "--card-accent": brandColor } as React.CSSProperties) : undefined}
    >
      <header className={styles.header}>
        {logo ? (
          <Image src={logo} alt="" width={52} height={52} className={styles.logo} />
        ) : (
          <span className={styles.logoFallback} aria-hidden>
            {(company || title).charAt(0)}
          </span>
        )}
        <div className={styles.headerText}>
          {company && <span className={styles.company}>{company}</span>}
          {meta && <span className={styles.meta}>{meta}</span>}
        </div>
      </header>

      <h2 className={styles.title}>
        {/* The ::after of this link stretches over the whole card, so the card is one big click target */}
        <Link href={href} className={styles.stretchedLink}>
          {title}
        </Link>
      </h2>

      <p className={styles.summary}>{summary}</p>

      {highlights.length > 0 && (
        <dl className={styles.highlights}>
          {highlights.slice(0, 3).map((h) => (
            <div key={h.label} className={styles.highlight}>
              <dt className={styles.highlightValue}>{h.value}</dt>
              <dd className={styles.highlightLabel}>{h.label}</dd>
            </div>
          ))}
        </dl>
      )}

      {tags.length > 0 && (
        <ul className={styles.tags}>
          {tags.slice(0, 4).map((tag) => (
            <li key={tag} className={styles.tag}>
              {tag}
            </li>
          ))}
        </ul>
      )}

      <footer className={styles.footer}>
        <span className={styles.cta}>
          Read case study <Icon name="arrowRight" size="xs" />
        </span>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.external}
          >
            {linkLabel || "Visit site"} <Icon name="arrowUpRightFromSquare" size="xs" />
          </a>
        )}
      </footer>
    </article>
  );
}
