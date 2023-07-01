import React from 'react'
import SignUp from '@/components/signup/signup-panel';
import Footer from '@/components/signup/footer';
import styles from "./signup.module.scss"

export default function LoginPage() {
	return (
		<>
			<div className={styles.container}>
				<div className={styles.main}>
					<SignUp />
				</div>
				<Footer />
			</div>
		</>
	);
}
