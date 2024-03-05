/* NEXT */
import { notFound } from "next/navigation";

/* CLIENT */
import prisma from "@/prisma/schema";

/* PLUGINS */
import { Box, Flex, Grid } from "@radix-ui/themes";

/* COMPONENTS */
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";

interface Props {
	params: { id: string };
}

const IssueDetailsPage = async ({ params }: Props) => {
	if (isNaN(+params.id)) notFound();

	const issue = await prisma.issue.findUnique({ where: { id: +params.id } });

	if (!issue) notFound();

	return (
		<Grid columns={{ initial: "1", sm: "5" }} gap={"5"}>
			<Box className="md:col-span-4">
				<IssueDetails issue={issue} />
			</Box>
			<Box>
				<Flex direction={"column"} gap={"4"}>
					<EditIssueButton issueId={issue.id} />
					<DeleteIssueButton issueId={issue.id} />
				</Flex>
			</Box>
		</Grid>
	);
};

export default IssueDetailsPage;
