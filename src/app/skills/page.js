import { Header, Footer } from "../components/site-chrome";
import { About } from "../components/portfolio";
export const metadata = { title: "Skills & approach" };
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
