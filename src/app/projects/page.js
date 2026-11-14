import { pageMetadata } from "../seo";
import { Header, Footer } from "../components/site-chrome";
import { Work } from "../components/portfolio";
export const metadata = pageMetadata("Software Projects", "Software projects by Akansh Sirohi: QuadQR, PromptVault, ShareX for Android and desktop, open-source libraries, and professional web applications.", "/projects");
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
