import { useContext } from "react";
import { Routes, Route } from "react-router-dom";

import { FirebaseContext } from "../context/FirebaseContext";

import { CardsContainer } from "../components/CardsContainer";
import { CheckOut } from "../pages/CheckOut";
import { Detail } from "../pages/Detail";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Modal } from "../pages/Modal";
import { NotFound } from "../pages/404";
import { OrderHistory } from "../pages/OrderHistory";
import { Register } from "../pages/Register";

export const Main = () => {
	const { user } = useContext(FirebaseContext);
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/Productos" element={<CardsContainer />} />
				<Route path="login" element={<Login />} />
				<Route path="register" element={<Register />} />
				<Route path="detail/:id" element={<Detail />} />
				<Route path="*" element={<NotFound />} />
				<Route path="CheckOut" element={user && <CheckOut />} />
				<Route path="modal" element={<Modal />} />
				<Route path="OrderHistory" element={<OrderHistory />} />
			</Routes>
		</>
	);
};
