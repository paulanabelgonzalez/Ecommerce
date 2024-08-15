import { useContext } from "react";

import { Link } from "react-router-dom";

import { Box, Button, Container, Typography } from "@mui/material";

import { CartContext } from "../context/CartContext";
import { FirebaseContext } from "../context/FirebaseContext";
// import { QuantityProducts } from "./QuantityProducts";

export const Card = ({ filter }) => {
	const { handleAdd } = useContext(CartContext);
	const { products } = useContext(FirebaseContext);

	const filteredProducts = filter
		? products.filter((product) =>
				product.name.toLowerCase().includes(filter.toLowerCase())
		  )
		: products;

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
			{filteredProducts.length > 0 ? (
				filteredProducts?.map((product) => (
					<Box
						key={product.id}
						sx={{
							border: "2px solid",
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<img src={product.image} alt={product.name} width={"300px"} />
						{/* <Typography>{product.id}</Typography> */}
						<Typography variant="h5">{product.name}</Typography>
						<Typography>{product.description}</Typography>
						<Typography>$ {product.price}</Typography>
						{/* <QuantityProducts key={product.id} product={product} /> */}
						<Link to={`/detail/${product.id}`}>ver más</Link>
						<Button onClick={() => handleAdd(product)}>
							Añadir al carrito
						</Button>
					</Box>
				))
			) : (
				<Typography variant="h6">No se encontraron productos</Typography>
			)}
		</Container>
	);
};
