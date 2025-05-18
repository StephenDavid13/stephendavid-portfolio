import { Logo } from "@/once-ui/components";
import React from "react";

const person = {
  firstName: "Stephen",
  lastName: "David",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Full-Stack Developer",
  avatar: "/images/avatar.png",
  email: "stephen.david.06@gmail.com",
  location: "Australia/Melbourne", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "Filipino"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: (
    <>
      I occasionally write about design, technology, and share thoughts on the intersection of
      creativity and engineering.
    </>
  ),
};

const social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/StephenDavid13",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/stephendavid13/",
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
  },
];

const home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>I'm Stephen David</>,
  featured: {
    display: true,
    title: <>Check my GitHub: <strong className="ml-4">StephenDavid13</strong></>,
    href: "https://github.com/StephenDavid13",
  },
  subline: (
    <>
      I am a full-stack developer creating responsive and elegant websites for multiple businesses. (insert more)
    </>
  ),
};

const about = {
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
    display: true,
    link: `mailto:${person.email}`,
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Stephen is a Melbourne-based full-stack developer... (more to come)
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "Point Hacks Ltd",
        timeframe: "May 2023 - Present",
        role: "Full-Stack Developer",
        description: "Optimising and developing Point Hacks and Australian Frequent Flyer websites and community platforms.",
        achievements: [
          <React.Fragment key="ph-ui">
            Develops front-end design according to design requirements
          </React.Fragment>,
          <React.Fragment key="ph-ui">
            Develops back-end logic using TypeScript, Vanilla Javascript, Vue.js, and Node.js
          </React.Fragment>,
          <React.Fragment key="ph-ui">
            Builds the Point Hacks Concierge web application using Remix.run
          </React.Fragment>,
          <React.Fragment key="ph-ui">
            Synchronises data to the website using GraphQL from Hygraph and PocketBase
          </React.Fragment>,
          <React.Fragment key="ph-ui">
            Collaborates in an agile environment alongside stakeholders, delivering solutions and meet deadlines
          </React.Fragment>,
        ],
        images: [],
      },
      {
        company: "The Refinery Ltd",
        timeframe: "July 2021 - May 2023",
        role: "Senior Full-Stack Web Developer",
        description: "Led a small group of developers and managed the full-stack development of websites for a digital marketing agency.",
        achievements: [
          <React.Fragment key="creativ3-design">
            Developed a design system that unified the brand across multiple platforms, improving
            design consistency by 40%.
          </React.Fragment>,
          <React.Fragment key="creativ3-product">
            Led a cross-functional team to launch a new product line, contributing to a 15% increase
            in overall company revenue.
          </React.Fragment>,
        ],
        images: [],
      },
      {
        company: "Shuk Engineering Distributors Ltd",
        timeframe: "June 2017 - June 2021",
        role: "System Administrator / Business Analyst / Full-Stack Developer",
        description: "Managed all IT operations, developed client-facing products, and maintained all IT systems for the company.",
        achievements: [
          <React.Fragment key="creativ3-design">
            Developed a design system that unified the brand across multiple platforms, improving
            design consistency by 40%.
          </React.Fragment>,
          <React.Fragment key="creativ3-product">
            Led a cross-functional team to launch a new product line, contributing to a 15% increase
            in overall company revenue.
          </React.Fragment>,
        ],
        images: [],
      },
      {
        company: "Kiwise Digital Agency",
        timeframe: "June 2015 - June 2017",
        role: "Full-Stack Developer / Office Administrator",
        description: "Managed a diverse range of client projects, including website development, mobile applications, and game creation, as the sole developer for a start-up digital marketing agency.",
        achievements: [
          <React.Fragment key="creativ3-design">
            Developed a design system that unified the brand across multiple platforms, improving
            design consistency by 40%.
          </React.Fragment>,
          <React.Fragment key="creativ3-product">
            Led a cross-functional team to launch a new product line, contributing to a 15% increase
            in overall company revenue.
          </React.Fragment>,
        ],
        images: [],
      },
      {
        company: "Accordo Group Limited",
        timeframe: "Decemeber 2014 - February 2015",
        role: "Software Engineer Intern",
        description: "Supported software development and testing for the company.",
        achievements: [
          <React.Fragment key="creativ3-design">
            Assisted in designing and developing high-value business features
          </React.Fragment>,
          <React.Fragment key="creativ3-product">
            Created and executed test cases for feature development
          </React.Fragment>,
          <React.Fragment key="creativ3-product">
            Designed and developed databases for efficient data management
          </React.Fragment>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Studies",
    institutions: [
      {
        name: "University of Auckland",
        description: <>Bachelor of Science, Major in Computer Science</>,
      },
    ],
  },
  technical: {
    display: false, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Figma",
        description: <>Able to prototype in Figma with Once UI with unnatural speed.</>,
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/projects/project-01/cover-02.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
          {
            src: "/images/projects/project-01/cover-03.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Next.js",
        description: <>Building next gen apps with Next.js + Once UI + Supabase.</>,
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/projects/project-01/cover-04.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
    ],
  },
};

const blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
