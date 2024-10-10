import { Box, Typography } from "@mui/material";

export const Spinner = () => {
	return (
		<Box
			sx={{
				maxWidth: "200px",
				margin: "auto",
				position: "relative",
			}}
		>
			<img
				width="200px"
				src="https://www.gifsanimados.org/data/media/1829/soldador-imagen-animada-0011.gif"
				border="0"
				alt="soldador-imagen-animada-0011"
				style={{ borderRadius: "20px 20px 0px 0px" }}
			/>
			<Typography
				sx={{
					position: "absolute",
					top: "82%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					fontSize: 24,
					fontWeight: 700,
					color: "#999999",
					textShadow:
						"1px -1px 2px rgba(255, 255, 255, 0.8), -1px 2px 3px rgba(0, 0, 0, 0.8), 3px 3px 8px rgba(0, 0, 0, 0.6), -3px 5px 5px rgba(0, 0, 0, 0.5)",
					textAlign: "center",
				}}
			>
				Cargando...
			</Typography>
		</Box>
	);
};
