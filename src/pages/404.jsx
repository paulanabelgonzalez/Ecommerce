import { useContext } from "react";

import { Box, Button, Typography } from "@mui/material";

import { FirebaseContext } from "../context/FirebaseContext";

import notFound from "../assets/notFound.jpg";

export const NotFound = () => {
	const { handleGoBack } = useContext(FirebaseContext);

	return (
		<Box
			sx={{
				width: { xs: "375px", sm: "520px" },
				maxWidth: "520px",
				margin: "auto",
				height: { xs: "375px", sm: "520px" },
				maxHeight: "520px",
				backgroundImage: `url(${notFound})`,
				backgroundSize: "contain",
				position: "relative",
			}}
		>
			<Typography
				sx={{
					width: "100%",
					color: "#fff",
					backgroundColor: "#5f9ea0ab",
					padding: { sm: "10px" },
					fontSize: { xs: "21px", sm: "22px" },
					textAlign: "center",
					position: "absolute",
					top: { xs: "66%", sm: "74%" },
				}}
			>
				No se ha encontrado la página solicitada
			</Typography>
			<Box sx={{ textAlign: "end", padding: "10px 10px 0px 0px" }}>
				<Button
					onClick={handleGoBack}
					sx={{
						textDecoration: "none",
						color: "#fff",
						// fontSize: { md: "20px" },
						padding: "4px 24px",
						borderRadius: "15px",
						boxShadow: "0 25px 35px #53535333, inset 0 3px 14px 1px #fff",
						"&:hover": {
							color: "#999999",
							background: "#ffffffa1",
							boxShadow: "0 0 6px rgb(255 255 255)",
						},
					}}
				>
					Atrás
				</Button>
			</Box>
		</Box>
	);
};
