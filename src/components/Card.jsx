import { useContext } from "react";

import { Box, Button, Container, Typography } from "@mui/material";

import { FirebaseContext } from "../context/FirebaseContext";

import { Link } from "react-router-dom";

export const Card = () => {
	const { products } = useContext(FirebaseContext);
	return (
		<Container
			sx={{
				display: "flex",
				flexWrap: "wrap",
				justifyContent: "center",
				gap: "20px",
				marginBlock: "20px",
			}}
		>
			{products?.map((product) => (
				<Box key={product.id} sx={{ border: "2px solid" }}>
					<Typography>{product.id}</Typography>
					<Typography>{product.descripcion}</Typography>
					<Typography>{product.nombre}</Typography>
					<img src={product.image} alt={product.nombre} width={"300px"} />
					<Link to={`detail/${product.id}`}>ver más</Link>
					<Button>Añadir al carrito</Button>
				</Box>
			))}
		</Container>
	);
};
