import { Header, Footer } from "./components/site-chrome";
import Link from "next/link";
import { Arrow } from "./components/icons";
export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="not-found">
        <p className="eyebrow">404 / A wrong turn</p>
        <h1>Still curious?</h1>
        <p>
          That page isn’t here. There are plenty of ideas to explore back home.
        </p>
        <Link className="button button-dark" href="/">
          Back to the portfolio <Arrow />
        </Link>
      </main>
      <Footer />
    </>
  );
}
