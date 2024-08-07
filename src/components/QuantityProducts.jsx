import { useContext } from "react";

import { Box, Button } from "@mui/material";

import { CartContext } from "../context/CartContext";

export const QuantityProducts = ({ product }) => {
	const { handleAddQuantity } = useContext(CartContext);

	return (
		<Box sx={{ display: "flex", alignItems: "center" }}>
			<Button>-</Button>
			<Box>{product.quantity}</Box>
			<Button onClick={() => handleAddQuantity(product.id)}>+</Button>
		</Box>
	);
};
