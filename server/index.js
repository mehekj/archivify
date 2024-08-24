import express from "express";
import cors from "cors";
import { config } from "dotenv";
import router from "./routes.js";

// load env variables
config();

// setup express
const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use("/", router);

// start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
	console.log(`server listening on port ${PORT}`);
});
