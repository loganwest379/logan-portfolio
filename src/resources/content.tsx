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
  display: false,
  title: <>Subscribe to {person.firstName}&apos;s Newsletter</>,
  description: <>My weekly newsletter about creativity and engineering</>,
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  // Set essentials: true for links you want to show on the about page
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/loganwest379",
    essential: true,
  },
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
  image: `/api/og/generate?title=${encodeURIComponent(`${person.name}'s Portfolio`)}`,
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `${person.name} is a product manager who builds data-driven, user-focused products. Walmart Global Tech, LeaderFactor, and founder of Leeway.`,
  headline: <>Hi, I&apos;m Logan.</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Featured</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Building Leeway, a travel money app
        </Text>
      </Row>
    ),
    href: "/work/leeway",
  },
  subline: (
    <>
      A product manager who builds data-driven, user-focused products. Most recently at Walmart
      Global Tech. Now building Leeway, a travel money app.
    </>
  ),
  outsideWork: (
    <>
      When I&apos;m not building products, I&apos;m skiing (10 resorts and counting), exploring the
      mountains, or playing pickleball with my wife.
    </>
  ),
  carousel: [
    { src: "/images/home/cover-2.jpg", alt: "Logan and wife taking a selfie in a tall green field" },
    { src: "/images/home/cover-1.jpg", alt: "Logan and wife standing in a golden field at sunset with mountains behind" },
    { src: "/images/home/cover-3.jpg", alt: "Logan and wife in rain jackets inside a graffiti-covered lookout above a valley" },
    { src: "/images/home/cover-4.jpg", alt: "Logan and wife on their wedding day in a field of tall grass" },
  ],
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role}`,
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
        I have a passion for product management. Growing up I always wanted to work with other people and once I found product management I learned that was the career I needed to be in. It is the perfect bridge between working with customers and delivering the best product. I am excited to combine my business strategy with my technical skills to build products that solve real problems. Most recently I was a Product Manager Intern at Walmart Global Tech, and right now I&apos;m building Leeway, a travel money app for iPhone. My work spans SaaS platforms, user experience optimization, and data-driven product decisions.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "Walmart",
        timeframe: "May 2026 – Aug 2026",
        role: "Product Manager Intern – Global Tech (Accelerated Pickup & Delivery)",
        achievements: [
          "Built a self-service Python/FastAPI + BigQuery dashboard giving real-time performance visibility across 19 fulfillment sites, replacing one-off analyst requests, then transferred full ownership to 2 full-time PMs",
          "Designed a diagnostic framework isolating a single fixable product-selection gap, then closed it, adding 1,463 products to one site's assortment and lifting order completion by 3.6 percentage points",
          "Developed a site-complexity model ranking all 19 locations to prioritize Product and Engineering focus, then presented findings to SVP-level leadership across 4 review rounds, aligning 10+ cross-functional stakeholders",
        ],
        images: [],
      },
      {
        company: "LeaderFactor – Leadership Assessment SaaS",
        timeframe: "Jan 2026 – Apr 2026",
        role: "Product Manager Intern",
        achievements: [
          "Prototyped and tested D2C funnels across landing pages, messaging, and pricing using A/B experiments",
          "Analyzed usage and survey data to validate the 15-skill model, surfacing onboarding and retention opportunities",
        ],
        images: [],
      },
      {
        company: "Brevium – Healthcare SaaS",
        timeframe: "May 2025 – Aug 2025",
        role: "Product Manager Intern – Implementation",
        achievements: [
          "Designed a scalable intake framework to streamline team operations and cut research time by 50%",
          "Enabled enterprise billing for the top 15 private equity clients by leading a 4-engineer team from discovery to launch of a new billing feature",
          "Saved 6+ hours weekly by leading discovery and execution on a unified billing system that consolidated legacy platforms",
          "Addressed role ambiguity for 3+ product teams during a company-wide restructuring by creating and launching the first standardized PM onboarding guide",
        ],
        images: [],
      },
      {
        company: "Nouri.ai – CRM & Events Platform",
        timeframe: "Jan 2025 – Apr 2025",
        role: "Product Manager Intern",
        achievements: [
          "Reduced user confusion by ~30% through targeted onboarding content, improving product adoption and retention",
          "Analyzed client workflows, surfaced 10+ inefficiencies, and delivered solutions to senior leadership",
        ],
        images: [],
      },
      {
        company: "Product Management Association – BYU",
        timeframe: "Mar 2026 – Present",
        role: "Vice President",
        achievements: [
          "Led a campus tabling event as VP to grow club membership, recruiting 21+ new members through direct outreach",
          "Mentor ~30 club members on product management fundamentals, case prep, and resume building, serving as a go-to resource for underclassmen navigating PM recruiting",
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
            Bachelor of Science in Strategic Management, Minor in Computer Science · Graduating Dec 2026 <br />
            <br />
            Emphasis in Product Management – 1 of 25 students selected for the specialized PM track <br />
            <br />
            GPA 3.9 / 4.00 · Dean&apos;s List · Full Tuition Merit-Based Scholarship · Marriott Research Fellow <br />
            <br />
            Relevant coursework: Advanced Competitive Strategy, Strategy Analytics, Economics of Strategy, Programming
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
        title: "Product Management & UX",
        description: (
          <>PRDs, roadmapping, stakeholder interviews, customer discovery, A/B testing, and wireframing, with Jira and Figma.</>
        ),
        tags: [
          { name: "Jira", icon: "jira" },
          { name: "Figma", icon: "figma" },
        ],
        images: [],
      },
      {
        title: "Data & Analytics",
        description: (
          <>Turning product and operational data into decisions with BigQuery, Python, SQL, R, and Tableau.</>
        ),
        tags: [{ name: "Python", icon: "python" }],
        images: [],
      },
      {
        title: "Web & Development",
        description: (
          <>Shipping real products with React, Next.js, React Native, Supabase, FastAPI, Vercel, and Git/GitHub.</>
        ),
        tags: [{ name: "GitHub", icon: "github" }],
        images: [],
      },
      {
        title: "AI & Prototyping",
        description: (
          <>Building and prototyping faster with Claude, Codex, ElevenLabs, and Antigravity. Certified: OpenAI Academy, Google AI Essentials.</>
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
        I married my best friend in the summer of 2025, and we love spending time in the mountains, skiing, and playing pickleball.
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
  description: `Product work and case studies by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/work/projects
  // All projects will be listed on the /home and /work routes
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  images: [
    {
      src: "/images/gallery/photo-01.jpg",
      alt: "Logan and a friend in front of rows of stormtrooper figures at an exhibit",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/photo-02.jpg",
      alt: "Logan and wife in helmets and goggles on a snowy ski run",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/photo-03.jpg",
      alt: "Logan and wife in helmets on a zipline platform above a green valley",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/photo-04.jpg",
      alt: "Logan and wife taking a selfie at a lookout over misty green mountains",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/photo-05.jpg",
      alt: "Logan and wife standing on rocks by a mountain lake",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/photo-06.jpg",
      alt: "Logan and wife taking a selfie in front of two tents at a campsite",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/photo-07.jpg",
      alt: "Logan and wife taking a selfie in a tall green field",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/photo-08.jpg",
      alt: "Logan and wife taking a selfie at a mountain trailhead",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/photo-09.jpg",
      alt: "Logan and wife at a theme park at night in front of a large spaceship replica",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/photo-10.jpg",
      alt: "Logan and wife in blue at a night college football game",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/photo-11.jpg",
      alt: "Logan and wife holding a pumpkin in front of a lit-up red barn at night",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/photo-12.jpg",
      alt: "Logan and wife at a ski resort with snowy peaks behind",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
