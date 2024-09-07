import { useContext } from "react";

import { Box, TextField } from "@mui/material";

import { FilterContext } from "../context/FilterContext";

export const Filters = () => {
	const { setFilter } = useContext(FilterContext);

	const handleChange = (event) => {
		setFilter(event.target.value);
	};

	return (
		<Box sx={{ width: "95%", maxWidth: "1100px", margin: "20px auto" }}>
			<TextField
				fullWidth
				variant="outlined"
				label="Buscar Producto"
				onChange={handleChange}
				InputProps={{
					sx: {
						color: "white",
						backgroundColor: "#9e9e9ead",
						boxShadow: "0 0 10px black",

						"&:focus-within .MuiOutlinedInput-notchedOutline": {
							borderColor: "#faf6f6eb",
							boxShadow: "0 0 10px white",
						},
					},
				}}
				InputLabelProps={{
					sx: {
						color: "#605757",
						"&.Mui-focused": {
							color: "white",
						},
					},
				}}
			/>
		</Box>
	);
};
