import { useContext, useEffect } from "react";

import { Link, useParams } from "react-router-dom";

import { Box, Button, Container, Typography } from "@mui/material";

import { CartContext } from "../context/CartContext";
import { FilterContext } from "../context/FilterContext";
import { FirebaseContext } from "../context/FirebaseContext";

import { Filters } from "../components/Filters";
import { Spinner } from "../components/Spinner";

import letrero from "../assets/imgLetreros/letrero.png";

export const CategoryCards = () => {
	const { name } = useParams();

	const { formatNumber, handleAdd } = useContext(CartContext);
	const {
		categoryButtons,
		filter,
		filteredProductsByCategory,
		handleCategory,
		handleCategoryClick,
		setFilter,
		useFilter,
	} = useContext(FilterContext);
	const { loading, setLoading } = useContext(FirebaseContext);

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
		setLoading(true);
		handleCategory(name);

		setTimeout(() => {
			setLoading(false);
		}, 3000);
	}, [name, setLoading]);

	const filteredProducts = useFilter(filteredProductsByCategory, filter);
	const showButtons = categoryButtons(name);

	return (
		<Container>
			{loading ? (
				<Spinner />
			) : (
				<>
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
								<Button onClick={handleCategoryClick} sx={{ ...buttonStyles }}>
									<span
										className="text"
										style={{ transition: "all .5s ease-out" }}
									>
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
									<Button
										onClick={handleCategoryClick}
										sx={{ ...buttonStyles }}
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
											{isNaN(product.price)
												? "Consultar precio"
												: `$ ${formatNumber(product.price)}`}
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

								<Typography
									className="typography-sign"
									sx={{ fontSize: "21px" }}
								>
									No se encontraron productos.
								</Typography>
							</Box>
						)}
					</Box>
				</>
			)}
		</Container>
	);
};
