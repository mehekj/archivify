import { useEffect } from "react";
import "./App.css";

function App() {
	useEffect(() => {
		fetch("/api/bye").then((response) =>
			response.text().then((text) => console.log(text))
		);
	}, []);

	return (
		<div className="App">
			<header className="App-header">
				<h1>HI</h1>
				<h2>HI2</h2>
			</header>
		</div>
	);
}

export default App;
