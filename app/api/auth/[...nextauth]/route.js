import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { SignIn } from "@/utils/auth/signin";

export const authOptions = {
	session: {
		strategy: "jwt",
	},
	pages: {
		signIn: "/auth/signin",
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
