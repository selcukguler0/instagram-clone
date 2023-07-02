"use client";

import { useState, useEffect, useCallback } from "react";
import { getSession, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import LeftPanel from "@/components/main/left-panel";
import Main from "@/components/main/main";
import RightPanel from "@/components/main/right-panel";
import Create from "@/components/main/left-panel/create";

import styles from "./page.module.scss";

// import useUser from "@/utils/hooks/useUser";
import getUser from "@/utils/getUser";

export default function Home() {
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [user, setUser] = useState(null);

	useEffect(() => {
		getSession().then((res) => {
			if (res?.user) {
				getUser(res.user.name).then((res) => {
					setUser(res);
				});
			}
		});
	}, []);

	if (!user) {
		return null;
	}

	return (
		<>
			<div className={styles.container}>
				<LeftPanel user={user} setModalIsOpen={setModalIsOpen} />
				<div className={styles.wrapper}>
					<Main user={user} />
					<RightPanel user={user} />
				</div>
			</div>
			<Create
				user={user}
				modalIsOpen={modalIsOpen}
				setModalIsOpen={setModalIsOpen}
			/>
		</>
	);
}
