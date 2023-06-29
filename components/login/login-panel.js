import React from "react";
import Logo from "../instagram-logo";
import Link from "next/link";

import styles from "./login.module.scss";

export default function Login() {
	return (
		<div className={styles.container}>
			<div className={styles["login-container"]}>
				<Logo width={200} height={50} />
				<form>
					<input type="text" placeholder="Phone number, username, or email" />
					<input type="password" placeholder="Password" />
					<button type="submit">Log In</button>
				</form>
				<a href="">Forgot password?</a>
			</div>

			<div className={styles["signup-container"]}>
				<span>{"Don't have an account?"}</span>{" "}
				<Link className={styles["a-tag"]} href="/signup">
					Sign up
				</Link>
			</div>

			<div className={styles["apps"]}>
				<span>Get the app.</span>
				<div className={styles["app-links"]}>
					<a href="">
						<img src="/appstore.png" alt="Download on the App Store" />
					</a>
					<a href="">
						<img src="/googleplay.png" alt="Get it on Google Play" />
					</a>
				</div>
			</div>
		</div>
	);
}
