import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import './style.css';

export default function Skills() {
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
                <div className="flex flex-col justify-center">
                    <div className="w-full px-2 py-3 sm:px-0">
                        <div className="relative text-sm font-semibold text-white antialiased">
                            <h2 className="font-bold tracking-tight text-zinc-100 sm:text-4xl">
                                Languages
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}