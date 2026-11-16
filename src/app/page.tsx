import {
  Heading,
  Text,
  Button,
  Avatar,
  RevealFx,
  Column,
  Badge,
  Row,
  Schema,
  Meta,
  Line,
} from "@once-ui-system/core";
import { home, about, person, baseURL, routes, social, sameAs } from "@/resources";
import { Posts } from "@/components/blog/Posts";
import { Projects } from "@/components/work/Projects";
import { HomeCarousel } from "@/components/HomeCarousel";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default function Home() {
  return (
    <>
      <Column maxWidth="m" gap="xl" paddingY="12" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        sameAs={Object.values(sameAs)}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column fillWidth horizontal="center" gap="m">
        <Column maxWidth="s" horizontal="center" align="center">
          {home.featured.display && (
            <RevealFx
              fillWidth
              horizontal="center"
              paddingTop="16"
              paddingBottom="32"
              paddingLeft="12"
            >
              <Badge
                background="brand-alpha-weak"
                paddingX="12"
                paddingY="4"
                onBackground="neutral-strong"
                textVariant="label-default-s"
                arrow={false}
                href={home.featured.href}
              >
                <Row paddingY="2">{home.featured.title}</Row>
              </Badge>
            </RevealFx>
          )}
          <RevealFx translateY="4" fillWidth horizontal="center" paddingBottom="16">
            <Heading wrap="balance" variant="display-strong-l">
              {home.headline}
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="center" paddingBottom="32">
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
              {home.subline}
            </Text>
          </RevealFx>
          <RevealFx paddingTop="12" delay={0.4} horizontal="center" paddingLeft="12">
            <Row gap="12" vertical="center" horizontal="center" wrap>
              <Button
                id="about"
                data-border="rounded"
                href={about.path}
                variant="secondary"
                size="m"
                weight="default"
                arrowIcon
              >
                <Row gap="8" vertical="center" paddingRight="4">
                  {about.avatar.display && (
                    <Avatar
                      marginRight="8"
                      style={{ marginLeft: "-0.75rem" }}
                      src={person.avatar}
                      size="m"
                    />
                  )}
                  About me
                </Row>
              </Button>
              {["Resume", "LinkedIn", "GitHub"].map((name) => {
                const item = social.find((s) => s.name === name);
                if (!item) return null;
                return (
                  <Button
                    key={item.name}
                    data-border="rounded"
                    href={item.link}
                    variant="secondary"
                    size="m"
                    weight="default"
                    prefixIcon={item.icon}
                  >
                    {item.name}
                  </Button>
                );
              })}
            </Row>
          </RevealFx>
        </Column>
      </Column>
      {routes["/work"] && (
        <Column fillWidth gap="l" paddingX="l">
          <Row fillWidth vertical="end" horizontal="between" gap="16" wrap>
            <Heading as="h2" variant="display-strong-xs" wrap="balance">
              Selected work
            </Heading>
            <Button href="/work" variant="tertiary" size="s" suffixIcon="arrowRight">
              All work
            </Button>
          </Row>
          <Projects openFirst />
        </Column>
      )}
      <Column fillWidth horizontal="center" gap="m" paddingX="l">
        <Column fillWidth gap="m" style={{ maxWidth: "36rem" }}>
          <Column gap="8">
            <Heading as="h2" variant="display-strong-xs">
              Outside of work
            </Heading>
            {home.outsideWork && (
              <Text onBackground="neutral-weak" variant="body-default-l" wrap="balance">
                {home.outsideWork}
              </Text>
            )}
          </Column>
          <HomeCarousel photos={home.carousel} />
        </Column>
      </Column>
      {routes["/blog"] && (
        <Column fillWidth gap="24" marginBottom="l">
          <Row fillWidth paddingRight="64">
            <Line maxWidth={48} />
          </Row>
          <Row fillWidth gap="24" marginTop="40" s={{ direction: "column" }}>
            <Row flex={1} paddingLeft="l" paddingTop="24">
              <Heading as="h2" variant="display-strong-xs" wrap="balance">
                Latest from the blog
              </Heading>
            </Row>
            <Row flex={3} paddingX="20">
              <Posts range={[1, 2]} columns="2" />
            </Row>
          </Row>
          <Row fillWidth paddingLeft="64" horizontal="end">
            <Line maxWidth={48} />
          </Row>
        </Column>
      )}
    </Column>
    </>
  );
}
