import Image from "next/image";
import Link from "next/link";
import { Button, Icon, Row } from "@once-ui-system/core";
import styles from "./CaseStudyHeader.module.scss";

interface CaseStudyHeaderProps {
  title: string;
  summary: string;
  company?: string;
  logo?: string;
  role?: string;
  timeframe?: string;
  /** Shown across the top of the card */
  cover?: string;
  tags?: string[];
  highlights?: { value: string; label: string }[];
  link?: string;
  linkLabel?: string;
  github?: string;
}

const TAG_TONES = ["sage", "sky", "lavender", "peach", "butter", "rose"] as const;

/** Same tag, same color, everywhere. */
function toneFor(tag: string) {
  let h = 0;
  for (const ch of tag) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return TAG_TONES[h % TAG_TONES.length];
}

export function CaseStudyHeader({
  title,
  summary,
  company,
  logo,
  role,
  timeframe,
  cover,
  tags = [],
  highlights = [],
  link,
  linkLabel,
  github,
}: CaseStudyHeaderProps) {
  const meta = [role, timeframe].filter(Boolean).join(" · ");

  return (
    <header className={styles.card}>
      {cover && (
        <div className={styles.cover}>
          <Image
            src={cover}
            alt=""
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
            className={styles.coverImage}
          />
        </div>
      )}

      <div className={styles.body}>
        <Link href="/work" className={styles.back}>
          <Icon name="chevronLeft" size="xs" /> All work
        </Link>

        <div className={styles.identity}>
          {logo && <Image src={logo} alt="" width={56} height={56} className={styles.logo} />}
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
              <ul className={styles.tags} aria-label="Skills">
                {tags.map((tag) => (
                  <li key={tag} className={styles.tag} data-tone={toneFor(tag)}>
                    {tag}
                  </li>
                ))}
              </ul>
            )}
            {(link || github) && (
              <Row gap="8" wrap>
                {link && (
                  <Button
                    href={link}
                    variant="secondary"
                    size="s"
                    suffixIcon="arrowUpRightFromSquare"
                  >
                    {linkLabel || "Visit site"}
                  </Button>
                )}
                {github && (
                  <Button href={github} variant="tertiary" size="s" prefixIcon="github">
                    Code
                  </Button>
                )}
              </Row>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
