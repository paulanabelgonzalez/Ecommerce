import { useContext } from "react";

import { Link, useNavigate } from "react-router-dom";

import { Box, Button, Container, Typography } from "@mui/material";

import { CartContext } from "../context/CartContext";
import { FirebaseContext } from "../context/FirebaseContext";
import { FilterContext } from "../context/FilterContext";
// import { QuantityProducts } from "./QuantityProducts";

export const Card = ({ filter }) => {
	const { handleAdd } = useContext(CartContext);
	const { products } = useContext(FirebaseContext);
	const {
		filterFromCategory,
		productsFilteredByCategory,
		setFilterFromCategory,
	} = useContext(FilterContext);

	const navigate = useNavigate();

	const filteredProducts = filter
		? products.filter(
				(product) =>
					product.name.toLowerCase().includes(filter.toLowerCase()) ||
					product.category.toLowerCase().includes(filter.toLowerCase())
		  )
		: products;

	const handleFilterFromCategory = () => {
		setFilterFromCategory(false);
		navigate("/Productos");
		console.log("sin blucle");
	};

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
			{filterFromCategory && (
				<Box>
					<Button onClick={handleFilterFromCategory} sx={{ color: "black" }}>
						Todos los productos
					</Button>
					<Button sx={{ color: "black" }}>productos de</Button>
				</Box>
			)}
			{filterFromCategory ? (
				productsFilteredByCategory?.map((product) => (
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
						{/* <QuantityProducts key={product.id} product={product} /> */}
						<Link to={`/detail/${product.id}`}>ver más</Link>
						<Button onClick={() => handleAdd(product)}>
							Añadir al carrito
						</Button>
					</Box>
				))
			) : filteredProducts.length > 0 ? (
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
						<Typography variant="h5">{product.name}</Typography>
						<Typography>{product.category}</Typography>
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
