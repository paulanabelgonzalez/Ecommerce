import React, { useContext } from "react";

import { useNavigate } from "react-router";

import { Box, Button, Drawer, Typography } from "@mui/material";

import { CartContext } from "../context/CartContext";
import { QuantityProducts } from "./QuantityProducts";
import { FirebaseContext } from "../context/FirebaseContext";

export const Cart = ({ state, toggleDrawer }) => {
	const { cart, handleDelete, subtotal, subTotalProduct, handleDeleteAll } =
		useContext(CartContext);

	const { user } = useContext(FirebaseContext);

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
				sx={{ height: "100%", overflowY: "scroll" }}
			>
				<Button onClick={toggleDrawer("right", false)}>x</Button>
				<Button onClick={handleDeleteAll}>Vaciar carrito</Button>
				{cart.length === 0 ? (
					<Typography>No hay productos en el carrito</Typography>
				) : (
					cart.map((product) => (
						<Box
							key={product.id}
							sx={{ padding: 2, borderBottom: "1px solid #ddd" }}
						>
							<Button onClick={() => handleDelete(product)}>Eliminar</Button>
							<Typography variant="h6">{product.name}</Typography>
							<img src={product.image} alt={product.name} width={"200px"} />
							<Typography variant="body2">{product.descripcion}</Typography>
							<Typography variant="body2">Precio: $ {product.price}</Typography>
							<QuantityProducts key={product.id} product={product} />
							<Typography>subtotal: $ {subTotalProduct(product)}</Typography>
						</Box>
					))
				)}
			</Box>

			{cart.length > 0 && (
				<Box>
					<Typography>Subtotal: $ {subtotal} </Typography>
					<Button
						onClick={
							user ? () => navigate("/CheckOut") : () => navigate("/Login")
						}
					>
						Comprar
					</Button>
				</Box>
			)}
		</Drawer>
	);
};
