import { useContext } from "react";

import { useParams } from "react-router-dom";

import { Button, Container, Typography } from "@mui/material";

import { FirebaseContext } from "../context/FirebaseContext";

import { AddButton } from "../components/AddButton";

export const Detail = () => {
	const { products } = useContext(FirebaseContext);
	const { id } = useParams();

	const product = products.find((product) => product.id === id);

	return (
		<Container>
			{product ? (
				<>
					<Typography>{product.nombre}</Typography>
					<img src={product.image} alt={product.nombre} />
					<Typography>{product.descripcion}</Typography>
					<AddButton />
					<Button>Comprar</Button>
				</>
			) : (
				<Typography>Producto no encontrado</Typography>
			)}
		</Container>
	);
};
