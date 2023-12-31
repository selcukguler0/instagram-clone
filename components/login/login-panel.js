"use client";

import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Logo from "../instagram-logo";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import Loading from "../Loading";

import styles from "./login.module.scss";

export default function Login() {
	const router = useRouter();

	const { data: session, status, update } = useSession();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const loginHandler = async (e) => {
		e.preventDefault();
		setError("");
		setLoading(true);
		try {
			const res = await signIn("credentials", {
				username,
				password,
				callbackUrl: "http://localhost:3000", // redirect to home page after login
				// redirect: false,
			});
			console.log(res);
			console.log(session);
			if (res?.error) {
				setError(res.error);
				setLoading(false);
				return;
			}
		} catch (err) {
			console.log(err);
			setError(err.response?.data.error);
			setLoading(false);
		}
	};
	return (
		<div className={styles.container}>
			<div className={styles["login-container"]}>
				{loading ? (
					<Loading />
				) : (
					<>
						<Logo width={200} height={50} />
						<form onSubmit={loginHandler}>
							<input
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								type="text"
								placeholder="Phone number, username, or email"
							/>
							<input
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								type="password"
								placeholder="Password"
							/>
							<span className={styles.error} style={{ color: "red" }}>{error ? error : ""}</span>
							<button type="submit">Log In</button>
						</form>
						<a href="">Forgot password?</a>
					</>
				)}
			</div>

			<div className={styles["signup-container"]}>
				<span>{"Don't have an account?"}</span>{" "}
				<Link className={styles["a-tag"]} href="/auth/signup">
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
