/* NEXT */
import Link from "next/link";

/* PLUGINS */
import { Button } from "@radix-ui/themes";

const IssuesPage = () => {
	return (
		<div>
			<Button>
				<Link href="/issues/new">New Issue</Link>
			</Button>
		</div>
	);
};

export default IssuesPage;
