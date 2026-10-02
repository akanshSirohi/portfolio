import { Header, Footer } from "./components/site-chrome";
import { Portfolio } from "./components/portfolio";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Portfolio />
      </main>
      <Footer />
    </>
  );
}
