import axios from "axios";

export default async function getUser(username) {
	if (!username) {
		return false;
	}
	try {
		const res = await axios.post("/api/get-user", {
			username: username,
		});
		console.log(res);
		if (res.data.status) {
			console.log(res.data.user);
			return res.data.user;
		}
		return res.data.status;
	} catch (err) {
		return err;
	}
}
