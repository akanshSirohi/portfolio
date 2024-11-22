import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import './style.css';
import Image from "next/image";

const skills = [
    {
        imgSrc: "https://cdn-icons-png.flaticon.com/512/5968/5968381.png",
        skill: "TypeScript",
    },
    {
        imgSrc: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
        skill: "React",
    },
    {
        imgSrc: "https://angular.io/assets/images/logos/angular/angular.svg",
        skill: "Angular",
    },
    {
        imgSrc: "https://cdn-icons-png.flaticon.com/512/226/226777.png",
        skill: "Java",
    },
    {
        imgSrc: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg",
        skill: "Node.js",
    },
    {
        imgSrc: "https://cdn.iconscout.com/icon/free/png-256/free-python-logo-icon-download-in-svg-png-gif-file-formats--technology-social-media-vol-5-pack-logos-icons-2945099.png?f=webp",
        skill: "Python",
    },
    {
        imgSrc: "https://cdn.iconscout.com/icon/free/png-256/free-django-logo-icon-download-in-svg-png-gif-file-formats--technology-social-media-company-vol-2-pack-logos-icons-2970205.png?f=webp&w=256",
        skill: "Django",
    },
    {
        imgSrc: "https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg",
        skill: "PostgreSQL",
    },
    {
        imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrLIsoAHea-BOhRzeFAqp8P9OChYR2Fch6mQ&s",
        skill: "MySQL",
    },
    {
        imgSrc: "https://banner2.cleanpng.com/20180415/ptq/avfqdec1g.webp",
        skill: "GraphQL",
    },
    {
        imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLjjCqpT9yFoRs4odDSt__6-0MDmq7q-VvmA&s",
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
                <div className="container">
                    {skills.map((item, index) => (
                        <div key={index} >
                            <Image
                                src={item.imgSrc}
                                alt={item.skill}
                                className="card"
                                width={100}
                                height={100}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}