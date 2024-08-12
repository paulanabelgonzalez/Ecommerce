import { useContext } from "react";

import { useParams } from "react-router-dom";

import { Button } from "@mui/material";

import { CartContext } from "../context/CartContext";
import { FirebaseContext } from "../context/FirebaseContext";

export const AddButton = () => {
	const { id } = useParams();
	const { products } = useContext(FirebaseContext);
	const { handleAdd } = useContext(CartContext);

	const product = products.find((product) => product.id === id);

	return <Button onClick={() => handleAdd(product)}>Añadir al carrito</Button>;
};
