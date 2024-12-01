import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import './style.css';
import Image from "next/image";
import ReactIcon from "../components/reactIcon";

export default async function Skills() {
    const data = await import(`../data/DB.json`);
    const languages = data.skills.languages;
    const tools = data.skills.tools;
    const technologies = data.skills.tecnologies;

    return (
        <div className="bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0 h-full pb-3.5">
            <Navigation />
            <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
                <div className="max-w-2xl mx-auto lg:mx-0">
                    <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
                        Skills
                    </h2>
                    <p className="mt-4 text-zinc-400">
                        Unveiling My Arsenal: The Skills and Tools That Empower My Craft
                    </p>
                </div>
                <div className="w-full h-px bg-zinc-800" />
                <h3 className="text-2xl font-bold tracking-tight text-zinc-100 sm:text-3xl">
                    Languages
                </h3>
                <div className="skills-container-wrapper">
                    <div className="skills-container">
                        {languages.map((item, index) => (
                            <div key={index} >
                                <ReactIcon icon={item.icon} size={100} color="#fff" />
                            </div>
                        ))}
                    </div>
                </div>

                <h3 className="text-2xl font-bold tracking-tight text-zinc-100 sm:text-3xl">
                    Tools
                </h3>
                <div className="skills-container-wrapper">
                    <div className="skills-container">
                        {tools.map((item, index) => (
                            <div key={index} >
                                <ReactIcon icon={item.icon} size={100} color="#fff" />
                            </div>
                        ))}
                    </div>
                </div>

                <h3 className="text-2xl font-bold tracking-tight text-zinc-100 sm:text-3xl">
                    Technologies/Frameworks
                </h3>
                <div className="skills-container-wrapper">
                    <div className="skills-container">
                        {technologies.map((item, index) => (
                            <div key={index} >
                                <ReactIcon icon={item.icon} size={100} color="#fff" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}