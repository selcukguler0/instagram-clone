import styles from "./main.module.scss";

export default function RightPanel({ user }) {
	console.log(user);
	return (
		<div className={styles["right-panel"]}>
			<div className={styles["header"]}>
				<div className={styles["user"]}>
					<img src={user.profilePic} alt="" />
					<div className={styles["user-info"]}>
						<span className={styles["username"]}>{user.username}</span>
						<span className={styles["fullname"]}>{user.fullname}</span>
					</div>
				</div>
				<a href="">Switch</a>
			</div>
			<div className={styles["suggestions"]}>
				<div className={styles["suggestions-header"]}>
					<span>Suggestions For You</span>
					<a href="">See All</a>
				</div>
				<div className={styles["suggestions-body"]}>
					<div className={styles["suggestion"]}>
						<div className={styles["user"]}>
							<img src="/avatar.jpeg" alt="" />
							<div className={styles["user-info"]}>
								<span className={styles["username"]}>username</span>
								<span className={styles["fullname"]}>fullname</span>
							</div>
						</div>
						<a href="">Follow</a>
					</div>
				</div>
			</div>
		</div>
	);
}
