/* NEXT */
import type { Metadata } from "next";

/* PLUGINS */
import { Container, Theme } from "@radix-ui/themes";
import { Inter } from "next/font/google";

/* COMPONENTS */
import NavBar from "./NavBar";

/* STYLES */
import "@radix-ui/themes/styles.css";
import "./globals.css";
import "./theme-config.css";
import AuthProvider from "./auth/Provider";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter"
});

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={inter.variable}>
			<body>
				<AuthProvider>
					<Theme accentColor="violet">
						<NavBar />
						<Container>
							<main>{children}</main>
						</Container>
					</Theme>
				</AuthProvider>
			</body>
		</html>
	);
}
