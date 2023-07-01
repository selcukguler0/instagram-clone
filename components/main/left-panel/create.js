"use client";
import { useState, useRef } from "react";
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
	const fileInputRef = useRef(null);
	const [post, setPost] = useState(null);
	const [fileData, setFileData] = useState(null);

	const fileHandler = (e) => {};

	const handleUpload = async (e) => {
		e.preventDefault();

		const file = fileInputRef.current.files[0];
		console.log(file);
		const formData = new FormData();
		formData.append("file", file);
		formData.append("userId", 1); // TODO - get user id from request body
		formData.append("description", "test"); // TODO - get description from request body

		try {
			const res = await fetch("/api/create-post", {
				method: "POST",
				body: formData,
			});

			if (!res.ok) {
				console.error("something went wrong, check your console.");
				return;
			}

			const data = await res.json();

			setPost(data.fileUrl);
		} catch (error) {
			console.error("something went wrong, check your console.");
		}
		console.log(post);
	};

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
				</div>
				<div className={styles.body}>
					<Media />
					<span>Drag your photos here</span>
					<form onSubmit={handleUpload} className={styles.uploadForm}>
						<input
							ref={fileInputRef}
							onChange={fileHandler}
							className={styles.uploadBtn}
							type="file"
						/>
						<button type="submit" className={styles.share}>
							Share
						</button>
					</form>
				</div>
				<button onClick={() => setModalIsOpen(false)}>
					<Close className={styles.close} />
				</button>
			</Modal>
		</>
	);
}
