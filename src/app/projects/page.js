import { Header, Footer } from "../components/site-chrome";
import { Work } from "../components/portfolio";
export const metadata = {
  title: "Selected work",
  description:
    "Explore open-source libraries, Android applications, and professional web projects by Akansh Sirohi, including QuadQR, PromptVault, ShareX, and interactive jewelry try-on.",
};
export default function Projects() {
  return (
    <>
      <Header />
      <main id="main">
        <Work standalone />
      </main>
      <Footer />
    </>
  );
}
