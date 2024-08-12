import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { CardsContainer } from "../components/CardsContainer";
import { CheckOut } from "../pages/CheckOut";
import { Detail } from "../pages/Detail";
import { Login } from "../pages/Login";
import { NotFound } from "../pages/404";
import { Register } from "../pages/Register";
import { FirebaseContext } from "../context/FirebaseContext";

export const Main = () => {
	const { user } = useContext(FirebaseContext);
	return (
		<Routes>
			<Route path="/" element={<CardsContainer />} />
			<Route path="login" element={<Login />} />
			<Route path="register" element={<Register />} />
			<Route path="detail/:id" element={<Detail />} />
			<Route path="*" element={<NotFound />} />
			<Route
				path="CheckOut"
				element={user ? <CheckOut /> : <Navigate to="/Login" />}
			/>
		</Routes>
	);
};
