/* NEXT */
import dynamic from "next/dynamic";

/* COMPONENTS */
import IssueFormSkeleton from "../_components/IssueFormSkeleton";
import { Metadata } from "next";
const IssueForm = dynamic(() => import("../_components/IssueForm"), {
	ssr: false,
	loading: () => <IssueFormSkeleton />
});

const NewIssuePage = () => {
	return <IssueForm />;
};

export default NewIssuePage;

export const metadata: Metadata = {
	title: "Issue Tracker - New Issue",
	description: "Create a new issue"
};
