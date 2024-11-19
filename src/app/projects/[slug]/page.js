import { notFound } from "next/navigation";
import { Header } from "./header";
import showdown from "showdown";
import parse from 'html-react-parser';
import "./project.css";

export async function generateMetadata({ params }) {
	return {
		title: "Project",
		description: "A project page",
	}
  }

export default async function PostPage({ params }) {
	const socials = [
              {
                "icon": "FiGithub",
                "id": 7,
                "label": "Github",
                "link": "https://github.com/akanshSirohi",
                "project_header": true,
                "username": "akanshSirohi"
              },
              {
                "icon": "FiLinkedin",
                "id": 6,
                "label": "Linkedin",
                "link": "https://www.linkedin.com/in/akansh-sirohi",
                "project_header": true,
                "username": "akansh-sirohi"
              },
              {
                "icon": "FiTwitter",
                "id": 5,
                "label": "Twitter",
                "link": "https://twitter.com/akansh__sirohi",
                "project_header": true,
                "username": "@akansh__sirohi"
              }
            ];

	const converter = new showdown.Converter();

    const project = {
		"content": "This is a project",
		"createdAt": "2023-10-29T18:04:46.060Z",
		"description": "Our open-source, web-based app is the ultimate file-sharing solution. Enjoy private sharing, real-time logs, and customizable themes. It works on Windows, Mac, Linux, Android, and iPhone, offering lightning-fast, offline transfers with 13 interface themes. Experience seamless, secure file sharing with ease.",
		"github_repo": "akanshSirohi/ShareX",
		"live_url": "https://f-droid.org/en/packages/com.akansh.fileserversuit/",
		"project_date": "2020-06-30",
		"publishedAt": "2023-10-29T18:04:54.870Z",
		"slug": "sharex",
		"title": "ShareX",
		"updatedAt": "2023-11-06T22:59:18.134Z"
	};

	return (
	<div className="bg-zinc-50 min-h-screen">
		<Header project={project} socials={socials} />
		<article className="px-4 py-12 mx-auto prose prose-zinc prose-quoteless">
			<div>
				{parse(converter.makeHtml(project.content))}
			</div>
		</article>
	</div>
	);
}

// add generateStaticParams function
export async function generateStaticParams() {
	return [
		{
			slug: "project-1"
		}
	];
}