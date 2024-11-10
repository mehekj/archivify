import axios from "axios";
import dotenv from "dotenv";
import { Router } from "express";
import QueryString from "qs";

const api = Router();

const scopes = [
	"user-library-modify",
	"user-library-read",
	"playlist-read-private",
	"playlist-modify-private",
];

dotenv.config({ path: "../.env" });

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

const generateRandomString = (length) =>
	Math.random().toString(20).substring(2, length);

api.get("/login", (req, res) => {
	var state = generateRandomString(16);
	var scope = scopes.join(" ");

	const queryString = QueryString.stringify({
		response_type: "code",
		client_id: CLIENT_ID,
		scope: scope,
		redirect_uri: REDIRECT_URI,
		state: state,
		show_dialog: true,
	});

	res.redirect(
		"https://accounts.spotify.com/authorize?" + queryString.toString()
	);
});

api.get("/redirect", (req, res) => {
	if (req.query.error) {
		res.send(req.query.error);
	} else if (!req.query.state) {
		res.send("state mismatch");
	} else {
		const code = req.query.code;

		axios({
			method: "post",
			url: "https://accounts.spotify.com/api/token",
			data: QueryString.stringify({
				grant_type: "authorization_code",
				code: code,
				redirect_uri: REDIRECT_URI,
			}),
			headers: {
				"content-type": "application/x-www-form-urlencoded",
				Authorization: `Basic ${new Buffer.from(
					`${CLIENT_ID}:${CLIENT_SECRET}`
				).toString("base64")}`,
			},
		})
			.then((response) => {
				if (response.status === 200) {
					const { access_token, refresh_token, expires_in } = response.data;

					const queryParams = QueryString.stringify({
						access_token,
						refresh_token,
						expires_in,
					});

					res.redirect(`${process.env.CLIENT_URI}/?${queryParams}`);
				} else {
					res.send("invalid token");
				}
			})
			.catch((error) => {
				res.send(error);
			});
	}
});

export default api;
