import { useState } from "react";

import { Box, Typography } from "@mui/material";

import { Carousel } from "../components/Carousel";

import videoHome from "../../src/assets/videoHome2.mp4";

export const Home = () => {
	const [videoError, setVideoError] = useState(false);

	return (
		<>
			{/* <Box sx={{ maxWidth: "300px", margin: "auto" }}>
				<img
					width="300px"
					src="https://www.gifsanimados.org/data/media/1829/soldador-imagen-animada-0014.gif"
					border="0"
					alt="soldador-imagen-animada-0014"
				/>
				<img
					width="300px"
					src="https://www.gifsanimados.org/data/media/1829/soldador-imagen-animada-0011.gif"
					border="0"
					alt="soldador-imagen-animada-0011"
				/>
			</Box> */}

			{/* <Carousel /> */}
			<Box
				sx={{
					position: "relative", // Contenedor principal para el video de primer plano
					width: "100%",
					height: {
						xs: "400px", // Altura del contenedor en pantallas pequeñas
						md: "600px", // Altura del contenedor en pantallas medianas y grandes
					},
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					overflow: "hidden", // Ocultar el desbordamiento
					marginBlock: "20px",
				}}
			>
				{!videoError ? (
					<>
						<Box
							sx={{
								position: "absolute", // El video de fondo es absoluto para ocupar todo el ancho del contenedor principal
								top: "50%", // Centra el video verticalmente
								left: "50%", // Centra el video horizontalmente
								transform: "translate(-50%, -50%)", // Ajusta el centrado
								width: "100vw", // Ocupa el 100% del ancho de la pantalla
								height: "auto", // Mantiene la altura automática basada en el ancho
								zIndex: 1,
								opacity: 0.7, // Transparencia del video de fondo
								filter: "blur(5px)", // Desenfoque opcional
								objectFit: "cover",
							}}
						>
							<video
								autoPlay
								loop
								muted
								style={{
									width: "100%",
									height: "100%",
									objectFit: "cover", // Asegura que el video cubra completamente el fondo en ancho
								}}
								onError={() => setVideoError(true)}
							>
								<source src={videoHome} type="video/mp4" />
							</video>
						</Box>

						<Box
							sx={{
								position: "relative", // El video de primer plano es relativo al contenedor
								zIndex: 2, // Por encima del video de fondo
								width: "100%",
								maxWidth: "1100px",
								height: "400px", // Mantener la altura fija del video de primer plano
								objectFit: "cover",
								boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
							}}
						>
							<video
								autoPlay
								loop
								muted
								style={{
									width: "100%",
									height: "100%",
									objectFit: "cover",
								}}
								onError={() => setVideoError(true)}
							>
								<source src={videoHome} type="video/mp4" />
							</video>
						</Box>
					</>
				) : (
					<Typography
						sx={{
							position: "relative",
							fontSize: "30px",
							color: "red",
							fontWeight: "bold",
						}}
					>
						Su navegador no soporta el video.
					</Typography>
				)}
			</Box>
		</>
	);
};
