import { Header, Footer } from "../components/site-chrome";
export const metadata = { title: "Get in touch" };
export default function ContactPage() {
  return (
    <>
      <Header />
      <main id="main" className="contact-page-intro">
        <p className="eyebrow">Open to possibilities</p>
        <h1>
          Good things start
          <br />
          with a conversation<span className="accent">.</span>
        </h1>
        <p>
          Connect on LinkedIn, explore my work on GitHub,
          <br />
          or follow along on X. I’d love to hear what you’re building.
        </p>
      </main>
      <Footer />
    </>
  );
}
