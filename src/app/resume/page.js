import { Header, Footer } from "../components/site-chrome";
import { Arrow } from "../components/icons";
import Image from "next/image";

export const metadata = {
  title: "Résumé",
  description:
    "View or download Akansh Sirohi's résumé: backend engineering, Android applications, and interactive web development.",
};

export default function ResumePage() {
  return (
    <>
      <Header />
      <main id="main" className="resume-page section-pad standalone-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              <span>CV /</span> Experience, on paper
            </p>
            <h1>
              Behind the work<span className="accent">.</span>
            </h1>
          </div>
          <p className="section-aside">
            Software engineer.
            <br />
            Backend, web, and Android.
          </p>
        </div>
        <div className="resume-toolbar">
          <p className="mono">AKANSH SIROHI / RÉSUMÉ · PDF</p>
          <div className="resume-actions">
            <a
              className="text-link"
              href="/Akansh-Sirohi-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              View PDF <Arrow diagonal />
            </a>
            <a
              className="button button-dark"
              href="/Akansh-Sirohi-Resume.pdf"
              download
            >
              Download résumé <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
        <div className="resume-summary">
          <p>
            <strong>Software Engineer (Backend)</strong>
            <span>Keyideas Infotech · March 2023–present</span>
          </p>
          <p>
            <strong>Full stack & freelance development</strong>
            <span>Web applications · August 2021–January 2023</span>
          </p>
          <p>
            <strong>Master of Computer Applications</strong>
            <span>Quantum University · 2021–2023</span>
          </p>
        </div>
        <a
          className="resume-document"
          href="/Akansh-Sirohi-Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open Akansh Sirohi's résumé PDF"
        >
          <Image
            className="resume-preview"
            src="/resume-preview.webp"
          width={1237}
            height={1600}
            alt="Akansh Sirohi's résumé, including experience, education, projects, and technical skills"
          />
        </a>
        <p className="resume-fallback">
          For a closer look or selectable text,{" "}
          <a
            className="text-link"
            href="/Akansh-Sirohi-Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open the document directly <Arrow diagonal />
          </a>
        </p>
      </main>
      <Footer />
    </>
  );
}
