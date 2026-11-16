import { Column, Heading, Meta, Schema, Text } from "@once-ui-system/core";
import { baseURL, about, person, work } from "@/resources";
import { Projects } from "@/components/work/Projects";

export async function generateMetadata() {
  return Meta.generate({
    title: work.title,
    description: work.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(work.title)}`,
    path: work.path,
  });
}

export default function Work() {
  return (
    <Column maxWidth="l" paddingTop="24" paddingX="l" fillWidth>
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={work.path}
        title={work.title}
        description={work.description}
        image={`/api/og/generate?title=${encodeURIComponent(work.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column gap="12" marginBottom="xl" horizontal="center" align="center">
        <Heading variant="display-strong-s">Work</Heading>
        <Text variant="body-default-l" onBackground="neutral-weak" wrap="balance">
          Where I&apos;ve worked and what I&apos;ve built on the side. Open a folder to see what I did.
        </Text>
      </Column>
      <Projects />
    </Column>
  );
}
