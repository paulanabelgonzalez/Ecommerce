import { useContext, useState } from "react";

import { useNavigate } from "react-router";

import { Box, Typography } from "@mui/material";

import { FirebaseContext } from "../context/FirebaseContext";

export const Category = ({ imgCategory, name, categoryName }) => {
	const { products } = useContext(FirebaseContext);

	const navigate = useNavigate();

	const [arrayCategory, setArrayCategory] = useState([]);
	console.log(arrayCategory);

	const handleCategory = (categoryName) => {
		const productsForCategories = products.filter(
			(product) => product.category === categoryName
		);
		setArrayCategory(productsForCategories);
		// navigate("Productos");
		console.log("sin bucle");
	};
	return (
		<Box
			as="button"
			onClick={() => handleCategory(categoryName)}
			sx={{
				width: { xs: "100%", md: "49%" },
				maxWidth: { xs: "355px", sm: "581px", md: "881px" },
				margin: "auto",
				background: "#9e9e9ead",
				boxShadow: "0 0 10px black",
				padding: "16px",
				borderRadius: "10px",
				border: "none",
				display: "flex",
				alignItems: "center",
				gap: "20px",
				cursor: "pointer",
				overflow: "hidden",
				transition: "all .75s ease-out",
				"&:hover": {
					background: "white",
					boxShadow: "0 0 50px white",
					"& .text": {
						color: "grey",
						transform: {
							xs: "translate(-45%)",
							sm: "translate(-40%)",
							md: "translate(-33%) scale(1.2)",
						},
					},
					"& .logo": {
						borderRadius: "50%",
						transform: {
							xs: "translateX(250%) scale(1.8)",
							sm: "translateX(490%) scale(1.8)",
							md: "translateX(350%) scale(1.8)",
						},
					},
				},
			}}
		>
			<Box
				className="logo"
				sx={{
					width: "100px",
					height: "100px",
					flexShrink: 0,
					overflow: "hidden",
					borderRadius: "10px",
					border: "7px #d4af37 solid",
					transition: "all .75s ease-out",
				}}
			>
				<img
					src={imgCategory}
					alt={`logo ${name}`}
					style={{
						width: "100%",
						objectFit: "contain",
					}}
				/>
			</Box>
			<Box>
				<Typography
					variant="h6"
					className="text"
					sx={{ color: "white", textAlign: "start", transition: "all .5s" }}
				>
					{name}
				</Typography>
			</Box>
		</Box>
	);
};
