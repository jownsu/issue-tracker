import Pagination from "./components/Pagination";

export default function Home({ searchParams }: { searchParams: { page: string } }) {
	return <Pagination currentPage={+searchParams.page} itemCount={100} pageSize={5} />;
}
