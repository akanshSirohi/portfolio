import { projects } from "./data/projects";
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
    url: `https://akanshsirohi.dev${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
