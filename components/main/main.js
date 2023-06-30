"use client";

import { useEffect, useState } from "react";
import styles from "./main.module.scss";
import More from "../icons/more";
import Like from "../icons/like";
import Comment from "../icons/comment";
import Share from "../icons/share";
import Save from "../icons/save";
import RedLike from "../icons/red-like";
import Loading from "../Loading";

import axios from "axios";

export default function Main() {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		axios
			.get("/api/get-posts?userId=1") //TODO change userId
			.then((res) => {
				console.log("posts", res.data.posts);
				setPosts(res.data.posts);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	const likeHandler = (like, id) => {
		const newPosts = [...posts];
		const post = newPosts.find((post) => post.id === id);
		post.liked = !post.liked;
		if (post.liked) {
			post._count.likes++;
		}
		if (!post.liked) {
			post._count.likes--;
		}
		newPosts[posts.indexOf(post)] = post; //replace old post with new post
		console.log(newPosts);
		setPosts(newPosts);

		//save "like" to db
		axios
			.post("/api/like-post", {
				userId: 1, //TODO change userId
				postId: id,
			})
			.then((res) => {
				console.log(res.data);
			});
	};

	return (
		<div className={styles["container"]}>
			<div className={styles["top-bar"]}>
				<div className={styles["user"]}>
					<img src="/avatar.jpeg" alt="" />
					<span>Username</span>
				</div>
			</div>
			<div>
				{loading ? (
					<Loading />
				) : (
					posts.map((post) => (
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
										{post.liked ? (
											<button onClick={() => likeHandler(1, post.id)}>
												<RedLike />
											</button>
										) : (
											<button onClick={() => likeHandler(0, post.id)}>
												<Like />
											</button>
										)}
										<button disabled>
											<Comment />
										</button>
										<button disabled>
											<Share />
										</button>
									</div>
									<div className={styles["post-actions-right"]}>
										<button disabled> 
											<Save />
										</button>
									</div>
								</div>
								<div className={styles["post-actions-likes"]}>
									{post._count.likes} likes
								</div>
								<div className={styles["post-actions-description"]}>
									{post.description}
								</div>
							</div>
						</div>
					))
				)}
			</div>
		</div>
	);
}
