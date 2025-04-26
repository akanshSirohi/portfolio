"use client";
import { useEffect, useState } from 'react';
import Particles from "./components/particles";
import Link from 'next/link';

const navigation = [
	{ name: "Projects", href: "/projects" },
	{ name: "Skills", href: "/skills" },
	{ name: "Experience", href: "/experience" },
	{ name: "Contact", href: "/contact" },
];

export default function Home() {
	const [animate, setAnimate] = useState(false);

	useEffect(() => {
		let web_session = sessionStorage.getItem("web_session");
		if (web_session == null) {
			sessionStorage.setItem("web_session", "active");
			setAnimate(true);
		}
    }, []);

	return (
		<div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
			<nav className={`my-16 ${animate ? 'animate-fade-in' : ''}`}>
				<ul className="flex flex-wrap items-center justify-center gap-4">
					{navigation.map((item) => (
						<a
							key={item.href}
							href={item.href}
							className="text-sm duration-500 text-zinc-500 hover:text-zinc-300"
						>
							{item.name}
						</a>
					))}
				</ul>
			</nav>
			<div className={`hidden w-screen h-px ${animate ? 'md:block animate-glow animate-fade-left' : ''}  bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0`} />
			<Particles
				className={`absolute inset-0 -z-10 ${animate ? 'animate-fade-in' : ''}`}
				quantity={100}
			/>
			<h1 className={`z-10 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline ${animate ? 'animate-title' : ''} font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text`}>
				Akansh Sirohi
			</h1>
			<div className={`hidden w-screen h-px ${animate ? 'md:block animate-glow animate-fade-right' : ''} bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0`} />
			<div className={`my-16 text-center ${animate ? 'animate-fade-in' : ''}`}>
				<h2 className="text-sm text-zinc-500 mx-6">
					{`Welcome to the den of a software engineer! 🦸‍♂️ `}
					<br className="block md:hidden" /> 
					{`I make the magic happen behind the scenes—like a wizard 🧙‍♂️, but with code 💻.`}
				</h2>
			</div>
		</div>
	);
}
