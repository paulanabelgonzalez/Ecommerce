import React, { useContext } from "react";

import { Link, useNavigate } from "react-router-dom";

import {
	Box,
	Button,
	Card,
	CardContent,
	CardMedia,
	Drawer,
	IconButton,
	Tooltip,
	Typography,
} from "@mui/material";

import { CartContext } from "../context/CartContext";
import { FirebaseContext } from "../context/FirebaseContext";

import { QuantityProducts } from "./QuantityProducts";

import backgroundDrawer from "../assets/imgBackground/backgroundMetal.jpg";
import border from "../assets/imgBackground/backgroundHeaderAndFooter.jpeg";
import deleteImg from "../assets/delete.png";
import card from "../assets/imgBackground/backgroundMain.jpg";
import letrero from "../assets/imgLetreros/letrero.png";

export const Cart = ({ state, toggleDrawer }) => {
	const {
		cart,
		formatNumber,
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

	const styleSpan = {
		display: "flex",
		justifyContent: "space-between",
		color: "#f1f1f1",
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
				<Box sx={{ textAlign: "end", padding: "5px" }}>
					<Box
						as="button"
						onClick={toggleDrawer("right", false)}
						sx={{
							background: "transparent",
							border: "none",
							fontSize: "18px",
						}}
					>
						<span className="silver-text">Cerrar </span>{" "}
						<span className="silver-text">x</span>
					</Box>
				</Box>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "flex-start",
						pl: "8px",
					}}
				>
					<Typography variant="h6" className="silver-text">
						Carrito de compras
					</Typography>
					<Tooltip title="Vaciar carrito">
						<IconButton onClick={handleDeleteAll} sx={{ width: "40px" }}>
							<img
								src={deleteImg}
								style={{ width: "100%" }}
								alt="boton de borrar"
							/>
						</IconButton>
					</Tooltip>
				</Box>

				{cart.length === 0 ? (
					<Box className="box-sign" sx={{ width: "360px" }}>
						<img
							className="sign"
							src={letrero}
							alt="Letrero"
							style={{
								position: "absolute",
								top: 0,
								left: 0,
							}}
						/>

						<Typography className="typography-sign" sx={{ fontSize: "21px" }}>
							No hay productos en el carrito.
						</Typography>
					</Box>
				) : (
					<>
						{cart.map((product) => (
							<Card
								sx={{
									display: "flex",
									flexDirection: "column",
									border: `13px solid`,
									borderImage: `url(${border}) 30 round`,
									margin: 2,
									backgroundImage: `url(${card})`,
									backgroundSize: "cover",
								}}
							>
								<CardContent
									sx={{ position: "relative", pt: 1, pr: 1, pb: 3, pl: 2 }}
								>
									<Box
										sx={{ display: "flex", justifyContent: "space-between" }}
									>
										<Typography variant="h6">{product.name}</Typography>
										<Tooltip title="Eliminar producto">
											<IconButton
												onClick={() => handleDelete(product)}
												sx={{ width: "35px" }}
											>
												<img
													src={deleteImg}
													style={{ width: "100%" }}
													alt="boton de borrar"
												/>
											</IconButton>
										</Tooltip>
									</Box>

									<Box sx={{ display: "flex", justifyContent: "space-around" }}>
										<CardMedia
											component="img"
											image={product.image}
											alt={product.name}
											sx={{
												width: "100px",
												aspectRatio: "5/5",
												objectFit: "cover",
											}}
										/>
										<Box>
											<Typography>
												Precio: $ {formatNumber(product.price)}
											</Typography>
											<QuantityProducts key={product.id} product={product} />
											<Typography>
												Subtotal: $ {formatNumber(subTotalProduct(product))}
											</Typography>
										</Box>
									</Box>
								</CardContent>
							</Card>
						))}
					</>
				)}
			</Box>

			{cart.length > 0 && (
				<Box
					sx={{
						backgroundImage: `url(${backgroundDrawer})`,
						borderTop: "1px solid #f1f1f1",
						padding: "10px",
					}}
				>
					<Typography sx={styleSpan}>
						<span>Subtotal :</span> <span>$ {formatNumber(subtotal)}</span>
					</Typography>
					<Typography variant="h5" sx={{ ...styleSpan, marginTop: "10px" }}>
						<span>Total :</span>
						<span>$ {formatNumber(subtotal)}</span>
					</Typography>
					<Button
						onClick={() => handleUserStartShopping()}
						sx={{
							textDecoration: "none",
							width: "100%",
							marginTop: "20px",
							border: "3px solid #999999",
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
						Comprar
					</Button>
					<Box sx={{ marginTop: "18px", textAlign: "center" }}>
						<Link to="/Productos" style={{ color: "#f1f1f1" }}>
							Seguir Comprando
						</Link>
					</Box>
				</Box>
			)}
		</Drawer>
	);
};
