"use client";

import { useEffect } from "react";

const carouselImages = [
  "/images/projects/project-01/cover1.JPEG",
  "/images/projects/project-01/cover2.JPEG",
  "/images/projects/project-01/cover3.JPEG",
  "/images/projects/project-01/cover4.JPEG",
];

export function CarouselPreloader() {
  useEffect(() => {
    // Aggressively preload all carousel images immediately
    carouselImages.forEach((src) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = src;
      link.setAttribute("fetchpriority", "high");
      document.head.appendChild(link);

      // Also preload using Image object to ensure browser cache
      const img = new Image();
      img.src = src;
    });
  }, []);

  return null;
}
