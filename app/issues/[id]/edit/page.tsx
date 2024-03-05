/* NEXT */
import { notFound } from "next/navigation";

/* SCHEMA */
import prisma from "@/prisma/schema";

/* COMPONENT */
import IssueForm from "../../_components/IssueForm";

interface Props {
	params: { id: string };
}

const EditIssuePage = async ({ params }: Props) => {
	const issue = await prisma.issue.findUnique({ where: { id: +params.id } });

	if (!issue) notFound();

	return <IssueForm issue={issue} />;
};

export default EditIssuePage;
