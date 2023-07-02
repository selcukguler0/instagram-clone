import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { SignIn } from "@/utils/auth/signin";

export const authOptions = {
	session: {
		strategy: "jwt",
	},
	pages: {
    signIn: '/auth/signin',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
	providers: [
		CredentialsProvider({
			id: "credentials",
			type: "credentials",
			credentials: {},
			async authorize(credentials) {
				const data = await SignIn(credentials);

				// If no error and we have user data, return it
				if (data.status && data.user) {
					console.log(data.user);
					console.log(data.user.id);
					return {
						id: data.user.id,
						name: data.user.username,
						email: data.user.email,
						image: data.user.profilePic,
					};
				}
				// Return null if user data could not be retrieved
				return null;
			},
		}),
	],
	callbacks: {
		async jwt(params) {
			// params.token.id = params.user.id;
			return params.token;
		},
		async session({ session, token }) {
			console.log(session);
			console.log(token);
			return session;
		},
	},
};

const authHandler = NextAuth(authOptions);

export { authHandler as GET, authHandler as POST };
