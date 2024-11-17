"use client";
import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import Particles from "../components/particles";
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
                    <Particles
                        className="absolute inset-0 -z-10 animate-fade-in"
                        quantity={100}
                    />
                    <div className="w-full px-2 py-3 sm:px-0">
                        <div className="relative text-center text-sm font-semibold text-gray-700 antialiased">
                            <VerticalTimeline animate={false}>
                                <VerticalTimelineElement
                                    className="vertical-timeline-element--work"
                                    contentStyle={{ background: 'rgba(0,0,0,0)', color: '#fff' }}
                                    contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                                    date="2011 - present"                                    
                                    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                                    icon={<ReactIcon icon="FaBriefcase" size={18} color="#fff" />}
                                >
                                    <Card className="p-6">
                                        <h3 className="vertical-timeline-element-title">Creative Director</h3>
                                        <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
                                        <p>
                                        Creative Direction, User Experience, Visual Design, Project Management, Team Leading
                                        </p>
                                    </Card>
                                </VerticalTimelineElement>
                                <VerticalTimelineElement
                                    className="vertical-timeline-element--work"
                                    date="2010 - 2011"
                                    contentStyle={{ background: 'rgba(0,0,0,0)', color: '#fff' }}
                                    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                                    icon={<ReactIcon icon="FaBriefcase" size={18} color="#fff" />}
                                >
                                    <Card className="p-6">
                                        <h3 className="vertical-timeline-element-title">Art Director</h3>
                                        <h4 className="vertical-timeline-element-subtitle">San Francisco, CA</h4>
                                        <p>
                                        Creative Direction, User Experience, Visual Design, SEO, Online Marketing
                                        </p>
                                    </Card>
                                </VerticalTimelineElement>
                                <VerticalTimelineElement
                                    className="vertical-timeline-element--work"
                                    date="2008 - 2010"
                                    contentStyle={{ background: 'rgba(0,0,0,0)', color: '#fff' }}
                                    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                                    icon={<ReactIcon icon="FaBriefcase" size={18} color="#fff" />}
                                >
                                    <Card className="p-6">
                                        <h3 className="vertical-timeline-element-title">Web Designer</h3>
                                        <h4 className="vertical-timeline-element-subtitle">Los Angeles, CA</h4>
                                        <p>
                                        User Experience, Visual Design
                                        </p>
                                    </Card>
                                </VerticalTimelineElement>
                                <VerticalTimelineElement
                                    className="vertical-timeline-element--work"
                                    date="2006 - 2008"
                                    contentStyle={{ background: 'rgba(0,0,0,0)', color: '#fff' }}
                                    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                                    icon={<ReactIcon icon="FaBriefcase" size={18} color="#fff" />}
                                >
                                    <Card className="p-6">
                                        <h3 className="vertical-timeline-element-title">Web Designer</h3>
                                        <h4 className="vertical-timeline-element-subtitle">San Francisco, CA</h4>
                                        <p>
                                        User Experience, Visual Design
                                        </p>
                                    </Card>
                                </VerticalTimelineElement>
                                <VerticalTimelineElement
                                    className="vertical-timeline-element--education"
                                    date="April 2013"
                                    contentStyle={{ background: 'rgba(0,0,0,0)', color: '#fff' }}
                                    iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
                                    icon={<ReactIcon icon="FaGraduationCap" size={18} color="#fff" />}
                                >
                                    <Card className="p-6">
                                        <h3 className="vertical-timeline-element-title">Content Marketing for Web, Mobile and Social Media</h3>
                                        <h4 className="vertical-timeline-element-subtitle">Online Course</h4>
                                        <p>
                                        Strategy, Social Media
                                        </p>
                                    </Card>
                                </VerticalTimelineElement>
                                <VerticalTimelineElement
                                    className="vertical-timeline-element--education"
                                    date="November 2012"
                                    contentStyle={{ background: 'rgba(0,0,0,0)', color: '#fff' }}
                                    iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
                                    icon={<ReactIcon icon="FaGraduationCap" size={18} color="#fff" />}
                                >
                                    <Card className="p-6">
                                        <h3 className="vertical-timeline-element-title">Agile Development Scrum Master</h3>
                                        <h4 className="vertical-timeline-element-subtitle">Certification</h4>
                                        <p>
                                        Creative Direction, User Experience, Visual Design
                                        </p>
                                    </Card>
                                </VerticalTimelineElement>
                                <VerticalTimelineElement
                                    className="vertical-timeline-element--education"
                                    date="2002 - 2006"
                                    contentStyle={{ background: 'rgba(0,0,0,0)', color: '#fff' }}
                                    iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
                                    icon={<ReactIcon icon="FaGraduationCap" size={18} color="#fff" />}
                                >
                                    <Card className="p-6">
                                        <h3 className="vertical-timeline-element-title">Bachelor of Science in Interactive Digital Media Visual Imaging</h3>
                                        <h4 className="vertical-timeline-element-subtitle">Bachelor Degree</h4>
                                        <p>
                                        Creative Direction, Visual Design
                                        </p>
                                    </Card>
                                </VerticalTimelineElement>
                                <VerticalTimelineElement
                                    iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
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