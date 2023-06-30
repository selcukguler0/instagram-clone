"use client";
import { useState } from "react";
import Modal from "react-modal";

import Share from "@/components/icons/share";
import Close from "@/components/icons/close";
import Media from "@/components/icons/media";
import styles from "./create.module.scss";

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		transform: "translate(-50%, -50%)",
		minWidth: "400px",
		display: "flex",
		alignItems: "center",
		flexDirection: "column",
		padding: "0",
		borderRadius: "10px",
	},
};

export default function Create({ modalIsOpen, setModalIsOpen }) {
	return (
		<>
			<Modal style={customStyles} isOpen={modalIsOpen}>
				<span className={styles.headerText}>Create new post</span>
				<div className={styles.descriptionContainer}>
					<textarea
						className={styles.description}
						placeholder="Description"
						resize="none"
						cols="2"
						rows="2"
						maxLength={100}></textarea>
					<span className={styles.share}>Share</span>
				</div>
				<div className={styles.body}>
					<Media />
					<span>Drag your photos here</span>
					<button>Select from computer</button>
				</div>
				<button onClick={() => setModalIsOpen(false)}>
					<Close className={styles.close} />
				</button>
			</Modal>
		</>
	);
}
