import { useEffect } from "react";
import "./App.css";
import { Link } from "react-router-dom";

function App() {
	const server =
		process.env.NODE_ENV === "development" ? "http://localhost:8080" : "";

	// useEffect(() => {
	// fetch("/api/login").then((res) =>
	// 	res.text().then((text) => console.log(text))
	// );
	// }, []);

	return (
		<div className="App">
			<header>archivify</header>
			<Link to={`${server}/api/login`}>login</Link>
		</div>
	);
}

export default App;
