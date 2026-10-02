import { Header, Footer } from "../components/site-chrome";
import { Journal } from "../components/portfolio";
export const metadata = {
  title: "Field notes",
  description:
    "Engineering stories, project updates, and posts by Akansh Sirohi on LinkedIn and DEV.",
};
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
