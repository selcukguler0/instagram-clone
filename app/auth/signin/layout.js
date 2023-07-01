import { NextAuthProvider } from "../../auth-provider";

export const metadata = {
	title: "Instagram",
	description: "Instagram Clone",
};

export default function LoginLayout({ children }) {
	return (
		<NextAuthProvider>
			<html lang="en">
				<body>{children}</body>
			</html>
		</NextAuthProvider>
	);
}
