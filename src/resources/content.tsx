import type { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Logan",
  lastName: "West",
  name: "Logan West",
  role: "Product Manager",
  avatar: "/images/logan.jpg",
  email: "loganwest379@gmail.com",
  location: "America/Denver", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter: Newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>My weekly newsletter about creativity and engineering</>,
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  // Set essentials: true for links you want to show on the about page
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/loganwest03",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
  {
    name: "Resume",
    icon: "document",
    link: "/resume.pdf",
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Welcome to my portfolio!</>,
  featured: {
    display: false,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Featured</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Featured work
        </Text>
      </Row>
    ),
    href: "/work/building-once-ui-a-customizable-design-system",
  },
  subline: (
    <>
      Hi! I'm Logan, thanks for finding my portfolio. I'm so glad you're here. I built this website to provide a place to share what I've done, what I'm working on, and the fun things I like to do! Feel free to connect with me; I'd love to say hello!
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        I have a passion for product management. Growing up I always wanted to work with other people and once I found product management I learned that was the career I needed to be in. It is the perfect bridge between working with customers and delivering the best product. I am excited to combine my business strategy with my technical skills to build products that solve real problems. My work spans SaaS platforms, user experience optimization, and data-driven product decisions.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "LeaderFactor",
        timeframe: "Jan 2026 – Apr 2026",
        role: "Product Manager Intern",
        achievements: [
          "Prototyping and testing direct-to-consumer funnels (landing pages, messaging, pricing) with rapid A/B experiments",
          "Analyzing usage and survey data to validate the 15-skill model and improve onboarding and retention",
          "Building competitor scans, personas, and customer journey maps to inform positioning and go-to-market strategy",
          "Producing concise executive readouts (findings, KPIs, next experiments) and drafting UX copy or lightweight PRDs",
        ],
        images: [],
      },
      {
        company: "Brevium",
        timeframe: "May 2025 – Aug 2025",
        role: "Product Manager Intern",
        achievements: [
          "Designed a scalable intake framework to streamline team operations and cut research time by 50%",
          "Enabled enterprise billing for the top 15 private equity clients by leading a 4-engineer team from discovery to launch of a new billing feature",
          "Saved 6+ hours weekly by leading discovery and execution on a unified billing system that consolidated legacy platforms",
          "Addressed role ambiguity for 3+ product teams during a company-wide restructuring by creating and launching the first standardized PM onboarding guide",
        ],
        images: [],
      },
      {
        company: "Brigham Young University – Marriott School of Business",
        timeframe: "Feb 2025 – Apr 2025",
        role: "Strategy Research Assistant",
        achievements: [
          "Clarified the PMA's value proposition for students by structuring 30+ content assets on club tracks and offerings",
          "Promoted user engagement by integrating 5+ interactive features, accelerating website usability and user retention",
          "Reduced navigation errors by 35% through user-driven audits, usability testing, and iterative design improvements",
        ],
        images: [],
      },
      {
        company: "Nouri.ai",
        timeframe: "Jan 2025 – Apr 2025",
        role: "Product Manager Intern",
        achievements: [
          "Minimized user confusion by ~30% through targeted onboarding videos, improving adoption and retention",
          "Analyzed client processes and surfaced 10+ system inefficiencies, recommending improvements to senior leadership",
          "Outlined a 25% website efficiency gain by delivering a report on navigation and feature optimization",
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Education",
    institutions: [
      {
        name: "Brigham Young University – Marriott School of Business",
        description: (
          <>
            Bachelor of Science in Strategic Management, Minor in Computer Science. <br />
            <br />
            Emphasis in Product Management – one of 25 students selected for specialized PM track <br />
            <br />
            GPA 3.93/4.00 <br />
            <br />
            Washington Apple Education Foundation, Full Tuition Merit-Based Scholarship <br />
            <br />
            Member of Product Management Association & Marriott Research Fellows
          </>
        ),
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Product Management",
        description: (
          <>Leading product development with Agile methodologies, Jira, Notion, and Confluence. Building scalable frameworks and driving data-driven decisions.</>
        ),
        tags: [
          {
            name: "Jira",
            icon: "jira",
          },
          {
            name: "Notion",
            icon: "notion",
          },
        ],
        images: [],
      },
      {
        title: "UX/UI & Prototyping",
        description: (
          <>Creating user-centered designs and interactive prototypes with Figma, Bolt, and Lovable to validate ideas and improve user experiences.</>
        ),
        tags: [
          {
            name: "Figma",
            icon: "figma",
          },
        ],
        images: [],
      },
      {
        title: "Data & Analytics",
        description: (
          <>Analyzing product metrics and user behavior using Python, SQL, R, and Tableau to inform product strategy and measure success.</>
        ),
        tags: [
          {
            name: "Python",
            icon: "python",
          },
        ],
        images: [],
      },
      {
        title: "AI & Automation",
        description: (
          <>Leveraging OpenAI API, Cursor AI, and ElevenLabs to accelerate development and enhance product capabilities.</>
        ),
        tags: [],
        images: [],
      },
    ],
  },
  personal: {
    display: true,
    title: "Personal",
    content: (
      <>
        I am a passionate skier—I have skied at 10 resorts and counting, with a dream to go heli-skiing.
        <br />
        <br />
        I am from Wenatchee, Washington, the Apple Capital of the World!
        <br />
        <br />
        I recently got married this past summer to my best friend and we love spending time in the mountains, skiing, and playing pickleball.
      </>
    ),
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about My Life and My Learnings",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  images: [
    {
      src: "/images/projects/project-01/g1.JPG",
      alt: "Gallery image 1",
      orientation: "horizontal",
    },
    {
      src: "/images/projects/project-01/g2.JPEG",
      alt: "Gallery image 2",
      orientation: "horizontal",
    },
    {
      src: "/images/projects/project-01/g3.JPEG",
      alt: "Gallery image 3",
      orientation: "horizontal",
    },
    {
      src: "/images/projects/project-01/g4.JPEG",
      alt: "Gallery image 4",
      orientation: "horizontal",
    },
    {
      src: "/images/projects/project-01/g5.JPEG",
      alt: "Gallery image 5",
      orientation: "horizontal",
    },
    {
      src: "/images/projects/project-01/g6.JPEG",
      alt: "Gallery image 6",
      orientation: "horizontal",
    },
    {
      src: "/images/projects/project-01/g7.JPEG",
      alt: "Gallery image 7",
      orientation: "horizontal",
    },
    {
      src: "/images/projects/project-01/g8.JPEG",
      alt: "Gallery image 8",
      orientation: "horizontal",
    },
    {
      src: "/images/projects/project-01/g9.JPEG",
      alt: "Gallery image 9",
      orientation: "horizontal",
    },
    {
      src: "/images/projects/project-01/g10.JPEG",
      alt: "Gallery image 10",
      orientation: "horizontal",
    },
    {
      src: "/images/projects/project-01/g11.JPEG",
      alt: "Gallery image 11",
      orientation: "horizontal",
    },
    {
      src: "/images/projects/project-01/g12.JPEG",
      alt: "Gallery image 12",
      orientation: "horizontal",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
