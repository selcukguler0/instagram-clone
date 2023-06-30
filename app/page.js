"use client"

import { useState } from "react";

import LeftPanel from "@/components/main/left-panel";
import Main from "@/components/main/main";
import RightPanel from "@/components/main/right-panel";
import Create from "@/components/main/left-panel/create";

import styles from "./page.module.scss";

export default function Home() {
	const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
		<>
			<div className={styles.container}>
				<LeftPanel setModalIsOpen={setModalIsOpen} />
				<div className={styles.wrapper}>
					<Main />
					<RightPanel />
				</div>
			</div>
			<Create modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
		</>
	);
}
