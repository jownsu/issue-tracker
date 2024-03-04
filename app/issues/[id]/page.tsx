/* NEXT */
import { notFound } from "next/navigation";

/* CLIENT */
import prisma from "@/prisma/schema";

/* PLUGINS */
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import Markdown from "react-markdown";

/* COMPONENTS */
import IssueStatusBadge from "@/app/components/IssueStatusBadge";

interface Props {
	params: { id: string };
}

const IssueDetailsPage = async ({ params }: Props) => {
	if (isNaN(+params.id)) notFound();

	const issue = await prisma.issue.findUnique({ where: { id: +params.id } });

	if (!issue) notFound();

	return (
		<div>
			<Heading>{issue.title}</Heading>
			<Flex gap={"3"} my={"2"}>
				<IssueStatusBadge status={issue.status} />
				<Text>{issue.createdAt.toDateString()}</Text>
			</Flex>
			<Card className="prose" mt={"5"}>
				<Markdown>{issue.description}</Markdown>
			</Card>
		</div>
	);
};

export default IssueDetailsPage;
