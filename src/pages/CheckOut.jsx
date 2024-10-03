import { useContext, useEffect } from "react";

import { useNavigate } from "react-router";

import { Box, Button, Typography } from "@mui/material";

import { CartContext } from "../context/CartContext";
import { FirebaseContext } from "../context/FirebaseContext";

export const CheckOut = () => {
	const { cart, handleDeleteAll, formatNumber, subtotal, subTotalProduct } =
		useContext(CartContext);
	const { finalizePurchase, setModal } = useContext(FirebaseContext);

	const navigate = useNavigate();

	const handlefinalizePurchase = () => {
		finalizePurchase(cart, subtotal);
		setModal(1);
		navigate("/modal");
		handleDeleteAll();
	};

	useEffect(() => {
		if (cart.length === 0) {
			navigate("/");
		}
	}, [cart, navigate]);

	const styleTypography = {
		display: "flex",
		justifyContent: "space-between",
		width: "100%",
	};

	return (
		<Box
			sx={{
				width: "100%",
				maxWidth: "800px",
				margin: "auto",
				padding: "10px",
				color: "#f1f1f1",
			}}
		>
			<Box sx={{ textAlign: "end" }}>
				<Button
					onClick={() => navigate("/")}
					sx={{
						color: "#fff",
						minWidth: "40px",
						padding: "4px 15px",
						fontSize: "12px",
						borderRadius: "15px",
						boxShadow: "0 25px 35px #53535333, inset 0 3px 14px 1px #fff",
						"&:hover": {
							color: "#999999",
							background: "#ffffffa1",
							boxShadow: "0 0 6px rgb(255 255 255)",
						},
					}}
				>
					Atrás
				</Button>
			</Box>
			<Typography
				sx={{
					borderBottom: "1px solid white",
					marginBottom: "10px",
					width: "100%",
				}}
			>
				Tu pedido
			</Typography>
			{cart.map((product) => (
				<Box
					key={product.id}
					sx={{
						display: "flex",
						alignItems: "center",
						padding: "10px",
						gap: "8px",
						borderBottom: "1px solid white",
					}}
				>
					<Box>
						<img
							src={product.image}
							alt={product.name}
							style={{ width: "100px", border: "1px solid white" }}
						/>
					</Box>
					<Box sx={styleTypography}>
						<Typography>
							<span>{product.name} x</span> <span>{product.quantity}</span>
						</Typography>
						<Typography sx={{ ml: "10px" }}>
							<span>${formatNumber(subTotalProduct(product))}</span>
						</Typography>
					</Box>
				</Box>
			))}

			<Typography sx={styleTypography}>
				<span>Total:</span>
				<span> $ {formatNumber(subtotal)}</span>
			</Typography>

			<Button
				className="link-button"
				onClick={handlefinalizePurchase}
				sx={{
					width: "100%",
					marginTop: "10px",
					color: "#525252",
					border: "3px solid #999999",
					fontWeight: "600",
					transition: "background-position 0.5s ease",
				}}
			>
				Finalizar compra
			</Button>
		</Box>
	);
};
