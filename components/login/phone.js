"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./login.module.scss";

export default function Phone() {
	const screenshotRef = useRef(null);
	const [currentScreenshot, setCurrentScreenshot] = useState(1);

	const imgs = [
		{ src: "/login/screenshot1.png", id: 1 },
		{ src: "/login/screenshot2.png", id: 2 },
		{ src: "/login/screenshot3.png", id: 3 },
		{ src: "/login/screenshot4.png", id: 4 },
	];

	useEffect(() => {
		const interval = setInterval(() => {
			if (currentScreenshot == 4) {
				setCurrentScreenshot(1);
			}
			setCurrentScreenshot((prev) => prev + 1);
			console.log(currentScreenshot);
		}, 5000);

		return () => {
			clearInterval(interval);
		};
	}, [currentScreenshot]);
	return (
		<div className={styles["phone-container"]}>
			{imgs.map((img) => (
				<img
					key={img.id}
					ref={screenshotRef}
					className={
						styles["screenshot"] +
						" " +
						(currentScreenshot == img.id ? styles["visible"] : "")
					}
					src={img.src}
					alt=""
				/>
			))}
			<img className={styles["phones"]} src="/home-phones.png" alt="" />
		</div>
	);
}
