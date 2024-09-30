import dotenv from "dotenv";
import { Router } from "express";

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

	const queryString = new URLSearchParams({
		response_type: "code",
		client_id: CLIENT_ID,
		scope: scope,
		redirect_uri: REDIRECT_URI,
		state: state,
		show_dialog: true,
	});

	console.log(
		"https://accounts.spotify.com/authorize?" + queryString.toString()
	);
	res.redirect(
		"https://accounts.spotify.com/authorize?" + queryString.toString()
	);
});

api.get("/redirect", (req, res) => {
	console.log("REDIRECT");
	res.sendStatus(200);
});

export default api;
