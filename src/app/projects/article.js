import { Eye, View } from "lucide-react";

export const Article = ({ project }) => {
	return (
		<a href={`/projects/${project.slug}`}>
			<article className="p-4 md:p-8">
				<div className="flex justify-between gap-2 items-center">
					<span className="text-xs duration-1000 text-zinc-200 group-hover:text-white group-hover:border-zinc-200 drop-shadow-orange">
						{project.project_date ? (
							<time dateTime={new Date(project.project_date).toISOString()}>
								{Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
									new Date(project.project_date),
								)}
							</time>
						) : (
							<span>SOON</span>
						)}
					</span>
					{/* <span className="text-zinc-500 text-xs  flex items-center gap-1">
						<Eye className="w-4 h-4" />{" "}
						{Intl.NumberFormat("en-US", { notation: "compact" }).format(0)}
					</span> */}
				</div>
				<h2 className="z-20 text-xl font-medium duration-1000 lg:text-3xl text-zinc-200 group-hover:text-white font-display">
					{project.title}
				</h2>
				<p className="z-20 mt-4 text-sm duration-1000 text-zinc-400 group-hover:text-zinc-200">
					{project.description}
				</p>
				<p className="hidden text-zinc-200 hover:text-zinc-50 lg:block mt-2">
					Read more <span aria-hidden="true">&rarr;</span>
				</p>
			</article>
		</a>
	);
};