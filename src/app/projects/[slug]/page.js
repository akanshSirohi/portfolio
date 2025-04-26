import { Header } from "./header";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import "./project.css";

export async function generateMetadata({ params }) {
	const { slug } = await params;
	const data = await import(`../../data/DB.json`);
	const project = data.projects.all_projects.find(p => p.slug === slug);
	return {
		title: project.title,
		description: project.description,
	};
}

export default async function PostPage({ params }) {
	const { slug } = await params;
	const data = await import(`../../data/DB.json`);
	const socials = data.contacts;

	const markdown_file = await import(`../../data/markdown/${slug}.md`);
	const markdown_data = matter(markdown_file.default);
	const content = markdown_data.content;
	const project = data.projects.all_projects.find(project => project.slug === slug);

	return (
		<div className="bg-zinc-50 min-h-screen">
			<Header project={project} socials={socials} />
			<article className="px-4 py-12 mx-auto prose prose-zinc prose-quoteless">
				<div>
					<ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
				</div>
			</article>
		</div>
	);
}

export async function generateStaticParams() {
	const data = await import(`../../data/DB.json`);
	return data.projects.all_projects.map(project => ({
		slug: project.slug
	}));
}