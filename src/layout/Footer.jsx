import { useContext } from "react";

import { Link } from "react-router-dom";

import {
	Box,
	Button,
	Container,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";

import { FaGithub, FaLinkedin } from "react-icons/fa";

import { CartContext } from "../context/CartContext";
import { FirebaseContext } from "../context/FirebaseContext";

import american from "../assets/imgFooter/american.png";
import backgroundFooter from "../assets/imgBackground/backgroundHeaderAndFooter.jpeg";
import mercadoPago from "../assets/imgFooter/mp.png";
import master from "../assets/imgFooter/mastercard.png";
import visa from "../assets/imgFooter/visa.png";
export const Footer = () => {
	const { handleNavigation } = useContext(CartContext);
	const { user } = useContext(FirebaseContext);

	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));

	const menuStyles = {
		color: "white",
		width: "auto",
		fontWeight: 700,
		fontSize: 14,
		padding: 0,
		minWidth: 0,
		display: "inline-block",
		position: "relative",
		"&:hover": {
			color: "#77787a",
		},
		"&::after": {
			content: `''`,
			position: "absolute",
			width: "100%",
			height: "2px",
			bottom: 0,
			left: 0,
			backgroundColor: "#77787a",
			transform: "scaleX(0)",
			transformOrigin: "bottom left",
			transition: "transform 0.3s ease",
		},
		"&:hover:after": {
			transform: "scaleX(1)",
			transformOrigin: "bottom left",
		},
	};

	const textStyles = {
		color: "white",
		fontWeight: 700,
		fontSize: "11px",
	};

	const linkStyles = {
		color: "white",
		marginTop: "1px",
		"&:hover": {
			color: "#77787a",
		},
		transition: "color 0.3s ease",
	};

	const hoverEffectStyles = {
		"&:hover": { color: "#795548b8" },
		"&:hover img": { transform: "scale(1.1)" },
	};

	return (
		<Container
			as="footer"
			position="static"
			sx={{
				minWidth: "100%",
				paddingInline: { xs: "10px", md: "16px" },
				textAlign: "center",
				backgroundImage: `url(${backgroundFooter})`,
			}}
		>
			<Box>
				<Box
					sx={{
						display: "flex",
						gap: { xs: "8px", sm: "15px" },
						marginBlock: { xs: "8px", sm: "15px" },
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Button sx={menuStyles} onClick={() => handleNavigation(false, "/")}>
						HOME
					</Button>

					<Button
						sx={menuStyles}
						onClick={() => handleNavigation(true, "/Productos")}
					>
						PRODUCTOS
					</Button>

					{!user && (
						<>
							<Button
								sx={menuStyles}
								onClick={() => handleNavigation(false, "/Login")}
							>
								INICIAR SESIÓN
							</Button>
							{isDesktop && (
								<Link to="/register" style={{ textDecoration: "none" }}>
									<Box sx={menuStyles}>CREAR CUENTA</Box>
								</Link>
							)}{" "}
						</>
					)}
				</Box>
			</Box>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					margin: "auto",
					width: "100%",
					maxWidth: "900px",
					gap: "8px",
					border: "2px solid #77787a",
					borderRadius: "10px",
					padding: { xs: "4px 8px" },
				}}
			>
				<Typography
					sx={{
						...textStyles,
						fontSize: "15px",
						textAlign: "center",
						textDecoration: "underline",
					}}
				>
					Medios de Pago
				</Typography>
				<Box
					sx={{
						display: "flex",
						flexDirection: { xs: "column", sm: "row" },
						gap: { xs: "16px", md: "24px" },
						justifyContent: "space-between",
					}}
				>
					<Box>
						<Typography
							sx={{
								...textStyles,
								textAlign: "center",
							}}
						>
							TRANFERENCIA BANCARIA
						</Typography>
						<Typography
							sx={{
								...textStyles,
								textAlign: { md: "start" },
								marginTop: "5px",
							}}
						>
							EFECTIVO
						</Typography>
					</Box>
					<Link to="/ruta-deseada" style={{ textDecoration: "none" }}>
						<Box
							sx={{
								...hoverEffectStyles,
								display: "flex",
								flexDirection: "column",
								justifyContent: "flex-start",
								alignItems: "center",
								gap: "7px",
								paddingTop: "2px",
							}}
						>
							<img
								src={mercadoPago}
								alt="logo mercadoPago"
								style={{
									width: "50px",
									height: "30px",
									transition: "transform 0.3s ease",
								}}
							/>

							<Typography sx={{ ...textStyles }}>MERCADO PAGO</Typography>
						</Box>
					</Link>
					<Link to="/ruta-deseada" style={{ textDecoration: "none" }}>
						<Box sx={{ ...hoverEffectStyles }}>
							<Typography
								sx={{
									...textStyles,
									textAlign: "center",
								}}
							>
								TARJETAS DE CRÉDITO
							</Typography>
							<Box
								sx={{
									display: "flex",
									alignItems: "center",
									gap: "5px",
								}}
							>
								<img
									src={visa}
									alt="logo visa"
									style={{
										height: "50px",
										transition: "transform 0.3s ease",
									}}
								/>
								<img
									src={master}
									alt="logo masterCard"
									style={{
										height: "32px",
										transition: "transform 0.3s ease",
									}}
								/>
								<img
									src={american}
									alt="logo amrican express"
									style={{
										height: "51px",
										transition: "transform 0.3s ease",
									}}
								/>
							</Box>
						</Box>
					</Link>
				</Box>
			</Box>
			<Box
				sx={{
					display: "flex",
					margin: "7px auto",
					alignItems: "flex-start",
					justifyContent: "center",
					gap: 2,
				}}
			>
				<Typography variant="subtitle1" color="white" component="div">
					© Agosto 2024 Paula Gonzalez
				</Typography>
				<Box
					component="a"
					href="https://github.com/paulanabelgonzalez"
					target="black"
					sx={{
						...linkStyles,
						fontSize: "21px",
					}}
				>
					<FaGithub />
				</Box>
				<Box
					component="a"
					href=""
					target="black"
					sx={{
						...linkStyles,
						fontSize: "22px",
					}}
				>
					<FaLinkedin />
				</Box>
			</Box>
		</Container>
	);
};
