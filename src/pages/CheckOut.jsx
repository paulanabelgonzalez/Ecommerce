import { useContext } from "react";

import { useNavigate } from "react-router";

import { Box, Button, Typography } from "@mui/material";

import { CartContext } from "../context/CartContext";
import { FirebaseContext } from "../context/FirebaseContext";

export const CheckOut = () => {
	const { cart, subtotal, subTotalProduct, setCart } = useContext(CartContext);
	const { finalizePurchase } = useContext(FirebaseContext);
	const navigate = useNavigate();

	const handlefinalizePurchase = () => {
		finalizePurchase(cart, subtotal);
		navigate("/");
		setCart([]);
	};
	return (
		<Box sx={{ backgroundColor: "white" }}>
			<Button onClick={() => navigate("/")}>Regresar</Button>
			<Typography>Tu pedido</Typography>
			{cart.map((product) => (
				<Box
					key={product.id}
					sx={{
						padding: 2,
						borderBottom: "1px solid #ddd",
						textAlign: "center",
					}}
				>
					<Typography>{product.quantity}</Typography>
					<Typography variant="h6">{product.name}</Typography>
					<img
						src={product.image}
						alt={product.name}
						style={{ borderRadius: "100px", width: "100px" }}
					/>
					<Typography variant="body2">Precio: ${product.price}</Typography>
					<Typography>Subtotal:${subTotalProduct(product)}</Typography>
				</Box>
			))}
			<Typography>Total: $ {subtotal} </Typography>
			<Button onClick={handlefinalizePurchase}>Finalizar compra</Button>
		</Box>
	);
};
