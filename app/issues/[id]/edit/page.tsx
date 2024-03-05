/* NEXT */
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";

/* SCHEMA */
import prisma from "@/prisma/schema";

/* COMPONENTS */
import IssueFormSkeleton from "../../_components/IssueFormSkeleton";

/* COMPONENT */

const IssueForm = dynamic(() => import("../../_components/IssueForm"), {
	ssr: false,
	loading: () => <IssueFormSkeleton />
});

interface Props {
	params: { id: string };
}

const EditIssuePage = async ({ params }: Props) => {
	const issue = await prisma.issue.findUnique({ where: { id: +params.id } });

	if (!issue) notFound();

	return <IssueForm issue={issue} />;
};

export default EditIssuePage;
