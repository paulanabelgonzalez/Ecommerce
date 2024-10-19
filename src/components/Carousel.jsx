import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Box, Typography } from "@mui/material";

import product1 from "../assets/smithy.jpeg";
import product2 from "../assets/industrial.jpg";

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
								color: "#66129b",
							}}
						>
							<span>REBAJAS</span>
							<span
								style={{
									fontWeight: "600",
									fontSize: "1.2rem",
									paddingInline: 20,
									textShadow: " 2px 2px 4px rgba(0, 0, 0, 0.5)",
								}}
							>
								Hasta
							</span>
							<span>-70%</span>
						</Typography>
						<Typography
							sx={{
								fontSize: "1.1rem",
								fontWeight: "600",
								textAlign: "center",
								background: "#9e9e9ead",
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
							width: "80%",
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
								background: "#9e9e9ead",
							}}
						>
							10% de Descuento
						</Typography>
						<Typography
							style={{
								fontSize: "1.2rem",
								textAlign: "center",
								fontWeight: "600",
							}}
						>
							En tu primer compra!!!
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
