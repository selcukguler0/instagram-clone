"use client";

import { useEffect, useState } from "react";
import styles from "./main.module.scss";
import More from "../icons/more";
import Like from "../icons/like";
import Comment from "../icons/comment";
import Share from "../icons/share";
import Save from "../icons/save";
import Loading from "../Loading";

import axios from "axios";

export default function Main() {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		axios
			.get("/api/get-posts")
			.then((res) => {
				console.log(res.data);
				setPosts(res.data);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	return (
		<div className={styles["container"]}>
			<div className={styles["top-bar"]}>
				<div className={styles["user"]}>
					<img src="/avatar.jpeg" alt="" />
					<span>Username</span>
				</div>
			</div>
			<div>
				{loading && <Loading />}
				{posts.map((post) => (
					<div key={post.id} className={styles["post"]}>
						<div className={styles["post-header"]}>
							<div className={styles["post-user"]}>
								<img
									className={styles["post-avatar"]}
									src="/avatar.jpeg"
									alt=""
								/>
								<span>{post.author}</span>
							</div>
							<More />
						</div>
						<div className={styles["post-body"]}>
							<img src={`/posts/${post.content}`} alt="" />
						</div>
						<div className={styles["post-footer"]}>
							<div className={styles["post-actions"]}>
								<div className={styles["post-actions-left"]}>
									<Like />
									<Comment />
									<Share />
								</div>
								<div className={styles["post-actions-right"]}>
									<Save />
								</div>
							</div>
							<div className={styles["post-actions-likes"]}>
								{post.likes} likes
							</div>
							<div className={styles["post-actions-description"]}>
								{post.description}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
