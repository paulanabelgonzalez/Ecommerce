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

	const stylesImg = {
		width: "100%",
		height: "auto",
		transition: "transform 0.3s ease-in-out",
		"&:hover": {
			transform: "scale(1.05)",
		},
	};

	const stylesSlideItem = {
		boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
		overflow: "hidden",
		transition: "box-shadow 0.3s ease-in-out",
		"&:hover": {
			boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
		},
	};

	return (
		<Box className="carrusel-container">
			<Slider {...settings}>
				<Box className="slide-item" sx={stylesSlideItem}>
					<Box
						component="img"
						src={product1}
						alt="img carousel"
						sx={stylesImg}
					/>
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
								background:
									"linear-gradient(to right,#9e9e9e, #0c2eec, #66129b)",
								WebkitBackgroundClip: "text",
								WebkitTextFillColor: "transparent",
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
				<Box className="slide-item" sx={stylesSlideItem}>
					<Box
						component="img"
						src={product2}
						alt="img carousel"
						sx={stylesImg}
					/>

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
							Envío Gratis...
						</Typography>
						<Typography
							style={{
								fontSize: "1.2rem",
								textAlign: "center",
								fontWeight: "600",
								background: "linear-gradient(to right, #0c2eec, #9e9e9e)",
								WebkitBackgroundClip: "text",
								WebkitTextFillColor: "transparent",
							}}
						>
							En tu primer compra!!!
						</Typography>
					</Box>
				</Box>
				{/* <Box className="slide-item">
					<img src={} alt="Carrito" />
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
							
						</Typography>
						<Typography
							variant="body1"
							style={{
								fontSize: "1.2rem",
								textAlign: "center",
								fontWeight: "500",
							}}
						>
							
						</Typography>
					</Box>
				</Box> */}
			</Slider>
		</Box>
	);
};
