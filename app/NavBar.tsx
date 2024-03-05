"use client";

/* NEXT */
import Link from "next/link";
import { usePathname } from "next/navigation";

/* PLUGINS */
import classNames from "classnames";
import { AiFillBug } from "react-icons/ai";
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";

/* COMPONENTS */
import { Skeleton } from "@/app/components";

const NavBar = () => {
	return (
		<nav className="border-b mb-5 px-5 py-3">
			<Container>
				<Flex align={"center"} gap={"3"}>
					<Link href={"/"}>
						<AiFillBug />
					</Link>
					<NavLinks />
					<AuthStatus />
				</Flex>
			</Container>
		</nav>
	);
};

const NavLinks = () => {
	const pathname = usePathname();

	const links = [
		{
			label: "Dashboard",
			href: "/"
		},
		{
			label: "Issues",
			href: "/issues/list"
		}
	];

	return (
		<ul className="flex space-x-6 mr-auto">
			{links.map((link) => (
				<li key={link.href}>
					<Link
						href={link.href}
						className={classNames({
							"nav-link": true,
							"!text-zinc-900": pathname === link.href
						})}
					>
						{link.label}
					</Link>
				</li>
			))}
		</ul>
	);
};

const AuthStatus = () => {
	const { data: session, status } = useSession();

	if (status === "loading") return <Skeleton width={"3rem"} />;

	if (status === "unauthenticated")
		return (
			<Link className="nav-link" href={"/api/auth/signin"}>
				Log in
			</Link>
		);

	return (
		<Box>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<Avatar
						src={session?.user?.image!}
						fallback="?"
						size="2"
						radius="full"
						className="cursor-pointer"
						referrerPolicy="no-referrer"
					/>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<DropdownMenu.Label>
						<Text size={"2"}>{session?.user?.email}</Text>
					</DropdownMenu.Label>
					<DropdownMenu.Item>
						<Link href={"/api/auth/signout"}>Log out</Link>
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</Box>
	);
};

export default NavBar;
