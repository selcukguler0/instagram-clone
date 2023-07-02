import React from "react";
import Phone from "@/components/login/phone";
import Login from "@/components/login/login-panel";
import Footer from "@/components/login/footer";
import styles from "./login.module.scss";

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
					<Phone />
					<Login />
				</div>
				<Footer />
			</div>
		</>
	);
}
