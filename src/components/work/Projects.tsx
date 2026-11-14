import { getPosts } from "@/utils/utils";
import { ProjectCard } from "@/components";
import styles from "@/components/ProjectCard.module.scss";

interface ProjectsProps {
  range?: [number, number?];
  exclude?: string[];
}

export function Projects({ range, exclude }: ProjectsProps) {
  let allProjects = getPosts(["src", "app", "work", "projects"]);

  // Exclude by slug (exact match)
  if (exclude && exclude.length > 0) {
    allProjects = allProjects.filter((post) => !exclude.includes(post.slug));
  }

  // Projects with an `order` come first (1, 2, 3...), then the rest newest first.
  const sortedProjects = allProjects.sort((a, b) => {
    const orderA = a.metadata.order ?? Number.POSITIVE_INFINITY;
    const orderB = b.metadata.order ?? Number.POSITIVE_INFINITY;
    if (orderA !== orderB) return orderA - orderB;
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  const displayedProjects = range
    ? sortedProjects.slice(range[0] - 1, range[1] ?? sortedProjects.length)
    : sortedProjects;

  return (
    <div className={styles.grid}>
      {displayedProjects.map((post) => (
        <ProjectCard
          key={post.slug}
          href={`/work/${post.slug}`}
          title={post.metadata.title}
          summary={post.metadata.summary}
          company={post.metadata.company}
          logo={post.metadata.logo}
          brandColor={post.metadata.brandColor}
          role={post.metadata.role}
          timeframe={post.metadata.timeframe}
          tags={post.metadata.tags}
          highlights={post.metadata.highlights}
          link={post.metadata.link}
          linkLabel={post.metadata.linkLabel}
        />
      ))}
    </div>
  );
}
