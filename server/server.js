import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const PORT = process.env.port || 8080;
const app = express();

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

app.use(express.static(path.join(dirname, "../build")));

app.listen(PORT, () => {
	console.log("Listening on port", PORT);
});
