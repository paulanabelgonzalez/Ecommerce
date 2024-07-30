import { useContext } from "react";

import { Container, Typography } from "@mui/material";

import { FirebaseContext } from "../context/FirebaseContext";

export const Card = () => {
	const { products } = useContext(FirebaseContext);
	return (
		<Container
			sx={{
				display: "grid",
				gridTemplateColumns: "repeat(3, auto)",
				gap: "3em",
			}}
		>
			{products?.map((product) => (
				<Container key={product.id} sx={{ border: "2px solid" }}>
					<Typography>{product.id}</Typography>
					<Typography>{product.descripcion}</Typography>
					<Typography>{product.nombre}</Typography>
				</Container>
			))}
		</Container>
	);
};
