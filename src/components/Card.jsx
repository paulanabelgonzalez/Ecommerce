import { useContext } from "react";

import { Link } from "react-router-dom";

import { Box, Button, Container, Typography } from "@mui/material";

import { CartContext } from "../context/CartContext";
import { FilterContext } from "../context/FilterContext";
import { FirebaseContext } from "../context/FirebaseContext";

export const Card = () => {
	const { handleAdd } = useContext(CartContext);
	const { filter, useFilter } = useContext(FilterContext);
	const { products } = useContext(FirebaseContext);

	const filteredProducts = useFilter(products, filter);
	const uniqueCategories = [
		...new Set(products.map((product) => product.category)),
	];
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
			<Box>
				{uniqueCategories.map((category, index) => (
					<Box key={index}>
						<Link
							to={`/Category/${category}`}
							style={{ textDecoration: "none" }}
						>
							<Button sx={{ color: "black" }}>{category}</Button>
						</Link>
					</Box>
				))}
				{/* <Link to="/Category/Herreria" style={{ textDecoration: "none" }}>
					<Box sx={{ color: "black" }}>Herreria</Box>
				</Link>
				<Link
					to="/Category/Muebles Industriales"
					style={{ textDecoration: "none" }}
				>
					<Box sx={{ color: "black" }}>Muebles Industriales</Box>
				</Link> */}
			</Box>

			{filteredProducts.length > 0 ? (
				filteredProducts.map((product) => (
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
						<Typography variant="h5">{product.name}</Typography>
						<Typography>{product.category}</Typography>
						<Typography>{product.description}</Typography>
						<Typography>$ {product.price}</Typography>
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
