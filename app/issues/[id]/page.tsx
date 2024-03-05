/* NEXT */
import { notFound } from "next/navigation";
import Link from "next/link";

/* CLIENT */
import prisma from "@/prisma/schema";

/* PLUGINS */
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Markdown from "react-markdown";
import { Pencil2Icon } from "@radix-ui/react-icons";

/* COMPONENTS */
import { IssueStatusBadge } from "@/app/components";

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
				<Heading>{issue.title}</Heading>
				<Flex gap={"3"} my={"2"}>
					<IssueStatusBadge status={issue.status} />
					<Text>{issue.createdAt.toDateString()}</Text>
				</Flex>
				<Card className="prose" mt={"5"}>
					<Markdown>{issue.description}</Markdown>
				</Card>
			</Box>
			<Box>
				<Button>
					<Pencil2Icon />
					<Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
				</Button>
			</Box>
		</Grid>
	);
};

export default IssueDetailsPage;
