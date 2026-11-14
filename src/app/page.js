import { Header, Footer } from "./components/site-chrome";
import { Portfolio } from "./components/portfolio";
import { profileData, StructuredData, pageMetadata, siteTitle, siteDescription } from "./seo";

export const metadata = {
  ...pageMetadata("Software Engineer", siteDescription, "/"),
  title: { absolute: siteTitle },
};

export default function Home() {
  return (
    <>
      <StructuredData data={profileData} />
      <Header />
      <main id="main">
        <Portfolio />
      </main>
      <Footer />
    </>
  );
}
