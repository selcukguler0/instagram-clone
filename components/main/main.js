import React from "react";
import styles from "./main.module.scss";
import More from "../icons/more";
import Like from "../icons/like";
import Comment from "../icons/comment";
import Share from "../icons/share";
import Save from "../icons/save";

export default function Main() {
	return (
		<div className={styles["container"]}>
			<div className={styles["top-bar"]}>
				<div className={styles["user"]}>
					<img src="/avatar.jpeg" alt="" />
					<span>Username</span>
				</div>
			</div>
			<div>
				<div className={styles["post"]}>
					<div className={styles["post-header"]}>
						<div className={styles["post-user"]}>
							<img
								className={styles["post-avatar"]}
								src="/avatar.jpeg"
								alt=""
							/>
							<span>Username</span>
						</div>
						<More />
					</div>
					<div className={styles["post-body"]}>
						<img src="/example-post1.jpg" alt="" />
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
							3,000 likes
						</div>
						<div className={styles["post-actions-description"]}>
							My awesome description
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
