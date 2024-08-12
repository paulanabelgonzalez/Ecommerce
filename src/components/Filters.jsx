import { Box, TextField } from "@mui/material";

export const Filters = ({ setFilter }) => {
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
