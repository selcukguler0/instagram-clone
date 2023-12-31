import "./globals.css";
import { NextAuthProvider } from "./auth-provider";

export const metadata = {
	title: "Instagram",
	description: "Instagram Clone",
};

export default function RootLayout({ children }) {
	return (
		<NextAuthProvider>
			<html lang="en">
				<body>{children}</body>
			</html>
		</NextAuthProvider>
	);
}
