import { useContext } from "react";

import { Link } from "react-router-dom";

import { Box, Button, Typography } from "@mui/material";

import { CartContext } from "../context/CartContext";
import { FilterContext } from "../context/FilterContext";
import { FirebaseContext } from "../context/FirebaseContext";

export const Card = () => {
	const { handleAdd } = useContext(CartContext);
	const { filter, handleCategoryClick, useFilter } = useContext(FilterContext);
	const { products } = useContext(FirebaseContext);

	const filteredProducts = useFilter(products, filter);

	const uniqueCategories = [
		...new Set(products.map((product) => product.category)),
	];

	return (
		<Box>
			<Box
				sx={{
					width: "93%",
					maxWidth: "1000px",
					display: "flex",
					flexDirection: "row-reverse",
					justifyContent: "space-between",
					margin: "auto",
					gap: "7px",
				}}
			>
				{uniqueCategories.map((category, index) => (
					<Box
						sx={{
							width: "49%",
							background: "#9e9e9ead",
							boxShadow: "0 0 10px black",
							borderRadius: "5px",
							transition: "all .75s ease-out",
							"&:hover": {
								background: "white",
								boxShadow: "0 0 50px white",
								"& .text": {
									color: "grey",
									transform: "scaleX(1.1)",
								},
							},
						}}
						key={index}
					>
						<Link
							to={`/Category/${category}`}
							style={{ textDecoration: "none" }}
						>
							<Button
								onClick={handleCategoryClick}
								sx={{
									color: "white",
									width: "100%",
									height: "100%",
								}}
							>
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
					<Typography sx={{ paddingBlock: "19%" }} variant="h6">
						No se encontraron productos
					</Typography>
				)}
			</Box>
		</Box>
	);
};
