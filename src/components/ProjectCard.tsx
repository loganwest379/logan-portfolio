"use client";

import Link from "next/link";
import { AvatarGroup, Column, Flex, Heading, SmartLink, Text, Media } from "@once-ui-system/core";
import styles from "./ProjectCard.module.scss";

interface ProjectCardProps {
  href: string;
  priority?: boolean;
  images: string[];
  title: string;
  content: string;
  description: string;
  avatars: { src: string }[];
  link: string;
  linkLabel?: string;
  github?: string;
  role?: string;
  timeframe?: string;
  /** Show the first image as a centered logo instead of a full-bleed cover */
  logo?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  priority,
  images = [],
  title,
  content,
  description,
  avatars,
  link,
  linkLabel,
  github,
  role,
  timeframe,
  logo,
}) => {
  const hasCaseStudy = Boolean(content?.trim());
  const cover = images[0];
  const meta = [role, timeframe].filter(Boolean).join(" · ");

  const coverElement = !cover ? (
    // No image: a clean title panel so text-only work still has a strong card
    <div className={styles.panel}>
      <Text variant="display-strong-s" align="center" wrap="balance">
        {title.split(" - ")[0]}
      </Text>
      {meta && (
        <Text variant="body-default-m" onBackground="neutral-weak" align="center">
          {meta}
        </Text>
      )}
    </div>
  ) : logo ? (
    <div className={`${styles.panel} ${styles.panelLogo}`}>
      <img src={cover} alt={title} className={styles.logo} />
    </div>
  ) : (
    <Media
      priority={priority}
      src={cover}
      alt={title}
      aspectRatio="16/9"
      radius="l"
      sizes="(max-width: 960px) 100vw, 960px"
      style={{ objectFit: "cover" }}
    />
  );

  return (
    <Column fillWidth gap="m">
      {hasCaseStudy ? (
        <Link href={href} className={styles.coverLink} aria-label={`Open ${title}`}>
          {coverElement}
        </Link>
      ) : (
        coverElement
      )}
      <Flex
        s={{ direction: "column" }}
        fillWidth
        paddingX="s"
        paddingTop="12"
        paddingBottom="24"
        gap="l"
      >
        {title && (
          <Column flex={5} gap="8">
            <Heading as="h2" wrap="balance" variant="heading-strong-xl">
              {hasCaseStudy ? (
                <Link href={href} className={styles.titleLink}>
                  {title}
                </Link>
              ) : (
                title
              )}
            </Heading>
            {meta && (
              <Text variant="label-default-s" onBackground="neutral-weak">
                {meta}
              </Text>
            )}
          </Column>
        )}
        {(avatars?.length > 0 || description?.trim() || hasCaseStudy) && (
          <Column flex={7} gap="16">
            {avatars?.length > 0 && <AvatarGroup avatars={avatars} size="m" reverse />}
            {description?.trim() && (
              <Text wrap="balance" variant="body-default-s" onBackground="neutral-weak">
                {description}
              </Text>
            )}
            <Flex gap="24" wrap>
              {hasCaseStudy && (
                <SmartLink
                  suffixIcon="arrowRight"
                  style={{ margin: "0", width: "fit-content" }}
                  href={href}
                >
                  <Text variant="body-default-s">View case study</Text>
                </SmartLink>
              )}
              {github && (
                <SmartLink
                  prefixIcon="github"
                  style={{ margin: "0", width: "fit-content" }}
                  href={github}
                >
                  <Text variant="body-default-s">Code</Text>
                </SmartLink>
              )}
              {link && (
                <SmartLink
                  suffixIcon="arrowUpRightFromSquare"
                  style={{ margin: "0", width: "fit-content" }}
                  href={link}
                >
                  <Text variant="body-default-s">{linkLabel || "Visit site"}</Text>
                </SmartLink>
              )}
            </Flex>
          </Column>
        )}
      </Flex>
    </Column>
  );
};
