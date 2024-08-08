import { useContext } from "react";

import { Box, Button } from "@mui/material";

import { CartContext } from "../context/CartContext";

export const QuantityProducts = ({ product }) => {
	const { handleAddQuantity, handleRemoveQuantity } = useContext(CartContext);

	return (
		<Box sx={{ display: "flex", alignItems: "center" }}>
			<span>x</span>
			<Button onClick={() => handleRemoveQuantity(product.id)}>-</Button>
			<Box>{product.quantity}</Box>
			<Button onClick={() => handleAddQuantity(product.id)}>+</Button>
		</Box>
	);
};
