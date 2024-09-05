import { useContext } from "react";

import { Box, TextField } from "@mui/material";

import { FilterContext } from "../context/FilterContext";

export const Filters = () => {
	const { setFilter } = useContext(FilterContext);

	const handleChange = (event) => {
		setFilter(event.target.value);
	};

	return (
		<Box sx={{ margin: "20px 0" }}>
			<TextField
				fullWidth
				variant="outlined"
				label="Buscar Producto"
				onChange={handleChange}
			/>
		</Box>
	);
};
