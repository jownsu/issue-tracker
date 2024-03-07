/* PLUGINS */
import { Table } from "@radix-ui/themes";
import NextLink from "next/link";

/* CLIENT */
import { Issue, Status } from "@prisma/client";

/* COMPONENTS */
import { IssueStatusBadge } from "@/app/components";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import Link from "../../components/Link";

export interface IssueQuery {
	status: Status;
	orderBy: keyof Issue;
	page: string;
}

interface Props {
	searchParams: IssueQuery;
	issues: Issue[];
}

const IssueTable = ({ searchParams, issues }: Props) => {
	return (
		<Table.Root variant="surface">
			<Table.Header>
				<Table.Row>
					{columns.map((column) => (
						<Table.ColumnHeaderCell
							className={column?.className && ""}
							key={column.value}
						>
							<NextLink
								href={{
									query: {
										...searchParams,
										orderBy: column.value
									}
								}}
							>
								{column.label}
							</NextLink>
							{column.value === searchParams.orderBy && (
								<ArrowUpIcon className="inline" />
							)}
						</Table.ColumnHeaderCell>
					))}
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{issues.map((issue) => (
					<Table.Row key={issue.id}>
						<Table.Cell>
							<Link href={`/issues/${issue.id}`}>{issue.title}</Link>
							<div className="block md:hidden">
								<IssueStatusBadge status={issue.status} />
							</div>
						</Table.Cell>
						<Table.Cell className="hidden md:table-cell">
							<IssueStatusBadge status={issue.status} />
						</Table.Cell>
						<Table.Cell className="hidden md:table-cell">
							{issue.createdAt.toDateString()}
						</Table.Cell>
					</Table.Row>
				))}
			</Table.Body>
		</Table.Root>
	);
};

const columns: {
	label: String;
	value: keyof Issue;
	className?: String;
}[] = [
	{
		label: "Issue",
		value: "title"
	},
	{
		label: "Status",
		value: "status",
		className: "hidden md:table-cell"
	},
	{
		label: "Created",
		value: "createdAt",
		className: "hidden md:table-cell"
	}
];

export const columnNames = columns.map((column) => column.value);

export default IssueTable;
