/* NEXT */
import Link from "next/link";

/* PLUGINS */
import { Button, Flex } from "@radix-ui/themes";
import IssueStatusFilter from "./IssueStatusFilter";

const IssueActions = () => {
	return (
		<Flex mb="5" justify="between">
			<IssueStatusFilter />
			<Button>
				<Link href="/issues/new">New Issue</Link>
			</Button>
		</Flex>
	);
};

export default IssueActions;
