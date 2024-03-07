/* NEXT */
import Link from "next/link";

/* CLIENT */
import prisma from "@/prisma/client";

/* PLUGINS */
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import { IssueStatusBadge } from "./components";

const LatestIssues = async () => {
	const issues = await prisma.issue.findMany({
		orderBy: { createdAt: "desc" },
		take: 5,
		include: {
			user: true
		}
	});

	return (
		<Card>
			<Heading size="4" mb="5">
				Latest Issues
			</Heading>
			<Table.Root>
				<Table.Body>
					{issues.map((issue) => (
						<Table.Row key={issue.id}>
							<Table.Cell>
								<Flex justify="between">
									<Flex direction="column" align="start" gap="2">
										<Link href={`/issues/${issue.id}`}>
											{issue.title}
										</Link>
										<IssueStatusBadge status={issue.status} />
									</Flex>
									{issue.user && (
										<Avatar
											src={issue.user?.image!}
											fallback="?"
											radius="full"
											size="2"
										/>
									)}
								</Flex>
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table.Root>
		</Card>
	);
};

export default LatestIssues;
