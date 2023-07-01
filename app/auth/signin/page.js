import React from 'react'
import Phone from '@/components/login/phone'
import Login from '@/components/login/login-panel'
import Footer from '@/components/login/footer'
import styles from "./login.module.scss"

export default function LoginPage() {
	return (
		<>
			<div className={styles.container}>
				<div className={styles.main}>
					<Phone />
					<Login />
				</div>
				<Footer />
			</div>
		</>
	);
}
