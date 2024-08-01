import React, { useContext } from "react";

import { useNavigate } from "react-router";

import { Box, Button, Drawer, Typography } from "@mui/material";

import { CartContext } from "../context/CartContext";

export const Cart = ({ state, toggleDrawer }) => {
	const { cart, handleDelete } = useContext(CartContext);

	const navigate = useNavigate();

	const list = (anchor) => (
		<Box
			sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
			role="presentation"
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}
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
					</Box>
				))
			)}
		</Box>
	);

	return (
		<div>
			{["right"]?.map((anchor) => (
				<React.Fragment key={anchor}>
					<Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
					<Drawer
						anchor={anchor}
						open={state[anchor]}
						onClose={toggleDrawer(anchor, false)}
					>
						{list(anchor)}
						{cart.length > 0 && (
							<Button onClick={() => navigate("Login")}>Comprar</Button>
						)}
					</Drawer>
				</React.Fragment>
			))}
		</div>
	);
};
