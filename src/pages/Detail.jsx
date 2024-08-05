import { useContext } from "react";

import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";

import { Box, Button, Container, Typography } from "@mui/material";

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
					<Button onClick={() => navigate("/")}>Volver</Button>
					<Typography>{product.nombre}</Typography>
					<img src={product.image} alt={product.nombre} />
					<Typography>{product.descripcion}</Typography>
					<AddButton />
					<Button>Comprar</Button>
				</>
			) : (
				<Typography>Producto no encontrado</Typography>
			)}
		</Box>
	);
};
