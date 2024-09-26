import { useContext } from "react";

import { Link } from "react-router-dom";

import { Box, Button, Typography } from "@mui/material";

// import { CartContext } from "../context/CartContext";
import { FilterContext } from "../context/FilterContext";
import { FirebaseContext } from "../context/FirebaseContext";

import "../index.css";

import letrero from "../assets/imgLetreros/letrero.png";

export const Card = () => {
	// const { handleAdd } = useContext(CartContext);
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
					maxWidth: "900px",
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
								boxShadow:
									"0 10px 20px rgba(0, 0, 0, 0.4), 0 14px 40px rgba(0, 0, 0, 0.4)",
								borderRadius: "10px",
							}}
						>
							<Box
								sx={{
									width: "100%",
									paddingBottom: "10px",
								}}
							>
								<img
									src={product.image}
									alt={product.name}
									width={"350px"}
									style={{
										borderRadius: "6px",
										aspectRatio: "5/5",
										objectFit: "cover",
									}}
								/>
							</Box>
							<Box
								sx={{
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									gap: "6px",
									paddingBottom: "10px",
								}}
							>
								<Typography
									variant="h5"
									sx={{ textDecoration: "underline", color: "#e2e1e1" }}
								>
									{product.name}
								</Typography>
								<Typography>{product.category}</Typography>
								<Typography>{product.description}</Typography>
								<Typography sx={{ fontWeight: "600" }}>
									$ {product.price}
								</Typography>
								<Link to={`/detail/${product.id}`} className="link-button">
									ver más
								</Link>
								{/* <Button
								onClick={() => handleAdd(product)}
								sx={{
									color: "black",
									fontSize: "10px",
									fontWeight: "600",
									"&:hover": { color: "whitesmoke" },
								}}
							>
								Añadir al carrito
							</Button> */}
							</Box>
						</Box>
					))
				) : (
					<Box className="box-sign">
						<img className="sign" src={letrero} alt="Letrero" />

						<Typography className="typography-sign" sx={{ fontSize: "21px" }}>
							No se encontraron productos.
						</Typography>
					</Box>
				)}
			</Box>
		</Box>
	);
};
