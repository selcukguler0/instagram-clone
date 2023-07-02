"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import Loading from "../Loading";

import Logo from "../instagram-logo";
import styles from "./signup.module.scss";

export default function SignUp() {
	const router = useRouter();

	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [fullName, setFullName] = useState("");
	const [password, setPassword] = useState("");

	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const signUpHandler = async (e) => {
		e.preventDefault();
		setError("");
		setLoading(true);
		try {
			const req = await axios.post("/api/signup", {
				fullName,
				email,
				username,
				password,
			});
			console.log(req);
			if (req.data.status) {
				router.push("/login");
			}
		} catch (err) {
			const er = err.response.data.error;
			console.log(er);
			setError(err.response.data.error);
			setLoading(false);
		}
	};
	return (
		<div className={styles["container"]}>
			<div className={styles["signup-container"]}>
				{loading ? (
					<Loading />
				) : (
					<>
						<Logo width={200} height={50} />
						<form onSubmit={signUpHandler}>
							<input
								value={fullName}
								onChange={(e) => setFullName(e.target.value)}
								type="text"
								placeholder="Full Name"
							/>
							<input
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								type="text"
								placeholder="Email"
							/>
							<input
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								type="text"
								placeholder="Username"
							/>
							<input
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								type="password"
								placeholder="Password"
							/>
							<span>
								People who use our service may have uploaded your contact
								information to Instagram.
							</span>
							<span>By signing up, you agree to our Terms.</span>
							<span>
								{error ? <pre style={{ color: "red" }}>{error}</pre> : ""}
							</span>
							<button type="submit">Sign Up</button>
						</form>
					</>
				)}
			</div>

			<div className={styles["login-container"]}>
				<span>{"Have an account?"}</span>{" "}
				<Link className={styles["a-tag"]} href="/auth/signin">
					Login
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
