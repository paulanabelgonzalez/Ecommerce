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

	return (
		<Button
			onClick={() => handleAdd(product)}
			sx={{
				textDecoration: "none",
				margin: "auto",
				border: "3px solid #999999",
				borderRadius: "23px",
				color: "#525252",
				textAlign: "center",
				fontWeight: 600,
				background: "linear-gradient(120deg, #5e5b5b, #f2f2f2, #5e5b5b)",
				backgroundSize: "150% 150%",
				transition: "background-position 0.5s ease",
				"&:hover": {
					backgroundPosition: "100% 0",
				},
				"&:active": {
					boxShadow: "inset 0 4px 8px rgba(0, 0, 0, 0.5)",
				},
			}}
		>
			Añadir al carrito
		</Button>
	);
};
