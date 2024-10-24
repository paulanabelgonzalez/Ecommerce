import { useContext, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import {
	AppBar,
	Box,
	Button,
	Container,
	Menu,
	MenuItem,
	Toolbar,
	Tooltip,
	Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import "../../src/index.css";

import { getAuth, signOut } from "firebase/auth";

import { CartContext } from "../context/CartContext";
import { FirebaseContext } from "../context/FirebaseContext";

import { Cart } from "./Cart";

import backgroundButton from "../assets/imgBackground/backgroundMetal.jpg";
import backgroundHeader from "../assets/imgBackground/backgroundHeaderAndFooter.jpeg";
import backgroundMenu from "../assets/imgBackground/backgroundMenu.jpg";
import cart from "../assets/imgNav/cart.png";
import casco from "../assets/casco.png";
import logo from "../assets/logo.png";
import userImg from "../assets/imgNav/user.png";

const settings = ["Historial de Compras", "Cerrar Sesión"];

export const NavBar = () => {
	const { cartInProducts, handlePositionFixed, quantity } =
		useContext(CartContext);
	const { handleFromLoginPage, user } = useContext(FirebaseContext);

	const navigate = useNavigate();

	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);
	const [menuOpen, setMenuOpen] = useState(false);
	const [state, setState] = useState({
		right: false,
	});

	const toggleDrawer = (anchor, open) => (event) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}

		setState({ ...state, [anchor]: open });
	};

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
		setMenuOpen(true);
	};

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
		setMenuOpen(false);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleMenuItemClick = (page) => {
		switch (page) {
			case "Iniciar Sesión":
				navigate("/Login");
				break;
			case "Historial de Compras":
				navigate("/OrderHistory");
				break;
			case "Cerrar Sesión":
				handleSignOut();
				break;
			default:
				navigate(page === "Home" ? "/" : `/${page}`);
		}
		handleCloseUserMenu(); // Cierra el menú después de la selección
	};

	const handleSignOut = () => {
		const auth = getAuth();
		signOut(auth)
			.then(() => {
				handleFromLoginPage("/", false);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleNavMenuItemClick = (page) => {
		handleMenuItemClick(page);
		handleCloseNavMenu();
		if (page === "Productos") {
			handlePositionFixed(true);
		} else {
			handlePositionFixed(false);
		}
	};

	const buttonNavStyle = {
		width: { xs: "50px", md: "56px" },
		height: { xs: "50px", md: "56px" },
		border: " 3px solid #999999",
		borderRadius: "50%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		backgroundImage: `url(${backgroundButton})`,
		backgroundPosition: "right",
		position: "relative",
		"&:hover": {
			filter: "brightness(1.2)",
			boxShadow: "0 0 6px rgb(255 255 255)",
			transition: "all 0.3s ease",
		},
	};

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

	const pages = user
		? ["Home", "Productos", "Historial de Compras", "Cerrar Sesión"]
		: ["Home", "Productos", "Iniciar Sesión"];

	const CustomMenu = styled(Menu)({
		"& .MuiPaper-root": {
			width: "15%",
			marginTop: "70px",
			marginLeft: "70px",
			border: "3px solid #999999",
			color: "#525252",
			textAlign: "center",
			fontWeight: 600,
			background: "linear-gradient(216deg, #5e5b5b, #f2f2f2, #5e5b5b)",
			backgroundSize: "150% 150%",
			transition: "background-position 0.5s ease",
		},
	});

	return (
		<AppBar
			sx={{
				backgroundImage: `url(${backgroundHeader})`,
			}}
			position="static"
		>
			<Container sx={{ paddingRight: "5px" }}>
				<Toolbar
					disableGutters
					sx={{
						display: { xs: "flex" },
						justifyContent: "space-between",
					}}
				>
					{/* Desktop - Estilo para pantallas grandes */}
					<Box
						as="button"
						sx={{
							all: "unset",
							width: "173px",
							display: { xs: "none", md: "flex" },
							padding: "0px",
							borderRadius: "50%",
						}}
					>
						<img src={logo} alt="Logo Steel Nayev" style={{ width: "100%" }} />

						{/* <Typography>Bienvenido {user?.username}</Typography> para poner el nombre de usuario */}
					</Box>

					{/* Mobile - Estilo para pantallas pequeñas */}
					<Box sx={{ display: { xs: "flex", md: "none" } }}>
						<Box
							onClick={handleOpenNavMenu}
							sx={{
								display: "flex",
								flexDirection: "column",
								cursor: "pointer",
								position: "relative",
							}}
						>
							<span
								className="span-toggle"
								style={{
									transition: "all 0.3s ease",
									transform: menuOpen
										? "rotate(45deg) translate(5px, 4px)"
										: "none",
								}}
							></span>
							<span
								className="span-toggle"
								style={{
									transition: "all 0.3s ease",
									opacity: menuOpen ? 0 : 1,
								}}
							></span>
							<span
								className="span-toggle"
								style={{
									transformOrigin: "5px 0px",
									transition: "all 0.3s ease",
									transform: menuOpen
										? "rotate(-45deg) translate(4px, -2px)"
										: "none",
								}}
							></span>
						</Box>

						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: "block", md: "none" },
								position: "fixed",
								top: "29px",
								left: "0px",
								right: "0px",
								width: "100vw",
								height: "100vh",
								zIndex: 1,
								"& .MuiPaper-root": {
									width: "100vw",
									minWidth: "100vw",
									left: "0 !important",
									right: "0 !important",
									bottom: "0 !important",
									minHeight: "90%",
									height: "100vh",
									borderRadius: 0,
									boxShadow: "none",
									backgroundImage: `url(${backgroundMenu})`,
									backgroundSize: "cover",
									padding: 0,
									margin: 0,
								},
							}}
						>
							{pages.map((page) => (
								<MenuItem
									key={page}
									onClick={() => handleNavMenuItemClick(page)}
									sx={{
										display: "flex",
										justifyContent: "center",
										py: 2,
										color: "#ebebeb",
									}}
								>
									<Typography variant="h6" sx={{ fontWeight: "700" }}>
										{page}
									</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>

					{/* Mobile - Texto y logo para pantallas pequeñas */}
					<Box sx={{ display: { xs: "flex", md: "none" } }}>
						<Link
							to="/"
							style={{
								textDecoration: "none",
								paddingBlock: "8px",
							}}
						>
							<Box
								as="button"
								onClick={() => handlePositionFixed(false)}
								sx={{
									display: "flex",
									paddingBlock: "3px",
									background: "transparent",
									border: "none",
									padding: 0,
									textAlign: "center",
								}}
							>
								<img src={casco} style={{ width: "60px" }} alt="Logo" />
								<Typography
									variant="h5"
									sx={{
										display: "flex",
										flexDirection: "column",
										justifyContent: "center",
										fontWeight: "700",
									}}
								>
									<span
										className="silver-text"
										style={{
											display: "block",
											textAlign: "start",
										}}
									>
										NAYEV
									</span>
									<span className="silver-text">Steel Design</span>
								</Typography>
							</Box>
						</Link>
					</Box>

					{/* Desktop - Menú principal para pantallas grandes */}
					<Box
						sx={{
							display: { xs: "none", md: "flex" },
							gap: "36px",
						}}
					>
						{pages
							.filter((page) => page != "Iniciar Sesión")
							.map((page) => (
								<Button
									key={page}
									onClick={() => handleNavMenuItemClick(page)}
									sx={menuStyles}
								>
									{page}
								</Button>
							))}
					</Box>

					{/* Íconos y menú de usuario, visible en ambas vistas */}
					<Box
						sx={{
							flexGrow: 0,
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							minWidth: { xs: "64px", md: "140px" },
							minHeight: "50px",
							position: cartInProducts && "relative",
						}}
					>
						{/* Usuario logueado */}
						<Box sx={{ display: { xs: "none", md: "flex" } }}>
							{user ? (
								<Box>
									<Tooltip title="Mi usuario">
										<Button onClick={handleOpenUserMenu} sx={{ p: 0 }}>
											<Box sx={buttonNavStyle}>
												<img
													src={userImg}
													alt="logo de usuario"
													style={{ width: "75%" }}
												/>
											</Box>
										</Button>
									</Tooltip>
								</Box>
							) : (
								<Tooltip title="Inciar sesión">
									<Button
										onClick={() => {
											handleFromLoginPage("/Login", true);
										}}
									>
										<Box sx={buttonNavStyle}>
											<img
												src={userImg}
												alt="logo de usuario"
												style={{ width: "75%" }}
											/>
										</Box>
									</Button>
								</Tooltip>
							)}
						</Box>
						<CustomMenu
							PaperProps={{
								sx: {
									textDecoration: "none",
									width: "100%",
									marginTop: "20px",
									border: "3px solid #999999",
									color: "#525252",
									textAlign: "center",
									fontWeight: 600,
									background:
										"linear-gradient(120deg, #5e5b5b, #f2f2f2, #5e5b5b)",
									backgroundSize: "150% 150%",
									transition: "background-position 0.5s ease",
									"&:hover": {
										backgroundPosition: "100% 0",
									},
									"&:active": {
										boxShadow: "inset 0 4px 8px rgba(0, 0, 0, 0.5)",
									},
								},
							}}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							{settings.map((setting) => (
								<MenuItem
									key={setting}
									onClick={() => handleMenuItemClick(setting)}
								>
									<Typography textAlign="center">{setting}</Typography>
								</MenuItem>
							))}
						</CustomMenu>

						<Tooltip title="El carrito se vaciará en 7 días o al finalizar la compra.">
							<Button
								onClick={toggleDrawer("right", true)}
								sx={{
									p: 0,
									position: cartInProducts ? "fixed" : "relative",
									right: cartInProducts && {
										xs: "5px",
										sm: "30px",
										md: "3%",
										lg: "5%",
										xl: "16%",
									},

									zIndex: 1,
									transition: "all 0.3s ease",
									"&:hover": {
										boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
										transition: "all 0.3s ease",
									},
								}}
							>
								<Box sx={buttonNavStyle}>
									<img
										src={cart}
										alt="logo de carrito de compras"
										style={{
											width: "70%",
										}}
									/>
									{quantity > 0 ? (
										<span
											style={{
												color: "white",
												position: "absolute",
												top: "-3px",
												right: "-3px",
												border: "2px solid #4d4b4b",
												borderRadius: " 50%",
												width: "18px",
												height: "18px",
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
												fontSize: "10px",
												backgroundColor: "#292929",
											}}
										>
											{quantity > 0 ? quantity : ""}
										</span>
									) : (
										""
									)}
								</Box>
							</Button>
						</Tooltip>
						<Cart state={state} toggleDrawer={toggleDrawer} />
						<h1 style={{ fontSize: "0px" }}>Steel Nayev</h1>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};
