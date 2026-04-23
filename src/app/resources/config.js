import { Geist, Geist_Mono } from "next/font/google";

const baseURL = "https://stephendavid.dev";

const routes = {
  "/": true,
  "/about": true,
  "/work": true,
};

const identity = {
  firstName: "Stephen",
  lastName: "David",
  name: "Stephen David",
  role: "Full-Stack Web Developer",
  location: "Melbourne, VIC",
  timezone: "Australia/Melbourne",
  email: "hello@stephendavid.dev",
  emailAlt: "stephen.david.06@gmail.com",
  phone: "+61 477 274 345",
  website: "stephendavid.dev",
};

const social = [
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
    link: `mailto:${identity.email}`,
  },
];

const home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${identity.name} — ${identity.role}`,
  description: `Portfolio showcasing work by ${identity.name}, ${identity.role} based in ${identity.location}.`,
  headline: "Stephen David",
  subline:
    "Full-stack developer crafting scalable web solutions with solid engineering and thoughtful responsive design.",
  cta: {
    label: "View CV",
    href: "/about",
  },
};

const about = {
  path: "/about",
  label: "About",
};

const work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${identity.name}`,
  description: `Design and dev projects by ${identity.name}.`,
};

const primaryFont = Geist({
  variable: "--font-primary",
  subsets: ["latin"],
  display: "swap",
});

const monoFont = Geist_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  display: "swap",
});

const font = {
  primary: primaryFont,
  secondary: primaryFont,
  tertiary: primaryFont,
  code: monoFont,
};

const style = {
  theme: "dark",
  neutral: "gray",
  brand: "aqua",
  accent: "cyan",
  solid: "contrast",
  solidStyle: "flat",
  border: "playful",
  surface: "translucent",
  transition: "all",
  scaling: "95",
};

const effects = {
  mask: { cursor: false, x: 50, y: 0, radius: 100 },
  gradient: {
    display: false,
    opacity: 100,
    x: 50,
    y: 60,
    width: 100,
    height: 50,
    tilt: 0,
    colorStart: "accent-background-strong",
    colorEnd: "page-background",
  },
  dots: {
    display: true,
    opacity: 40,
    size: "2",
    color: "brand-background-strong",
  },
  grid: {
    display: false,
    opacity: 100,
    color: "neutral-alpha-medium",
    width: "0.25rem",
    height: "0.25rem",
  },
  lines: {
    display: false,
    opacity: 100,
    color: "neutral-alpha-weak",
    size: "16",
    thickness: 1,
    angle: 45,
  },
};

const display = {
  location: true,
  time: true,
  themeSwitcher: true,
};

export {
  baseURL,
  routes,
  identity,
  social,
  home,
  about,
  work,
  font,
  style,
  effects,
  display,
};
