"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Particles from "../../components/particles";
import ReactIcon from "../../components/reactIcon";

export const Header = ({ project, socials }) => {
  const headerRef = useRef(null);
  const [isDark, setIsDark] = useState(true);

  // build your GitHub/Website links
  const links = [];
  if (project.github_repo) {
    links.push({ label: "GitHub", href: `https://github.com/${project.github_repo}` });
  }
  if (project.live_url) {
    links.push({ label: "Website", href: project.live_url });
  }

  return (
    <header
      ref={headerRef}
      className="relative isolate overflow-hidden bg-gradient-to-tl from-black via-zinc-900 to-black"
    >
      <Particles className="absolute inset-0 -z-10 h-full" quantity={100} />

      {/* Nav Bar */}
      <div
        className={`fixed inset-x-0 top-0 z-50 backdrop-blur duration-200 border-b ${
          isDark
            ? "bg-zinc-900/0 border-transparent"
            : "bg-white/10 border-zinc-200"
        }`}
      >
        <div className="container flex flex-row-reverse items-center justify-between p-6 mx-auto">
          <div className="flex gap-8">
            {socials
              .filter((s) => s.project_header)
              .map((social, i) => (
                <Link target="_blank" href={social.link} key={i}>
                  <ReactIcon
                    icon={social.icon}
                    size={24}
                    className={`w-6 h-6 duration-200 ${
                      isDark
                        ? "text-zinc-400 hover:text-white"
                        : "text-zinc-600 hover:text-black"
                    }`}
                  />
                </Link>
              ))}
          </div>

          <Link
            href="/projects"
            className={`duration-200 ${
              isDark ? "text-zinc-400 hover:text-white" : "text-zinc-600 hover:text-black"
            }`}
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
        </div>
      </div>

      {/* Hero Content */}
      <div className="container mx-auto py-24 sm:py-32 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
          {project.title}
        </h1>
        <p className="mt-6 text-lg leading-8 text-zinc-300">
          {project.description}
        </p>
        <div className="mt-10 flex justify-center gap-10 text-base font-semibold text-white">
          {links.map(({ label, href }) => (
            <Link target="_blank" key={label} href={href}>
              {label} &rarr;
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};
