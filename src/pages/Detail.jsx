import { useContext } from "react";

import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";

import { Box, Button, Typography } from "@mui/material";

import { FirebaseContext } from "../context/FirebaseContext";

import { AddButton } from "../components/AddButton";

export const Detail = () => {
	const { products } = useContext(FirebaseContext);
	const { id } = useParams();
	const navigate = useNavigate();

	const product = products.find((product) => product.id === id);

	return (
		<Box sx={{ maxWidth: "1000px", margin: "auto", border: "1px solid" }}>
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
									<Button onClick={() => navigate("/")}>Volver</Button>
								</Box>
								<Box>
									<Typography variant="h5">{product.name}</Typography>
									<Typography>{product.description}</Typography>
								</Box>
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
