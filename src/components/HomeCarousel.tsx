"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { IconButton } from "@once-ui-system/core";
import styles from "./HomeCarousel.module.scss";

interface Photo {
  src: string;
  alt: string;
}

interface HomeCarouselProps {
  photos: Photo[];
  /** Time each photo stays up, in ms */
  interval?: number;
}

/**
 * Homepage photo carousel.
 *
 * Every photo is mounted up front and stacked, so changing slides is just a
 * crossfade: no unmount, no re-download, no layout jump. Auto-advances on a
 * fixed cadence and pauses while hovered, focused, or when the tab is hidden.
 */
export function HomeCarousel({ photos, interval = 6000 }: HomeCarouselProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const count = photos.length;

  const go = useCallback((index: number) => setActive((index + count) % count), [count]);
  const next = useCallback(() => setActive((i) => (i + 1) % count), [count]);
  const prev = useCallback(() => setActive((i) => (i - 1 + count) % count), [count]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Pause while the tab is in the background so it doesn't jump ahead on return.
  useEffect(() => {
    const onVisibility = () => setPaused(document.visibilityState !== "visible");
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // Restarts whenever the slide changes, so a click always gets a full interval.
  // biome-ignore lint/correctness/useExhaustiveDependencies: `active` restarts the timer on purpose
  useEffect(() => {
    if (paused || reducedMotion || count < 2) return;
    const id = window.setTimeout(next, interval);
    return () => window.clearTimeout(id);
  }, [active, paused, reducedMotion, count, interval, next]);

  if (count === 0) return null;

  return (
    <section
      className={styles.root}
      aria-roledescription="carousel"
      aria-label="Photos"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") next();
        if (e.key === "ArrowLeft") prev();
      }}
    >
      <div
        className={styles.frame}
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchStartX.current === null) return;
          const dx = touchStartX.current - e.changedTouches[0].clientX;
          if (Math.abs(dx) > 40) (dx > 0 ? next : prev)();
          touchStartX.current = null;
        }}
      >
        {photos.map((photo, i) => (
          <div
            key={photo.src}
            className={styles.slide}
            data-active={i === active || undefined}
            aria-hidden={i !== active}
            // biome-ignore lint/a11y/useSemanticElements: WAI-ARIA carousel pattern uses role="group" for slides
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              // first photo is the LCP image; the rest load right after so switching is instant
              priority={i === 0}
              loading={i === 0 ? undefined : "eager"}
              sizes="(max-width: 1024px) 100vw, 960px"
              className={styles.image}
            />
          </div>
        ))}

        {count > 1 && (
          <>
            <div className={`${styles.control} ${styles.left}`}>
              <IconButton
                icon="chevronLeft"
                variant="secondary"
                tooltip="Previous"
                aria-label="Previous photo"
                onClick={prev}
              />
            </div>
            <div className={`${styles.control} ${styles.right}`}>
              <IconButton
                icon="chevronRight"
                variant="secondary"
                tooltip="Next"
                aria-label="Next photo"
                onClick={next}
              />
            </div>
          </>
        )}
      </div>

      {count > 1 && (
        <div className={styles.indicators}>
          {photos.map((photo, i) => (
            <button
              key={photo.src}
              type="button"
              className={styles.indicator}
              data-active={i === active || undefined}
              aria-label={`Show photo ${i + 1}`}
              aria-current={i === active}
              onClick={() => go(i)}
            >
              <span />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
