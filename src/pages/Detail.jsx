import { useContext } from "react";

import { useParams, useNavigate } from "react-router-dom";
// import {  } from "react-router";

import { Box, Button, Typography } from "@mui/material";

import { FirebaseContext } from "../context/FirebaseContext";

import { AddButton } from "../components/AddButton";

export const Detail = () => {
	const { products } = useContext(FirebaseContext);
	const { id } = useParams();
	const navigate = useNavigate();

	const product = products.find((product) => product.id === id);

	return (
		<Box
			sx={{
				maxWidth: "1000px",
				margin: "auto",
				border: "1px solid",
			}}
		>
			{product ? (
				<>
					<Box sx={{ display: "flex" }}>
						<Box maxWidth={"300px"}>
							<img
								src={product.image}
								alt={product.name}
								style={{ width: "100%" }}
							/>
						</Box>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "space-between",
							}}
						>
							<Box>
								<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
									<Button
										onClick={() => navigate("/")}
										sx={{
											textDecoration: "none",
											color: "#fff",
											fontSize: "12px",
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

								<Box>
									<Typography variant="h5" sx={{ textDecoration: "underline" }}>
										{product.name}
									</Typography>
									<Typography>{product.description}</Typography>
									<Typography>{product.descriptionDetail}</Typography>
								</Box>

								<Typography variant="h5">${product.price}</Typography>
							</Box>
							<Box>
								<AddButton />
								<Button>Comprar</Button>
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
