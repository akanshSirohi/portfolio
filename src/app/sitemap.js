import { projects } from "./data/projects";
import { siteUrl } from "./seo";
export const dynamic = "force-static";
export default function sitemap() {
  return [
    "",
    "/projects",
    "/skills",
    "/experience",
    "/contact",
    "/notes",
    "/resume",
    ...projects.map((project) => `/projects/${project.slug}`),
  ].map((path) => ({
    url: `${siteUrl}${path || "/"}`,
  }));
}
