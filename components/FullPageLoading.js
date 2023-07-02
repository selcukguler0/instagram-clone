import React from "react";
import Lottie from "lottie-react";
import Spinner from "@/public/spinner.json";

export default function FullPageLoading({ width = 100 }) {
	return (
		<div
			style={{
				width: "100vw",
				height: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}>
			<Lottie style={{ width: width }} animationData={Spinner} loop={true} />
		</div>
	);
}
