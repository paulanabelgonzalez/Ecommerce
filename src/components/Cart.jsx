import React, { useContext } from "react";

import { useNavigate } from "react-router";

import { Box, Button, Drawer, Typography } from "@mui/material";

import { CartContext } from "../context/CartContext";
import { QuantityProducts } from "./QuantityProducts";
import { AddButton } from "./AddButton";

export const Cart = ({ state, toggleDrawer }) => {
	const { cart, handleDelete } = useContext(CartContext);
	const { handleAddQuantity, handleRemoveQuantity, quantity } =
		useContext(CartContext);

	const navigate = useNavigate();

	return (
		<Drawer
			anchor="right"
			open={state.right}
			onClose={toggleDrawer("right", false)}
			aria-hidden={!state.right}
		>
			<Box
				onClick={(event) => event.stopPropagation()} // Evita que se cierre al hacer clic dentro
				onKeyDown={(event) => event.stopPropagation()}
			>
				{cart.length === 0 ? (
					<Typography>No hay productos en el carrito</Typography>
				) : (
					cart.map((product) => (
						<Box
							key={product.id}
							sx={{ padding: 2, borderBottom: "1px solid #ddd" }}
						>
							<Button onClick={() => handleDelete(product)}>Eliminar</Button>
							<Typography variant="h6">{product.nombre}</Typography>
							<img src={product.image} alt={product.nombre} width={"200px"} />
							<Typography variant="body2">{product.descripcion}</Typography>
							<Typography variant="body2">Precio: {product.price}</Typography>
							<QuantityProdcuts key={product.id} product={product} />
						</Box>
					))
				)}

				{cart.length > 0 && (
					<Button onClick={() => navigate("Login")}>Comprar</Button>
				)}
			</Box>
		</Drawer>
	);
};
