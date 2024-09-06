import { useContext, useEffect } from "react";

import { Link, useParams } from "react-router-dom";

import { Box, Button, Container, Typography } from "@mui/material";

import { FilterContext } from "../context/FilterContext";

import { Filters } from "../components/Filters";
import { CartContext } from "../context/CartContext";

export const CategoryCards = () => {
	const { name } = useParams();
	const {
		filter,
		filteredProductsByCategory,
		handleCategory,
		setFilter,
		useFilter,
		categoryButtons,
	} = useContext(FilterContext);
	const { handleAdd } = useContext(CartContext);

	console.log(`categoria:`, name);

	useEffect(() => {
		handleCategory(name);
	}, [name]);

	const filteredProducts = useFilter(filteredProductsByCategory, filter);
	const showButtons = categoryButtons(name);
	return (
		<Container>
			<Filters setFilter={setFilter} />

			<Box
				sx={{
					display: "flex",
					flexWrap: "wrap",
					justifyContent: "center",
					gap: "20px",
					marginBlock: "20px",
				}}
			>
				<Box>
					<Link to="/Productos" style={{ textDecoration: "none" }}>
						<Button sx={{ color: "black" }}>Todos los productos</Button>
					</Link>
					{showButtons.map((category, index) => (
						<Box key={index}>
							<Link
								to={`/Category/${category}`}
								style={{ textDecoration: "none" }}
							>
								<Button sx={{ color: "black" }}>{category}</Button>
							</Link>
						</Box>
					))}
					{/* {name === "Herreria" ? (
						<Link
							to="/Category/Muebles Industriales"
							style={{ textDecoration: "none" }}
						>
							<Box sx={{ color: "black" }}>Muebles Industriales</Box>
						</Link>
					) : (
						<Link to="/Category/Herreria" style={{ textDecoration: "none" }}>
							<Box sx={{ color: "black" }}>Herreria</Box>
						</Link>
					)} */}
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
			</Box>
		</Container>
	);
};
