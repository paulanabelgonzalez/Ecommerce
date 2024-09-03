import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.jsx";
import "./index.css";

import { BrowserRouter } from "react-router-dom";

import { CartProvider } from "./context/CartContext.jsx";
import { FirebaseProvider } from "./context/FirebaseContext.jsx";
import { FilterProvider } from "./context/FilterContext.jsx";

import { CssBaseline } from "@mui/material";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<CssBaseline>
			<BrowserRouter>
				<CartProvider>
					<FirebaseProvider>
						<FilterProvider>
							<App />
						</FilterProvider>
					</FirebaseProvider>
				</CartProvider>
			</BrowserRouter>
		</CssBaseline>
	</React.StrictMode>
);
