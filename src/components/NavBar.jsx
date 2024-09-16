import { useContext, useEffect, useState } from "react";
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
	useTheme,
} from "@mui/material";

import "../../src/index.css";

import { getAuth, signOut } from "firebase/auth";

import { FaUser } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";

import { CartContext } from "../context/CartContext";
import { FirebaseContext } from "../context/FirebaseContext";

import { Cart } from "./Cart";

import backgroundButton from "../assets/imgBackground/backgroundMetal.jpg";
import backgroundHeader from "../assets/imgBackground/backgroundHeaderAndFooter.jpeg";
import backgroundMenu from "../assets/imgBackground/backgroundMenu.jpg";
import cart from "../assets/cart.png";
import casco from "../assets/casco.png";
import logo from "../assets/logo.png";

// const pages = [
// 	"Home",
// 	"Productos",
// 	"Iniciar Sesión",
// 	"Historial de Compras",
// 	"Cerrar Sesión",
// ];
const settings = ["Historial de Compras", "Cerrar Sesión"];

export const NavBar = () => {
	const { quantity, cartInProducts, handlePositionFixed } =
		useContext(CartContext);
	const { user, handleFromLoginPage } = useContext(FirebaseContext);

	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);
	const [menuOpen, setMenuOpen] = useState(false);
	const [state, setState] = useState({
		right: false,
	});

	const navigate = useNavigate();

	const theme = useTheme();
	// const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
				// navigate("/");
				navigate(page === "Home" ? "/" : `/${page}`);
		}
		handleCloseUserMenu(); // Cierra el menú después de la selección
	};

	const handleSignOut = () => {
		const auth = getAuth();
		signOut(auth)
			.then(() => {
				handleFromLoginPage("/", false);
				console.log("sin bucle infinito");
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleNavMenuItemClick = (page) => {
		handleMenuItemClick(page);
		// switch (page) {
		// 	case "Productos":
		// 		navigate("/Productos");
		// 		break;
		// 	case "Iniciar Sesión":
		// 		navigate("/Login");
		// 		break;
		// 	case "Historial de Compras":
		// 		navigate("/OrderHistory");
		// 		break;
		// 	case "Cerrar Sesión":
		// 		handleSignOut();
		// 		break;
		// 	default:
		// 		navigate("/");
		// }
		// navigate(page === "Home" ? "/" : `/${page}`);
		handleCloseNavMenu();
		if (page === "Productos") {
			handlePositionFixed(true);
		} else {
			handlePositionFixed(false);
		}
	};

	const pages = user
		? ["Home", "Productos", "Historial de Compras", "Cerrar Sesión"]
		: ["Home", "Productos", "Iniciar Sesión"];
	// console.log(cartInProducts);
	return (
		<AppBar
			sx={{ backgroundImage: `url(${backgroundHeader})` }}
			position="static"
		>
			<Container maxWidth="xl" sx={{ paddingRight: "5px" }}>
				<Toolbar
					disableGutters
					sx={{
						display: { xs: "flex" },
						justifyContent: !cartInProducts && "space-between",
						gap: cartInProducts && { xs: "8%" },
						// position: "relative", // Mantenemos relativo el toolbar
					}}
				>
					{/* Desktop - Estilo para pantallas grandes */}
					<Button sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
						<img width={"200px"} src={logo} alt="Logo Steel Nayev" />
						<Typography
							variant="h6"
							noWrap
							component="a"
							href="#app-bar-with-responsive-menu"
							sx={{
								mr: 2,
								display: { xs: "none", md: "flex" },
								fontFamily: "monospace",
								fontWeight: 700,
								letterSpacing: ".3rem",
								color: "inherit",
								textDecoration: "none",
							}}
						>
							BOUTIQUE
						</Typography>
						{/* <Typography>Bienvenido {user?.username}</Typography> para poner el nombre de usuario */}
					</Button>

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
										color: "#cecdcd",
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
					<Link
						to="/"
						style={{
							textDecoration: "none",
							display: { xs: "flex", md: "none" },
							paddingBlock: "8px", //si es el logo esta al principio
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
						{/* <Box sx={{ paddingBlock: "3px" }}>
							<Typography
								variant="h6"
								sx={{
									display: "flex",
									alignItems: "center",
									fontWeight: "700",
								}}
							>
								<span className="silver-text">NAYEV</span>
								Imagen entre los span 
								<img
									src={casco}
									alt="Logo"
									style={{
										// Para que se mantenga en su propio bloque
										margin: "5px auto", // Centra la imagen
										width: "50px", // Ajusta el tamaño de la imagen según lo que necesites
										height: "auto", // Mantiene la proporción
									}}
								/>
								<span className="silver-text">Steel Design</span>
							</Typography>
						</Box>*/}
					</Link>

					{/* Desktop - Menú principal para pantallas grandes */}
					<Box sx={{ display: { xs: "none", md: "flex" } }}>
						{pages.map((page) => (
							<Button
								key={page}
								onClick={() => navigate(page === "Home" ? "/" : `/${page}`)}
								sx={{ my: 2, color: "white", display: "block" }}
							>
								{page}
							</Button>
						))}
					</Box>

					{/* Íconos y menú de usuario, visible en ambas vistas */}
					<Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
						<Tooltip title="El carrito se vaciara en 24 hs. o al finalizar la compra.">
							<Button
								onClick={toggleDrawer("right", true)}
								sx={{
									p: 0,
									position: cartInProducts ? "fixed" : "relative",
									top: cartInProducts && "15px",
									right: cartInProducts && "5px",
									zIndex: 1,
									transition: "all 0.3s ease",
									"&:hover": {
										boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
										transition: "all 0.3s ease",
									},
								}}
							>
								<Box
									sx={{
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
									}}
								>
									<img
										src={cart}
										alt="logo de carrito de compras"
										style={{
											width: "70%",
											position: "relative",
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

						{/* Usuario logueado */}
						<Box sx={{ display: { xs: "none", md: "flex" } }}>
							{user ? (
								<Box>
									<Tooltip title="Mi usuario">
										<Button onClick={handleOpenUserMenu} sx={{ p: 0 }}>
											<FaUser style={{ fontSize: "20px", color: "white" }} />
											<Typography variant="p" sx={{ color: "white" }}>
												{user.username}
											</Typography>
										</Button>
									</Tooltip>
									<Tooltip title="Cerrar sesión">
										<Box>
											<Button onClick={handleSignOut} sx={{ p: 0 }}>
												<TbLogout
													style={{ fontSize: "27px", color: "white" }}
												/>
											</Button>
										</Box>
									</Tooltip>
								</Box>
							) : (
								<Tooltip title="Inciar sesión">
									<Button
										onClick={() => {
											handleFromLoginPage("/Login", true);
										}}
									>
										<FaUser style={{ fontSize: "20px", color: "white" }} />
										<Typography sx={{ color: "white" }}>
											Iniciar Sesión
										</Typography>
									</Button>
								</Tooltip>
							)}
						</Box>
						<Menu
							sx={{ mt: "45px" }}
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
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};
