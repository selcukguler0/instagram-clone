import React from "react";
import Link from "next/link";

import Logo from "../instagram-logo";
import "./signup.scss";

export default function SignUp() {
	return (
		<div className="container">
			<div className="s-signup-container">
				<Logo width={200} height={50} />
				<form>
					<input type="text" placeholder="Phone number or email" />
					<input type="text" placeholder="Full Name" />
					<input type="text" placeholder="Username" />
					<input type="password" placeholder="Password" />
					<span>
						People who use our service may have uploaded your contact
						information to Instagram.
					</span>
					<span>By signing up, you agree to our Terms.</span>
					<button type="submit">Sign Up</button>
				</form>
			</div>

			<div className="s-login-container">
				<span>{"Have an account?"}</span> <Link className="a-tag" href="/login">Login</Link>
			</div>

			<div className="apps">
				<span>Get the app.</span>
				<div className="app-links">
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
