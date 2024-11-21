"use client";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import ReactIcon from "../components/reactIcon";
import './style.css';

import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

export default function Experience() {
    return (
        <div className=" bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
            <Navigation />
            <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
                <div className="max-w-2xl mx-auto lg:mx-0">
                    <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
                        Experience
                    </h2>
                    <p className="mt-4 text-zinc-400">
                        Embark on a Voyage: Tracing My Academic & Professional Journey
                    </p>
                </div>

                <div className="w-full h-px bg-zinc-800" />
                {/* component */}
                <div className="flex flex-col justify-center">
                    <div className="w-full px-2 py-3 sm:px-0">
                        <div className="relative text-center text-sm font-semibold text-gray-700 antialiased">
                            <VerticalTimeline animate={false}>
                                <VerticalTimelineElement
                                    className="vertical-timeline-element--work"
                                    date="2023 - Present"
                                    contentStyle={{ background: 'rgba(0,0,0,0)', color: '#fff' }}
                                    iconStyle={{ background: '', color: '#fff', backgroundImage: 'linear-gradient(to top left, var(--tw-gradient-stops))' }}
                                    icon={<ReactIcon icon="FaBriefcase" size={18} color="#fff" />}
                                >
                                    <Card className="p-6">
                                        <h3 className="vertical-timeline-element-title">Software Developer</h3>
                                        <h4 className="vertical-timeline-element-subtitle">Backend</h4>
                                        <p>Keyideas Infotech, Gurgaon</p>
                                    </Card>
                                </VerticalTimelineElement>
                                <VerticalTimelineElement
                                    className="vertical-timeline-element--education"
                                    date="2021 - 2023"
                                    contentStyle={{ background: 'rgba(0,0,0,0)', color: '#fff' }}
                                    iconStyle={{ color: '#fff', backgroundImage: 'linear-gradient(to top left, var(--tw-gradient-stops))' }}
                                    icon={<ReactIcon icon="FaGraduationCap" size={18} color="#fff" />}
                                >
                                    <Card className="p-6">
                                        <h3 className="vertical-timeline-element-title">Master of Computer Applications</h3>
                                        <h4 className="vertical-timeline-element-subtitle">Master Degree</h4>
                                        <p>Quantum University, Roorkee</p>
                                    </Card>
                                </VerticalTimelineElement>
                                <VerticalTimelineElement
                                    className="vertical-timeline-element--education"
                                    date="2018 - 2021"
                                    contentStyle={{ background: 'rgba(0,0,0,0)', color: '#fff' }}
                                    iconStyle={{ color: '#fff', backgroundImage: 'linear-gradient(to top left, var(--tw-gradient-stops))' }}
                                    icon={<ReactIcon icon="FaGraduationCap" size={18} color="#fff" />}
                                >
                                    <Card className="p-6">
                                        <h3 className="vertical-timeline-element-title">Bachelor of Computer Applications</h3>
                                        <h4 className="vertical-timeline-element-subtitle">Bachelor Degree</h4>
                                        <p>Quantum University, Roorkee</p>
                                    </Card>
                                </VerticalTimelineElement>
                                <VerticalTimelineElement
                                    iconStyle={{ color: '#fff', backgroundImage: 'linear-gradient(to top left, var(--tw-gradient-stops))' }}
                                    icon={<ReactIcon icon="FaRegStar" size={18} color="#fff" />}
                                />
                            </VerticalTimeline>
                        </div>
                    </div>
                </div>
                <div className="hidden w-full h-px md:block bg-zinc-800" />
            </div>
        </div>
    );
}