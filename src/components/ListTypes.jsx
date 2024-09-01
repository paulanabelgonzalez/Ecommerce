import { Type } from "./Type";

import industrial from "../assets/industrial.jpg";
import smithy from "../assets/smithy.jpeg";
import { Box } from "@mui/material";

export const ListTypes = () => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: { xs: "column", md: "row" },
				flexWrap: "wrap",
				padding: "10px",
				gap: "20px",
				maxWidth: "1100px",
				margin: "auto",
			}}
		>
			<Type name="Herreria" imgType={smithy} />
			<Type name="Muebles Industriales" imgType={industrial} />
		</Box>
	);
};
