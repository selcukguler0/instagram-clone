"use client";
import { useState, useRef } from "react";
import Modal from "react-modal";

import Share from "@/components/icons/share";
import Close from "@/components/icons/close";
import Media from "@/components/icons/media";
import Loading from "@/components/Loading";
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

export default function Create({ modalIsOpen, setModalIsOpen, user }) {
	const fileInputRef = useRef(null);
	const [postDescription, setPostDescription] = useState("");
	const [post, setPost] = useState(null);
	const [fileData, setFileData] = useState(null);
	const [laoding, setLoading] = useState(false);

	const fileHandler = (e) => {
		// TODO - validate file
		// TODO - display preview
	};

	const handleUpload = async (e) => {
		e.preventDefault();
		setLoading(true);

		const file = fileInputRef.current.files[0];
		console.log(file);
		const formData = new FormData();
		formData.append("file", file);
		formData.append("userId", user.id);
		formData.append("description", postDescription);

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
			setLoading(false);
			setModalIsOpen(false);
		} catch (error) {
			console.error("something went wrong, check your console.");
		}finally{
			window.location.reload(); // TODO - add live post update
		}
	};

	return (
		<>
			<Modal style={customStyles} isOpen={modalIsOpen}>
				<span className={styles.headerText}>Create new post</span>

				{laoding ? (
					<Loading />
				) : (
					<>
						<div className={styles.descriptionContainer}>
							<textarea
								value={postDescription}
								onChange={(e) => setPostDescription(e.target.value)}
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
					</>
				)}
				<button onClick={() => setModalIsOpen(false)}>
					<Close className={styles.close} />
				</button>
			</Modal>
		</>
	);
}
