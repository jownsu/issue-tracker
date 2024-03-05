/* NEXT */
import Link from "next/link";

/* PLUGINS */
import { Button } from "@radix-ui/themes";

const IssueActions = () => {
	return (
		<div className="mb-5">
			<Button>
				<Link href="/issues/new">New Issue</Link>
			</Button>
		</div>
	);
};

export default IssueActions;
