import { Header, Footer } from "../components/site-chrome";
import { Experience } from "../components/portfolio";
export const metadata = { title: "Experience" };
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
