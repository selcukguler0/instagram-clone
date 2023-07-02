import { withAuth } from "next-auth/middleware";
import { getCsrfToken } from "next-auth/react";

export default withAuth(
	// `withAuth` augments your `Request` with the user's token.
	function middleware(req) {
		console.log(req.nextauth.token);
	},
	{
		pages: {
			signIn: "/auth/signin",
		},
		callbacks: {
			authorized: ({ token }) => {
				if (token) {
					return true;
				}
				return false;
			},
		},
	}
);

export const config = { matcher: ["/"] };
