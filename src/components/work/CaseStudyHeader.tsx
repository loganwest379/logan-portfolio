import Image from "next/image";
import Link from "next/link";
import { Button, Icon, Row } from "@once-ui-system/core";
import styles from "./CaseStudyHeader.module.scss";

interface CaseStudyHeaderProps {
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
  github?: string;
}

export function CaseStudyHeader({
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
  github,
}: CaseStudyHeaderProps) {
  const meta = [role, timeframe].filter(Boolean).join(" · ");

  return (
    <header
      className={styles.hero}
      style={brandColor ? ({ "--hero-accent": brandColor } as React.CSSProperties) : undefined}
    >
      <Link href="/work" className={styles.back}>
        <Icon name="chevronLeft" size="xs" /> All work
      </Link>

      <div className={styles.identity}>
        {logo && <Image src={logo} alt="" width={72} height={72} className={styles.logo} priority />}
        <div className={styles.identityText}>
          {company && <span className={styles.company}>{company}</span>}
          {meta && <span className={styles.meta}>{meta}</span>}
        </div>
      </div>

      <h1 className={styles.title}>{title}</h1>
      <p className={styles.summary}>{summary}</p>

      {highlights.length > 0 && (
        <dl className={styles.highlights}>
          {highlights.slice(0, 3).map((h) => (
            <div key={h.label} className={styles.highlight}>
              <dt className={styles.value}>{h.value}</dt>
              <dd className={styles.label}>{h.label}</dd>
            </div>
          ))}
        </dl>
      )}

      {(tags.length > 0 || link || github) && (
        <div className={styles.footer}>
          {tags.length > 0 && (
            <ul className={styles.tags}>
              {tags.map((tag) => (
                <li key={tag} className={styles.tag}>
                  {tag}
                </li>
              ))}
            </ul>
          )}
          {(link || github) && (
            <Row gap="8" wrap>
              {link && (
                <Button href={link} variant="primary" size="s" suffixIcon="arrowUpRightFromSquare">
                  {linkLabel || "Visit site"}
                </Button>
              )}
              {github && (
                <Button href={github} variant="secondary" size="s" prefixIcon="github">
                  Code
                </Button>
              )}
            </Row>
          )}
        </div>
      )}
    </header>
  );
}
