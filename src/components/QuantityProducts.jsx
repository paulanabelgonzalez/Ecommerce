import { useContext } from "react";

import { Box, Button } from "@mui/material";

import { CartContext } from "../context/CartContext";

export const QuantityProducts = ({ product }) => {
	const { handleAddQuantity, handleRemoveQuantity } = useContext(CartContext);

	const styleBubble = {
		color: "#fff",
		minWidth: "40px",
		padding: "8px 8px",
		borderRadius: "50%",
		boxShadow: "0 25px 35px #53535333, inset 0 3px 14px 1px #fff",
		"&:hover": {
			color: "#999999",
			background: "#ffffffa1",
			boxShadow: "0 0 6px rgb(255 255 255)",
		},
	};

	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-around",
			}}
		>
			<span>x</span>
			<Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
				<Button
					onClick={() => handleRemoveQuantity(product.id)}
					sx={styleBubble}
				>
					-
				</Button>
				<Box sx={{ fontSize: "18px" }}>{product.quantity}</Box>
				<Button onClick={() => handleAddQuantity(product.id)} sx={styleBubble}>
					+
				</Button>
			</Box>
		</Box>
	);
};
