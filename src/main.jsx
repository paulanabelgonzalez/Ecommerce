import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { FirebaseProvider } from "./context/FirebaseContext.jsx";

import { CartProvider } from "./context/CartContext.jsx";

import { CssBaseline } from "@mui/material";

import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<CssBaseline>
			<BrowserRouter>
				<CartProvider>
					<FirebaseProvider>
						<App />
					</FirebaseProvider>
				</CartProvider>
			</BrowserRouter>
		</CssBaseline>
	</React.StrictMode>
);
