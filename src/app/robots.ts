import { baseURL } from "@/app/resources";
import { cvDisallowPaths } from "@/lib/cv";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: cvDisallowPaths(),
      },
    ],
    sitemap: `${baseURL}/sitemap.xml`,
  };
}
