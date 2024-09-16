import React, { useContext } from "react";

import { useNavigate } from "react-router";

import { Box, Button, Drawer, Typography } from "@mui/material";

import { CartContext } from "../context/CartContext";
import { FirebaseContext } from "../context/FirebaseContext";

import { QuantityProducts } from "./QuantityProducts";

import backgroundDrawer from "../assets/imgBackground/backgroundMetal.jpg";
import letrero from "../assets/letrero.png";

export const Cart = ({ state, toggleDrawer }) => {
	const {
		cart,
		handleDelete,
		handleDeleteAll,
		handlePositionFixed,
		subtotal,
		subTotalProduct,
	} = useContext(CartContext);
	const { user } = useContext(FirebaseContext);

	const navigate = useNavigate();

	const handleStartShopping = (page) => {
		handlePositionFixed(false);
		navigate(page);
	};

	const handleUserStartShopping = () => {
		toggleDrawer("right", false)({});
		if (user) {
			handleStartShopping("/CheckOut");
		} else {
			handleStartShopping("/Login");
		}
	};

	return (
		<Drawer
			anchor="right"
			open={state.right}
			onClose={toggleDrawer("right", false)}
			PaperProps={{
				sx: {
					width: { xs: "100%", md: "400px" },
					height: "100vh",
				},
			}}
		>
			<Box
				sx={{
					height: "100%",
					overflowY: "scroll",
					background: `url(${backgroundDrawer})`,
					backgroundRepeat: "no-repeat",
					backgroundSize: "cover",
				}}
			>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "flex-start",
						padding: "8px 10px",
					}}
				>
					<Typography
						variant="h6"
						className="silver-text"
						sx={{ paddingBlockStart: "7px" }}
					>
						Carrito de compras
					</Typography>
					<Box
						as="button"
						onClick={toggleDrawer("right", false)}
						sx={{
							background: "transparent",
							border: "none",
							fontSize: "18px",
							// paddingTop: "20px",
							// paddingRight: "20px",
						}}
					>
						<span className="silver-text">Cerrar </span>{" "}
						<span className="silver-text">x</span>
					</Box>
				</Box>

				{cart.length === 0 ? (
					<Box
						sx={{
							maxWidth: "96%",
							margin: "auto",
							borderTop: "2px solid #242424",
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
							height: "345px",
							position: "relative",
						}}
					>
						<img
							src={letrero}
							alt="Letrero"
							style={{
								width: "100%",
								height: "100%",
								objectFit: "cover",
								position: "absolute",
								top: 0,
								left: 0,
							}}
						/>

						<Typography
							sx={{
								position: "absolute",
								zIndex: 1,
								color: "#464646",
								fontSize: "21px",
								textAlign: "center",
								top: "59%",
							}}
						>
							No hay productos en el carrito
						</Typography>
					</Box>
				) : (
					<>
						{cart.map((product) => (
							<Box
								key={product.id}
								sx={{ padding: 2, borderBottom: "1px solid #ddd" }}
							>
								<Button onClick={() => handleDelete(product)}>Eliminar</Button>
								<Typography variant="h6">{product.name}</Typography>
								<img src={product.image} alt={product.name} width={"200px"} />
								{/* <Typography variant="body2">{product.descripcion}</Typography> */}
								<Typography sx={{ fontSize: "14px" }}>
									Precio: $ {product.price}
								</Typography>
								<QuantityProducts key={product.id} product={product} />
								<Typography>subtotal: $ {subTotalProduct(product)}</Typography>
							</Box>
						))}
						<Button onClick={handleDeleteAll}>Vaciar carrito</Button>
					</>
				)}
			</Box>

			{cart.length > 0 && (
				<Box>
					<Typography>Subtotal: $ {subtotal} </Typography>
					<Button onClick={() => handleUserStartShopping()}>Comprar</Button>
				</Box>
			)}
		</Drawer>
	);
};
