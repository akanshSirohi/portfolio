import { pageMetadata } from "../seo";
import { Header, Footer } from "../components/site-chrome";
import { Journal } from "../components/portfolio";
export const metadata = pageMetadata("Engineering Notes", "Engineering stories, open-source project updates, and articles by software engineer Akansh Sirohi on LinkedIn and DEV.", "/notes");
export default function NotesPage() {
  return (
    <>
      <Header />
      <main id="main">
        <Journal standalone />
      </main>
      <Footer />
    </>
  );
}
