/* NEXT */
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";

/* SCHEMA */
import prisma from "@/prisma/schema";

/* COMPONENTS */
import IssueFormSkeleton from "../../_components/IssueFormSkeleton";
import { cache } from "react";

/* COMPONENT */

const IssueForm = dynamic(() => import("../../_components/IssueForm"), {
	ssr: false,
	loading: () => <IssueFormSkeleton />
});

interface Props {
	params: { id: string };
}

const fetchIssue = cache((issueId: number) =>
	prisma.issue.findUnique({ where: { id: issueId } })
);

const EditIssuePage = async ({ params }: Props) => {
	const issue = await fetchIssue(+params.id);

	if (!issue) notFound();

	return <IssueForm issue={issue} />;
};

export default EditIssuePage;

export async function generateMetadata({ params }: Props) {
	const issue = await fetchIssue(+params.id);

	return {
		title: `Edit ${issue?.title}`,
		description: `Editing issue ${issue?.id}`
	};
}
