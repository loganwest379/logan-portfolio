import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

type Team = {
  name: string;
  role: string;
  avatar: string;
  linkedIn: string;
};

type Metadata = {
  title: string;
  subtitle?: string;
  publishedAt: string;
  summary: string;
  image?: string;
  images: string[];
  tag?: string;
  team: Team[];
  link?: string;
  github?: string;
};

import { notFound } from "next/navigation";

function getMDXFiles(dir: string) {
  if (!fs.existsSync(dir)) {
    notFound();
  }

  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

/**
 * Fails the build with a readable message when a post or project is missing
 * required frontmatter or references an image that isn't in /public.
 */
function validateFrontmatter(filePath: string, data: Record<string, unknown>, content: string) {
  const file = path.relative(process.cwd(), filePath);
  const problems: string[] = [];

  for (const field of ["title", "summary", "publishedAt"]) {
    if (typeof data[field] !== "string" || !(data[field] as string).trim()) {
      problems.push(`missing "${field}"`);
    }
  }

  if (typeof data.publishedAt === "string" && !/^\d{4}-\d{2}-\d{2}$/.test(data.publishedAt)) {
    problems.push(`"publishedAt" must look like "2026-01-31" (got "${data.publishedAt}")`);
  }

  // Images in frontmatter plus local images used in the body: ![alt](/images/..) or src="/images/.."
  const bodyImages = [...content.matchAll(/(?:\]\(|src=["'])(\/images\/[^)"'\s]+)/g)].map((m) => m[1]);
  const images = [data.image, ...(Array.isArray(data.images) ? data.images : []), ...bodyImages].filter(
    (src): src is string => typeof src === "string" && src.startsWith("/"),
  );
  for (const src of images) {
    if (!fs.existsSync(path.join(/*turbopackIgnore: true*/ process.cwd(), "public", src))) {
      problems.push(`image not found: public${src}`);
    }
  }

  if (problems.length) {
    throw new Error(`Invalid frontmatter in ${file}:\n  - ${problems.join("\n  - ")}`);
  }
}

function readMDXFile(filePath: string) {
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const rawContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(rawContent);
  validateFrontmatter(filePath, data, content);

  const metadata: Metadata = {
    title: data.title || "",
    subtitle: data.subtitle || "",
    publishedAt: data.publishedAt,
    summary: data.summary || "",
    image: data.image || "",
    images: data.images || [],
    tag: data.tag || "",
    team: data.team || [],
    link: data.link || "",
    github: data.github || "",
  };

  return { metadata, content };
}

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}

export function getPosts(customPath = ["", "", "", ""]) {
  // Only called at build time (pages are statically generated), so skip output tracing.
  const postsDir = path.join(/*turbopackIgnore: true*/ process.cwd(), ...customPath);
  return getMDXData(postsDir);
}
