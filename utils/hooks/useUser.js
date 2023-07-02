"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default async function useUser(username, session) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const getUser = async () => {
		try {
			const res = await axios.post("/api/get-user", {
				username: username,
			});
			console.log(res);
			if (res.status === 200) {
				console.log(res.data);
				setUser(res.data.user);
				setLoading(false);
			}
		} catch (err) {
			setError(err);
		}
	};
	useEffect(() => {
		getUser();
	}, [session]);

	return { user, loading, error };
}
