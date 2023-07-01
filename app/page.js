"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

import LeftPanel from "@/components/main/left-panel";
import Main from "@/components/main/main";
import RightPanel from "@/components/main/right-panel";
import Create from "@/components/main/left-panel/create";

import styles from "./page.module.scss";
import { redirect } from "next/navigation";

export default function Home() {
	const [modalIsOpen, setModalIsOpen] = useState(false);

	const { data: session, status } = useSession();
	console.log(session);
	console.log(status);
	
	if (status === "loading") {
		return null;
	}
	if (status !== "authenticated") {
		return redirect("/auth/signin");
	}
	return (
		<>
			<div className={styles.container}>
				<LeftPanel userData={session.user} setModalIsOpen={setModalIsOpen} />
				<div className={styles.wrapper}>
					<Main userData={session.user} />
					<RightPanel userData={session.user} />
				</div>
			</div>
			<Create
				userData={session.user}
				modalIsOpen={modalIsOpen}
				setModalIsOpen={setModalIsOpen}
			/>
		</>
	);
}
