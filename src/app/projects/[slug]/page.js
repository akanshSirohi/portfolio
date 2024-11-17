import { notFound } from "next/navigation";
import { Header } from "./header";
import showdown from "showdown";
import parse from 'html-react-parser';
import "./project.css";

export async function generateMetadata({ params }) {
	const {title, description} = await get_project_metadata(params.slug);
	return {title,description}
  }

export default async function PostPage({ params }) {
	const slug = params.slug;
    const data = await getProjectBySlug(slug);

	const contacts = await getContactDetails();
	const socials = contacts.data.attributes.contacts;

	const converter = new showdown.Converter();
    
	if (data === null) {
		notFound();
	}

    const project = data.data[0].attributes;

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