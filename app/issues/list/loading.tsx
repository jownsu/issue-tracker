/* PLUGINS */
import { Table } from "@radix-ui/themes";

/* COMPONENTS */
import IssueActions from "./IssueActions";
import { Skeleton } from "@/app/components";

const loading = () => {
	const issues = [1, 2, 3, 4, 5];

	return (
		<div>
			<IssueActions />
			<Table.Root variant="surface">
				<Table.Header>
					<Table.Row>
						<Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell className="hidden md:table-cell">
							Status
						</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell className="hidden md:table-cell">
							Created
						</Table.ColumnHeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{issues.map((issue) => (
						<Table.Row key={issue}>
							<Table.Cell>
								<Skeleton />
								<div className="block md:hidden mt-2">
									<Skeleton />
								</div>
							</Table.Cell>
							<Table.Cell className="hidden md:table-cell">
								<Skeleton width={"5rem"} />
							</Table.Cell>
							<Table.Cell className="hidden md:table-cell">
								<Skeleton />
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table.Root>
		</div>
	);
};

export default loading;
