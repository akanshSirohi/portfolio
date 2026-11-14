import { pageMetadata } from "../seo";
import { Header, Footer } from "../components/site-chrome";
import { About } from "../components/portfolio";
export const metadata = pageMetadata("Software Engineering Skills", "Explore Akansh Sirohi's software engineering skills in backend systems, JavaScript, React, Next.js, PHP, Android, and open-source development.", "/skills");
export default function SkillsPage() {
  return (
    <>
      <Header />
      <main id="main">
        <About standalone />
      </main>
      <Footer />
    </>
  );
}
