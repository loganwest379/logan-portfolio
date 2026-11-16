"use client";

import { useRouter } from "next/navigation";
import type React from "react";
import { LiquidNavbar, NimbusIcons, type LiquidNavItem } from "@/components/ui/liquid-glass-navbar";
import { useSiteTheme } from "@/hooks/useSiteTheme";
import { routes, about, work, blog, gallery } from "@/resources";

const icon = (paths: React.ReactNode) => (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {paths}
  </svg>
);

const icons = {
  work: icon(
    <>
      <rect x="3.5" y="7.5" width="17" height="12" rx="2.5" />
      <path d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5M3.5 13h17" />
    </>,
  ),
  blog: icon(
    <>
      <path d="M5 4.5h10.5L19 8v11.5H5z" />
      <path d="M8.5 11h7M8.5 14.5h7M8.5 7.5h4" />
    </>,
  ),
  gallery: icon(
    <>
      <rect x="3.5" y="5" width="17" height="14" rx="2.5" />
      <circle cx="9" cy="10" r="1.6" />
      <path d="m20.5 16-4.8-4.6L8 19" />
    </>,
  ),
};

const NAV: (LiquidNavItem & { href: string; match: (p: string) => boolean; enabled: boolean })[] = [
  { label: "Home", href: "/", icon: NimbusIcons.home, fx: "glow", match: (p) => p === "/", enabled: routes["/"] },
  { label: about.label, href: "/about", icon: NimbusIcons.user, fx: "wave", match: (p) => p.startsWith("/about"), enabled: routes["/about"] },
  { label: work.label, href: "/work", icon: icons.work, fx: "pop", match: (p) => p.startsWith("/work"), enabled: routes["/work"] },
  { label: blog.label, href: "/blog", icon: icons.blog, fx: "pop", match: (p) => p.startsWith("/blog"), enabled: routes["/blog"] },
  { label: gallery.label, href: "/gallery", icon: icons.gallery, fx: "pop", match: (p) => p.startsWith("/gallery"), enabled: routes["/gallery"] },
];

/**
 * Site navigation on the liquid glass navbar. Items are real links (so
 * open-in-new-tab and crawlers work); plain clicks are routed client-side so
 * pages switch without a full reload.
 */
export function SiteNav({ pathname }: { pathname: string }) {
  const router = useRouter();
  const tone = useSiteTheme();
  const items = NAV.filter((item) => item.enabled);
  const active = Math.max(
    0,
    items.findIndex((item) => item.match(pathname)),
  );

  const onClickCapture = (e: React.MouseEvent) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }
    const link = (e.target as HTMLElement).closest("a");
    const href = link?.getAttribute("href");
    if (!href?.startsWith("/")) return;
    e.preventDefault();
    router.push(href);
  };

  return (
    <div onClickCapture={onClickCapture}>
      <LiquidNavbar
        items={items.map(({ label, href, icon, fx }) => ({ label, href, icon, fx }))}
        active={active}
        tone={tone}
      />
    </div>
  );
}
