/* NEXT */
import { notFound } from "next/navigation";

/* CLIENT */
import prisma from "@/prisma/schema";

interface Props {
	params: { id: string };
}

const IssueDetailsPage = async ({ params }: Props) => {
	if (isNaN(+params.id)) notFound();

	const issue = await prisma.issue.findUnique({ where: { id: +params.id } });

	if (!issue) notFound();

	return (
		<div>
			<p>{issue.id}</p>
			<p>{issue.title}</p>
			<p>{issue.status}</p>
			<p>{issue.description}</p>
			<p>{issue.createdAt.toLocaleDateString()}</p>
		</div>
	);
};

export default IssueDetailsPage;
