"use client";

import * as React from "react";
import GlassFolder, { type ArtPreset, type FolderFile } from "@/components/ui/glass-folder-cards";
import styles from "./WorkFolders.module.scss";

export interface WorkFolderGroup {
  label: string;
  /** e.g. "4 roles" */
  meta: string;
  art: ArtPreset;
  seed: number;
  /** Most important LAST: the last file sits at the front of the folder. */
  files: FolderFile[];
}

const MAX_WIDTH = 420;
const GAP = 48;

/** Follows the site's light/dark toggle (the `data-theme` attribute on <html>). */
function useSiteTheme(): "light" | "dark" {
  const [theme, setTheme] = React.useState<"light" | "dark">("light");
  React.useEffect(() => {
    const root = document.documentElement;
    const read = () => setTheme(root.getAttribute("data-theme") === "dark" ? "dark" : "light");
    read();
    const observer = new MutationObserver(read);
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);
  return theme;
}

export function WorkFolders({ groups }: { groups: WorkFolderGroup[] }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState(0);
  const tone = useSiteTheme();

  // Size each folder to the space available: side by side when there's room, stacked on phones.
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const available = el.clientWidth;
      const perRow = available >= 2 * 300 + GAP ? groups.length : 1;
      setWidth(Math.floor(Math.min(MAX_WIDTH, (available - GAP * (perRow - 1)) / perRow)));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [groups.length]);

  return (
    <div className={styles.wrap}>
      <div ref={ref} className={styles.row}>
        {width > 0 &&
          groups.map((group, i) => (
            <GlassFolder
              key={group.label}
              label={group.label}
              meta={group.meta}
              art={group.art}
              seed={group.seed}
              tone={tone}
              files={group.files}
              action="none"
              width={width}
              appearDelay={i * 140}
            />
          ))}
      </div>
      <p className={styles.hint}>Click a folder to open it · Pick a file to see the case study</p>
    </div>
  );
}
