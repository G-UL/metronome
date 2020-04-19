// React
import React,
	   {Component} from "react";

// Package
import "bootstrap/dist/css/bootstrap.min.css";

// App
import Metronome from "./Metronome.js";
import Header from "./Header.js";
import "./App.css";


class App extends Component
{
	render()
	{
		return (
			<div className="App">
				<Header />

				<Metronome />
			</div>
		);
	}
}

export default App;
