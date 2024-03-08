/* NEXT */
import { Metadata } from "next";

/* CLIENT */
import prisma from "@/prisma/schema";
import { Status } from "@prisma/client";

/* COMPONENTS */
import Pagination from "@/app/components/Pagination";
import IssueActions from "./IssueActions";
import IssueTable, { IssueQuery, columnNames } from "./IssueTable";
import { Flex } from "@radix-ui/themes";

interface Props {
	searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
	const statuses = Object.values(Status);
	const status = statuses.includes(searchParams.status)
		? searchParams.status
		: undefined;

	const orderBy = columnNames.includes(searchParams.orderBy)
		? { [searchParams.orderBy]: "asc" }
		: undefined;

	const page = parseInt(searchParams.page) || 1;
	const pageSize = 10;

	const issues = await prisma.issue.findMany({
		where: { status },
		orderBy,
		skip: (page - 1) * pageSize,
		take: pageSize
	});

	const issueCount = await prisma.issue.count({
		where: { status }
	});

	return (
		<Flex direction={"column"} gap={"3"}>
			<IssueActions />
			<IssueTable searchParams={searchParams} issues={issues} />
			<Pagination currentPage={page} pageSize={pageSize} itemCount={issueCount} />
		</Flex>
	);
};

export const metadata: Metadata = {
	title: "Issue Tracker - Issue List",
	description: "View all project issues"
};

export default IssuesPage;
