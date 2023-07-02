import React from "react";
import SignUp from "@/components/signup/signup-panel";
import Footer from "@/components/signup/footer";
import styles from "./signup.module.scss";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function LoginPage() {
	const session = await getServerSession(authOptions);
	if (session?.user) {
		return redirect("/");
	}
	return (
		<>
			<div className={styles.container}>
				<div className={styles.main}>
					<SignUp />
				</div>
				<Footer />
			</div>
		</>
	);
}
