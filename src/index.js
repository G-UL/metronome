// React
import React from "react";
import ReactDOM from "react-dom";

// Apps
import App from "./App";
import * as serviceWorker from "./serviceWorker";


ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
);

serviceWorker.unregister();
