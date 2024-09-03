import { Box } from "@mui/material";

import { Category } from "./Category";

import industrial from "../assets/industrial.jpg";
import smithy from "../assets/smithy.jpeg";

export const ListCategories = () => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: { xs: "column", md: "row" },
				flexWrap: "wrap",
				padding: { xs: "10px", md: 0 },
				paddingBlock: { md: "10px" },
				gap: { xs: "20px", md: 0 },
				maxWidth: "950px",
				margin: "auto",
			}}
		>
			<Category categoryName={"smithy"} name="Herreria" imgCategory={smithy} />
			<Category
				categoryName={"industrial"}
				name="Muebles Industriales"
				imgCategory={industrial}
			/>
		</Box>
	);
};
