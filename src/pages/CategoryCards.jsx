import { useContext, useEffect } from "react";

import { Link, useParams } from "react-router-dom";

import { Box, Button, Container, Typography } from "@mui/material";

import { CartContext } from "../context/CartContext";
import { FilterContext } from "../context/FilterContext";

import { Filters } from "../components/Filters";

export const CategoryCards = () => {
	const { name } = useParams();
	const { handleAdd } = useContext(CartContext);
	const {
		categoryButtons,
		filter,
		filteredProductsByCategory,
		handleCategory,
		setFilter,
		useFilter,
	} = useContext(FilterContext);

	const styles = {
		width: "49%",
		background: "#9e9e9ead",
		boxShadow: "0 0 10px black",
		borderRadius: "5px",
		transition: "all .75s ease-out",
		"&:hover": {
			sm: {
				background: "white",
				boxShadow: "0 0 50px white",
				"& .text": {
					color: "grey",
					transform: "scaleX(1.1)",
				},
			},
		},
	};

	const buttonStyles = {
		color: "white",
		width: "100%",
		height: "100%",
	};
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
					width: "93%",
					maxWidth: "1000px",
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
					margin: "auto",
					gap: "7px",
				}}
			>
				<Box sx={{ ...styles }}>
					<Link to="/Productos" style={{ textDecoration: "none" }}>
						<Button sx={{ ...buttonStyles }}>
							<span className="text" style={{ transition: "all .5s ease-out" }}>
								Todos los productos
							</span>
						</Button>
					</Link>
				</Box>
				{showButtons?.map((category, index) => (
					<Box sx={{ ...styles }} key={index}>
						<Link
							to={`/Category/${category}`}
							style={{ textDecoration: "none" }}
						>
							<Button sx={{ ...buttonStyles }}>
								<span
									className="text"
									style={{ transition: "all .5s ease-out" }}
								>
									{category}
								</span>
							</Button>
						</Link>
					</Box>
				))}
			</Box>
			<Box
				sx={{
					display: "flex",
					flexWrap: "wrap",
					justifyContent: "center",
					gap: "20px",
					marginBlock: "20px",
				}}
			>
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
