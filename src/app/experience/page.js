import { pageMetadata } from "../seo";
import { Header, Footer } from "../components/site-chrome";
import { Experience } from "../components/portfolio";
export const metadata = pageMetadata("Software Engineering Experience", "Akansh Sirohi's experience in backend engineering, web applications, e-commerce, and freelance full-stack software development.", "/experience");
export default function ExperiencePage() {
  return (
    <>
      <Header />
      <main id="main">
        <Experience standalone />
      </main>
      <Footer />
    </>
  );
}
