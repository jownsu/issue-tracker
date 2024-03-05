/* NEXT */
import { notFound } from "next/navigation";

/* CLIENT */
import prisma from "@/prisma/schema";

/* PLUGINS */
import { Box, Grid } from "@radix-ui/themes";

/* COMPONENTS */
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";

interface Props {
	params: { id: string };
}

const IssueDetailsPage = async ({ params }: Props) => {
	if (isNaN(+params.id)) notFound();

	const issue = await prisma.issue.findUnique({ where: { id: +params.id } });

	if (!issue) notFound();

	return (
		<Grid columns={{ initial: "1", md: "2" }} gap={"5"}>
			<Box>
				<IssueDetails issue={issue} />
			</Box>
			<Box>
				<EditIssueButton issueId={issue.id} />
			</Box>
		</Grid>
	);
};

export default IssueDetailsPage;
