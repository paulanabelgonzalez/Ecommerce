import { Category } from "./Category";

import industrial from "../assets/industrial.jpg";
import smithy from "../assets/smithy.jpeg";
import { Box } from "@mui/material";

export const ListCategories = () => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: { xs: "column", md: "row" },
				flexWrap: "wrap",
				padding: { xs: "10px", md: 0 },
				gap: { xs: "20px", md: 0 },
				maxWidth: "950px",
				margin: "auto",
			}}
		>
			<Category name="Herreria" imgCategory={smithy} />
			<Category name="Muebles Industriales" imgCategory={industrial} />
		</Box>
	);
};
