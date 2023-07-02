import React from "react";
import Lottie from "lottie-react";
import Spinner from "@/public/spinner.json";

export default function Loading({ width = 100 }) {
	return (
		<Lottie style={{ width: width }} animationData={Spinner} loop={true} />
	);
}
