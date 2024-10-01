import { useContext } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { Box, Button, Typography } from "@mui/material";

import { CartContext } from "../context/CartContext";
import { FirebaseContext } from "../context/FirebaseContext";

import { AddButton } from "../components/AddButton";

export const Detail = () => {
	const { formatNumber } = useContext(CartContext);
	const { products } = useContext(FirebaseContext);

	const { id } = useParams();

	const navigate = useNavigate();

	const product = products.find((product) => product.id === id);

	return (
		<Box
			sx={{
				maxWidth: { xs: "350px", sm: "1000px" },
				margin: "10px auto",
			}}
		>
			{product ? (
				<>
					<Box
						sx={{
							display: { xs: "flex" },
							flexDirection: { xs: "column", sm: "row" },
							alignItems: { xs: "center" },
							gap: { xs: "15px", sm: "50px" },
							boxShadow:
								"0 10px 20px rgba(0, 0, 0, 0.4), 0 14px 40px rgba(0, 0, 0, 0.4)",
							borderRadius: "10px",
							sm: { padding: "15px" },
						}}
					>
						<Box sx={{ height: "350px" }}>
							<img
								src={product.image}
								alt={product.name}
								width={"350px"}
								style={{
									borderRadius: "6px",
									aspectRatio: "5/5",
									objectFit: "cover",
								}}
							/>
						</Box>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								gap: { xs: "8px", sm: "80px" },
								paddingBottom: "10px",
							}}
						>
							<Box>
								<Box
									sx={{
										display: "flex",
										justifyContent: "flex-end",
									}}
								>
									<Button
										onClick={() => navigate("/")}
										sx={{
											textDecoration: "none",
											color: "#fff",
											fontSize: "12px",
											marginInlineEnd: { sm: "15px" },
											padding: "4px 24px",
											borderRadius: "6px",
											boxShadow:
												"0 25px 35px #53535333, inset 0 3px 14px 1px #fff",
											"&:hover": {
												color: "#999999",
												background: "#ffffffa1",
												boxShadow: "0 0 6px rgb(255 255 255)",
											},
										}}
									>
										Volver
									</Button>
								</Box>

								<Box
									sx={{
										maxWidth: { xs: "330px", sm: "400px" },
										marginTop: { xs: "5px" },
									}}
								>
									<Typography
										variant="h5"
										sx={{
											textDecoration: "underline",
											color: "#e2e1e1",
											textAlign: "center",
										}}
									>
										{product.name}
									</Typography>

									<Typography
										sx={{
											textAlign: "center",
											marginTop: { xs: "8px" },
										}}
									>
										{product.descriptionDetail}
									</Typography>
								</Box>

								<Typography
									sx={{
										fontSize: "20px",
										fontWeight: "600",
										textAlign: "center",
										marginTop: "9px",
									}}
								>
									$ {formatNumber(product.price)}
								</Typography>
							</Box>
							<Box>
								<AddButton />
								{/* <Button>Comprar</Button> */}
							</Box>
						</Box>
					</Box>
				</>
			) : (
				<Typography>Producto no encontrado</Typography>
			)}
		</Box>
	);
};
