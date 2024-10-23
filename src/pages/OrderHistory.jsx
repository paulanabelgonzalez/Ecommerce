import { useContext } from "react";

import { Box, Typography } from "@mui/material";

import { CartContext } from "../context/CartContext";
import { FirebaseContext } from "../context/FirebaseContext";

import "../index.css";

import letrero from "../assets/imgLetreros/letrero.png";

export const OrderHistory = () => {
	const { formatNumber } = useContext(CartContext);
	const { user, handleGoBack } = useContext(FirebaseContext);

	const hasOrders = user?.orders?.length > 0;

	const styleTypography = {
		display: "flex",
		justifyContent: "space-between",
		width: "100%",
		paddingInline: "5px",
		color: "#f1f1f1",
		paddingBottom: { sm: "5px" },
	};

	return (
		<>
			<Box
				sx={{
					width: "100%",
					maxWidth: "800px",
					margin: "auto",
					padding: "10px",
				}}
			>
				<Box sx={{ textAlign: "end", paddingBottom: "5px" }}>
					<Box
						as="button"
						className="link-button"
						onClick={handleGoBack}
						sx={{
							textAlign: "center",
							width: { xs: "90px", sm: "120px" },
							fontSize: { xs: "14px", sm: "16px" },
						}}
					>
						cerrar x
					</Box>
				</Box>
				<Typography
					sx={{
						paddingBlock: "5px",
						color: "white",
						fontSize: "17px",
						fontWeight: "600",
						textDecorationLine: "underline",
					}}
				>
					Historial de Compras:
				</Typography>
				{hasOrders ? (
					user.orders.map((order, index) => (
						<Box
							sx={{
								padding: { sm: "15px" },
								marginBottom: "20px",
								boxShadow:
									"0 10px 20px rgba(0, 0, 0, 0.4), 0 14px 40px rgba(0, 0, 0, 0.4)",
								borderRadius: "10px",
							}}
							key={index}
						>
							<Typography
								sx={{
									...styleTypography,
									borderBottom: "1px solid #f1f1f1",
									width: { xs: "95%", sm: "98%" },
									margin: "auto",
									fontWeight: "600",
								}}
							>
								<span>Tu compra del:</span>
								<span>{order.date}</span>
							</Typography>

							{order?.order?.map((product, index) => (
								<Box key={index} sx={{ paddingInline: "10px" }}>
									<Box
										sx={{
											borderBottom: "1px solid #f1f1f1",
											display: { sm: "flex" },
											gap: "15px",
										}}
									>
										<Box
											sx={{
												maxWidth: "231px",
												margin: { xs: "auto", sm: "0px" },
												paddingBlock: "10px",
											}}
										>
											<img
												style={{
													width: "231px",
													aspectRatio: "5/5",
													objectFit: "cover",
													border: "1px solid #f1f1f1",
												}}
												src={product.image}
												alt={product.name}
											/>
										</Box>
										<Box
											sx={{
												paddingBlock: { xs: "10px", sm: "20px" },
												width: "100%",
											}}
										>
											<Typography
												sx={{
													color: "#f1f1f1",
													textAlign: "center",
													fontSize: "18px",
												}}
											>
												{product.name}
											</Typography>
											<Typography sx={{ ...styleTypography }}>
												<span>Precio por unidad:</span>
												<span>${formatNumber(product.price)}</span>
											</Typography>

											<Typography sx={{ ...styleTypography }}>
												<span>Cantidad:</span>
												<span>{product.quantity}</span>
											</Typography>
										</Box>
									</Box>
								</Box>
							))}
							<Typography
								sx={{
									...styleTypography,
									width: "95%",
									margin: "auto",
									fontWeight: "bold",
								}}
							>
								<span>Total:</span>
								<span>${formatNumber(order.total)}</span>
							</Typography>
						</Box>
					))
				) : (
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
