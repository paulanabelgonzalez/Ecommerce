import { useNavigate } from "react-router";

import {
	Box,
	Button,
	Container,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";

import { FaGithub, FaLinkedin } from "react-icons/fa";

import american from "../assets/imgFooter/american.png";
import backgroundFooter from "../assets/imgBackground/backgroundFooter.jpeg";
import mercadoPago from "../assets/imgFooter/mp.png";
import master from "../assets/imgFooter/mastercard.png";
import visa from "../assets/imgFooter/visa.png";

export const Footer = () => {
	const navigate = useNavigate();
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
		textDecoration: "none",
		"&:hover": {
			color: "#77787a",
		},
		transition: "color 0.3s ease",
	};

	const hoverEffectStyles = {
		"&:hover": { color: "#795548b8" },
		"&:hover img": { transform: "scale(1.1)" },
	};

	const imgStyles = {
		whiteSpace: "100%",
		transition: "transform 0.3s ease",
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
					}}
				>
					<Button onClick={() => navigate("/")} sx={menuStyles}>
						Inicio
					</Button>
					<Button onClick={() => navigate("/Productos")} sx={menuStyles}>
						Productos
					</Button>
					<Button onClick={() => navigate("/Login")} sx={menuStyles}>
						Iniciar Sesión
					</Button>
					{isDesktop && (
						<Button onClick={() => navigate("/Register")} sx={menuStyles}>
							Crear cuenta
						</Button>
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
								paddingTop: "6px",
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
					<Button
						sx={{
							...hoverEffectStyles,
							display: "flex",
							flexDirection: "column",
							justifyContent: " flex-start",
							gap: "7px",
						}}
					>
						<img
							src={mercadoPago}
							alt="logo mercadoPago"
							style={{
								...imgStyles,
								height: "30px",
							}}
						/>

						<Typography sx={{ ...textStyles }}>MERCADO PAGO</Typography>
					</Button>
					<Button sx={{ ...hoverEffectStyles }}>
						<Box>
							<Typography
								sx={{
									...textStyles,
									textAlign: "center",
								}}
							>
								Tarjetas de Crédito
							</Typography>
							<Box
								sx={{
									display: "flex",
									alignItems: "center",
									gap: { sm: "5px" },
								}}
							>
								<img
									src={visa}
									alt="logo visa"
									style={{
										...imgStyles,
										height: "50px",
									}}
								/>
								<img
									src={master}
									alt="logo masterCard"
									style={{
										...imgStyles,
										height: "32px",
									}}
								/>
								<img
									src={american}
									alt="logo amrican express"
									style={{
										...imgStyles,
										height: "51px",
									}}
								/>
							</Box>
						</Box>
					</Button>
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
