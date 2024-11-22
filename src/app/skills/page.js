import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import './style.css';
import Image from "next/image";
import ReactIcon from "../components/reactIcon";

const skills = [
    {
        icon: "IoLogoJavascript",
        skill: "JavaScript",
    },
    {
        icon: "FaReact",
        skill: "React",
    },
    {
        icon: "RiNextjsFill",
        skill: "NextJs",
    },
    {
        icon: "FaJava",
        skill: "Java",
    },
    {
        icon: "DiNodejs",
        skill: "Node.js",
    },
    {
        icon: "FaPython",
        skill: "Python",
    },
    {
        icon: "DiDjango",
        skill: "Django",
    },
    {
        icon: "SiMongodb",
        skill: "MongoDB",
    },
    {
        icon: "SiMysql",
        skill: "MySQL",
    },
    {
        icon: "GrGraphQl",
        skill: "GraphQL",
    },
    {
        icon: "SiKubernetes",
        skill: "Kubernetes",
    },
];

export default async function Skills() {
    // const data = await import(`../data/DB.json`);

    return (
        <div className="bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0 h-dvh">
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
                <div className="skills-container">
                    {skills.map((item, index) => (
                        <div key={index} >
                            {/* <Image
                                src={item.icon}
                                alt={item.skill}
                                className="card"
                                width={100}
                                height={100}
                            /> */}
                            <ReactIcon icon={item.icon} size={100} color="#fff" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}