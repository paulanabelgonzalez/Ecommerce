import { useContext, useEffect } from "react";

import { Link, useParams } from "react-router-dom";

import { Box, Button, Container, Typography } from "@mui/material";

import { FilterContext } from "../context/FilterContext";

export const CategoryCards = () => {
	const { name } = useParams();
	const { filter, setFilter, filteredProductsByCategory, handleCategory } =
		useContext(FilterContext);

	console.log(`categoria:`, name);

	useEffect(() => {
		handleCategory(name);
	}, [name]);

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
			{filteredProductsByCategory.length > 0 ? (
				filteredProductsByCategory.map((product) => (
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
