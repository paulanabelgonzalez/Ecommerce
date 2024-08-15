import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Typography } from "@mui/material";

import product1 from "../assets/producto1.avif";
import product2 from "../assets/producto4.avif";

export const Carousel = () => {
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		autoplay: true,
		autoplaySpeed: 3000,
		fade: true,
		cssEase: "ease-in-out",
	};

	return (
		<Box className="carrusel-container">
			<Slider {...settings}>
				<Box className="slide-item">
					<img src={product1} alt="Carrito" />
					<Box
						className="slide-text"
						sx={{
							height: 300,
							display: "flex",
							flexDirection: "column",
							justifyContent: "space-between",
						}}
					>
						<Typography
							sx={{
								fontSize: "1.5rem",
								fontWeight: "800",
								textAlign: "center",
							}}
						>
							REBAJAS
							<span
								style={{
									fontWeight: "normal",
									fontSize: "1.2rem",
									paddingInline: 20,
								}}
							>
								Hasta
							</span>
							-70%
						</Typography>
						<Typography
							variant="body1"
							sx={{
								fontSize: "1.1rem",
								fontWeight: "500",
								textAlign: "center",
							}}
						>
							Envío en 24 Horas
						</Typography>
					</Box>
				</Box>
				<Box className="slide-item">
					<img src={product2} alt="Card Carrito" />
					<Box
						className="slide-text"
						sx={{
							height: 300,
							display: "flex",
							flexDirection: "column",
							justifyContent: "space-between",
						}}
					>
						<Typography
							sx={{
								fontSize: "1.5rem",
								fontWeight: "500",
								textAlign: "center",
							}}
						>
							50% de Descuento
						</Typography>
						<Typography
							style={{
								fontSize: "1.2rem",
								textAlign: "center",
								fontWeight: "500",
							}}
						>
							En la segunda pieza de joyería de igual o menor valor.
						</Typography>
					</Box>
				</Box>
				{/* <Box className="slide-item">
					<img src={joyas4} alt="Carrito" />
					<Box
						className="slide-text"
						sx={{
							height: 300,
							display: "flex",
							flexDirection: "column",
							justifyContent: "space-between",
						}}
					>
						<Typography
							variant="h4"
							sx={{
								fontSize: "1.5rem",
								fontWeight: "800",
								textAlign: "center",
							}}
						>
							¡Luce Radiante!
						</Typography>
						<Typography
							variant="body1"
							style={{
								fontSize: "1.2rem",
								textAlign: "center",
								fontWeight: "500",
							}}
						>
							Nuestros aros están diseñados para complementar tu estilo con un
							toque de elegancia y sofisticación.
						</Typography>
					</Box>
				</Box> */}
			</Slider>
		</Box>
	);
};
