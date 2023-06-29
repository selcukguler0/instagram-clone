import React from 'react'
import styles from "./login.module.scss";

export default function Footer() {
	let year = new Date().getFullYear();
	return <span className={styles.footer}>© {year} Instagram from Selçuk Güler</span>;
}
