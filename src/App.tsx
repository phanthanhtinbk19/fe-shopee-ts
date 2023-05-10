import {useState} from "react";
import reactLogo from "./assets/react.svg";

import "./App.css";
import {useRouterElements} from "./hooks/useRouterElements";

function App() {
	const routerElements = useRouterElements();

	return <div className="App">{routerElements}</div>;
}

export default App;
