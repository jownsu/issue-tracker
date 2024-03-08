/* NEXT */
import { notFound } from "next/navigation";
import { cache } from "react";

/* CLIENT */
import prisma from "@/prisma/schema";

/* PLUGINS */
import { Box, Flex, Grid } from "@radix-ui/themes";

/* COMPONENTS */
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import AssigneeSelect from "./AssigneeSelect";

interface Props {
	params: { id: string };
}

const fetchIssue = cache((issueId: number) =>
	prisma.issue.findUnique({ where: { id: issueId } })
);

const IssueDetailsPage = async ({ params }: Props) => {
	if (isNaN(+params.id)) notFound();

	const session = await getServerSession();
	const issue = await fetchIssue(+params.id);

	if (!issue) notFound();

	return (
		<Grid columns={{ initial: "1", sm: "5" }} gap={"5"}>
			<Box className="md:col-span-4">
				<IssueDetails issue={issue} />
			</Box>
			<Box>
				{session && (
					<Flex direction={"column"} gap={"4"}>
						<AssigneeSelect issue={issue} />
						<EditIssueButton issueId={issue.id} />
						<DeleteIssueButton issueId={issue.id} />
					</Flex>
				)}
			</Box>
		</Grid>
	);
};

export default IssueDetailsPage;

export async function generateMetadata({ params }: Props) {
	const issue = await fetchIssue(+params.id);

	return {
		title: issue?.title,
		description: `Details of issue ${issue?.id}`
	};
}
