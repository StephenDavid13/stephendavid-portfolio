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
  email: "hello@stephendavid.dev",
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
  headline: <>Stephen David</>,
  featured: {
    display: true,
    title: <><strong>Check out my CV</strong></>,
    href: "/files/Stephen_Lawrence_David-CV.pdf",
  },
  subline: (
    <>
      I am a full-stack developer crafting scalable web solutions with solid engineering and thoughtful responsive design.
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
  mail: {
    display: true,
    link: `mailto:${person.email}`,
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        I am a full-stack developer with 10+ years of experience creating responsive, scalable websites and applications. I build everything with solid engineering with thoughtful design with my work, ranging from custom CMS themes to full web apps.
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
          <React.Fragment key="pointhacks-dev-front-end">
            Develops front-end design according to design requirements
          </React.Fragment>,
          <React.Fragment key="pointhacks-dev-back-end">
            Develops back-end logic using TypeScript, Vanilla Javascript, Vue.js, and Node.js
          </React.Fragment>,
          <React.Fragment key="pointhacks-dev-remix">
            Builds the Point Hacks Concierge web application using Remix.run
          </React.Fragment>,
          <React.Fragment key="pointhacks-dev-graphql">
            Synchronises data to the website using GraphQL from Hygraph and PocketBase
          </React.Fragment>,
          <React.Fragment key="pointhacks-collaboration">
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
          <React.Fragment key="refinery-dev-fullstack">
            Executed full end-to-end UI / UX website development
          </React.Fragment>,
          <React.Fragment key="refinery-design">
            Developed and implemented all the websites designed by our designers
          </React.Fragment>,
          <React.Fragment key="refinery-dev-back-end">
            Created back-end logic and functionality using React.js and jQuery
          </React.Fragment>,
          <React.Fragment key="refinery-dev-database">
            Designed database structures for data storage and retrieval
          </React.Fragment>,
          <React.Fragment key="refinery-admin">
            Administered WHM, cPanel, domains, and SSL certificates
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
          <React.Fragment key="shuk-dev-database">
            Wrote SQL scripts using MySQL to create business information
          </React.Fragment>,
          <React.Fragment key="shuk-reports">
            Created and collated reports for stakeholder and managerial consumption
          </React.Fragment>,
          <React.Fragment key="shuk-crm">
            Administered relational databases, including security, CRM, and product inventory
          </React.Fragment>,
          <React.Fragment key="shuk-forecasts">
            Created forecasts for company product purchases
          </React.Fragment>,
          <React.Fragment key="shuk-analysis">
            Analysed and corrected data inconsistencies in the system
          </React.Fragment>,
          <React.Fragment key="shuk-dev-fullstack">
            Developed and designed the company's website and its backend logic
          </React.Fragment>,
          <React.Fragment key="shuk-dev-structure">
            Built the database structure for data storage and retrieval
          </React.Fragment>,
          <React.Fragment key="shuk-admin">
            Managed all IT systems including Cin7, Office 365, and Email Exchange
          </React.Fragment>,
          <React.Fragment key="shuk-admin-cpanel">
            Managed the company's WHM and cPanel
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
          <React.Fragment key="kiwise-dev-fullstack">
            Developed end-to-end UI/UX solutions, including customer interactions
          </React.Fragment>,
          <React.Fragment key="kiwise-dev-website">
            Built and designed WordPress websites
          </React.Fragment>,
          <React.Fragment key="kiwise-dev-game">
            Designed and developed 2D games and apps
          </React.Fragment>,
          <React.Fragment key="kiwise-dev-logic">
            Implemented all the backend that handles all the logic from all the above
          </React.Fragment>,
          <React.Fragment key="kiwise-dev-database">
            Managed and designed the database structure for data storage and retrieval
          </React.Fragment>,
          <React.Fragment key="kiwise-dev-admin">
            Administered WHM, cPanel, domains, and SSL certificates
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
          <React.Fragment key="accordo-deisgn">
            Assisted in designing and developing high-value business features
          </React.Fragment>,
          <React.Fragment key="accordo-dev-testing">
            Created and executed test cases for feature development
          </React.Fragment>,
          <React.Fragment key="accordo-dev-database">
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
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "HTML & CSS",
        description: <>Semantic, accessible HTML and responsive layouts with modern CSS.</>,
        images: [],
      },
      {
        title: "Tailwind CSS & SCSS",
        description: <>Rapid UI development with Tailwind CSS and scalable styles using SCSS for custom theming.</>,
        images: [],
      },
      {
        title: "JavaScript & TypeScript",
        description: <>Strong front-end logic with JavaScript and robust type safety with TypeScript.</>,
        images: [],
      },
      {
        title: "Vue & jQuery",
        description: <>Experience building reactive UIs with Vue and maintaining legacy features with jQuery.</>,
        images: [],
      },
      {
        title: "React Ecosystem",
        description: <>Developing modern web apps using React.js, Remix.run, React Native, and Next.js.</>,
        images: [],
      },
      {
        title: "Node.js",
        description: <>Back-end functionality and API development with Node.js and Express.</>,
        images: [],
      },
      {
        title: "REST & GraphQL APIs",
        description: <>Comfortable working with both REST and GraphQL APIs for dynamic data handling.</>,
        images: [],
      },
      {
        title: "MySQL",
        description: <>Relational database design, queries, and optimization with MySQL.</>,
        images: [],
      },
      {
        title: "WordPress & Silverstripe",
        description: <>Custom theme and plugin development in WordPress and CMS configuration in Silverstripe.</>,
        images: [],
      },
      {
        title: "Server Tools",
        description: <>Experienced with server management tools like cPanel, WHM, and phpMyAdmin.</>,
        images: [],
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
