import "./globals.css";

import classNames from "classnames";

import { Header } from "@/components/shell/Header";
import { Footer } from "@/components/shell/Footer";
import { CVPrintView } from "@/components/CVPrintView";
import { loadAbout } from "@/app/utils/loadAbout";
import { buildMetadata } from "@/lib/seo";
import { baseURL, font, home, identity, social } from "@/app/resources";

export async function generateMetadata() {
  return buildMetadata({
    title: home.title,
    description: home.description,
    baseURL,
    path: home.path,
    image: home.image,
  });
}

// Runs before first paint so the theme never flashes.
const THEME_SCRIPT = `
(function(){
  try {
    var s = localStorage.getItem('theme');
    var t = (s === 'light' || s === 'dark')
      ? s
      : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', t);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { frontmatter } = loadAbout();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={classNames(font.primary.variable, font.code.variable)}
    >
      <head>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: must run before paint */}
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="grain flex min-h-dvh flex-col">
        <a href="#main" className="skip-link">
          Skip to content
        </a>

        <Header name={identity.name} />

        <main id="main" className="flex-1 pt-14">
          {children}
        </main>

        <Footer
          name={identity.name}
          location={identity.location}
          email={identity.email}
          socials={social.map((s) => ({ name: s.name, link: s.link }))}
        />

        <CVPrintView frontmatter={frontmatter} />
      </body>
    </html>
  );
}
