/* NEXT */
import Link from "next/link";

/* PLUGINS */
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";

const EditIssueButton = ({ issueId }: { issueId: number }) => {
	return (
		<Button>
			<Pencil2Icon />
			<Link href={`/issues/edit/${issueId}`}>Edit Issue</Link>
		</Button>
	);
};

export default EditIssueButton;
