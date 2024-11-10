import { useEffect } from "react";
import "./App.css";

function App() {
	const server =
		process.env.NODE_ENV === "development" ? "http://localhost:8080" : "";

	return (
		<div className="App">
			<header>archivify</header>
			<a href={`${server}/api/login/`}>login</a>
		</div>
	);
}

export default App;
