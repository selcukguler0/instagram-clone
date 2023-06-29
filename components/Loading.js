import React from "react";
import Lottie from "lottie-react";
import Spinner from "@/public/spinner.json";

export default function Loading() {
	return <Lottie style={{width:100}} animationData={Spinner} loop={true} />;
}
