import { useContext } from "react";

import { Link } from "react-router-dom";

import { Box, Button, Container, Typography } from "@mui/material";

import { CartContext } from "../context/CartContext";
import { FirebaseContext } from "../context/FirebaseContext";
// import { QuantityProducts } from "./QuantityProducts";

export const Card = () => {
	const { handleAdd } = useContext(CartContext);
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
				<Box
					key={product.id}
					sx={{
						border: "2px solid",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<img src={product.image} alt={product.nombre} width={"300px"} />
					<Typography>{product.id}</Typography>
					<Typography>{product.descripcion}</Typography>
					<Typography>{product.nombre}</Typography>
					{/* <QuantityProducts key={product.id} product={product} /> */}
					<Link to={`detail/${product.id}`}>ver más</Link>
					<Button onClick={() => handleAdd(product)}>Añadir al carrito</Button>
				</Box>
			))}
		</Container>
	);
};
