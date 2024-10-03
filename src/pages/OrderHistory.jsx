import { useContext } from "react";

import { useNavigate } from "react-router";

import { Box, Typography } from "@mui/material";

import { FirebaseContext } from "../context/FirebaseContext";

import "../index.css";

import letrero from "../assets/imgLetreros/letrero.png";

export const OrderHistory = () => {
	const navigate = useNavigate();

	const { user } = useContext(FirebaseContext);

	const hasOrders = user?.orders?.length > 0;

	return (
		<>
			<Box sx={{ maxWidth: { xs: "360px", sm: "500px" }, margin: "auto" }}>
				<Box sx={{ textAlign: "end", padding: "5px" }}>
					<Box
						as="button"
						onClick={() => navigate("/")}
						className="link-button"
						sx={{ textAlign: "center" }}
					>
						<span> cerrar x</span>
					</Box>
				</Box>
				{hasOrders ? (
					// Mostrar historial de órdenes
					user.orders.map((order, index) => (
						<Box
							sx={{ border: "black 2px solid", marginBottom: "20px" }}
							key={index}
						>
							<Typography sx={{ color: "black", fontWeight: "bold" }}>
								Total: {order.total}
							</Typography>
							{order?.order?.map((product, index) => (
								<Box key={index} sx={{ padding: "10px" }}>
									<Typography sx={{ color: "black" }}>
										Descripción: {product.description}
									</Typography>
									<Typography sx={{ color: "black" }}>
										Cantidad: {product.quantity}
									</Typography>
									<Typography sx={{ color: "black" }}>
										Nombre: {product.name}
									</Typography>
									<Typography sx={{ color: "black" }}>
										Precio: {product.price}
									</Typography>
									<img
										style={{ width: "300px", marginTop: "10px" }}
										src={product.image}
										alt={product.name}
									/>
								</Box>
							))}
							<Typography sx={{ color: "black" }}>
								Fecha: {order.date}
							</Typography>
						</Box>
					))
				) : (
					// Mostrar mensaje si no hay órdenes
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
							No tienes historial de compras.
						</Typography>
					</Box>
				)}
			</Box>
		</>
	);
};
