import { useState, useContext } from "react";
import { useNavigate } from "react-router";

import {
	AppBar,
	Box,
	Button,
	Container,
	InputBase,
	Menu,
	MenuItem,
	Toolbar,
	Tooltip,
	Typography,
	useTheme,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
// import { useTheme } from "@mui/material";

import { getAuth, signOut } from "firebase/auth";

import { BiCartDownload } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosSearch } from "react-icons/io";
import { TbLogout } from "react-icons/tb";

import { CartContext } from "../context/CartContext";
import { FirebaseContext } from "../context/FirebaseContext";

import { Cart } from "./Cart";

const pages = ["Inicio", "Productos"];
const settings = ["Historial de Compras", "Cerrar Sesión"];

export const NavBar = () => {
	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);
	const [state, setState] = useState({
		right: false,
	});
	const navigate = useNavigate();

	const theme = useTheme();
	// const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	const { quantity } = useContext(CartContext);

	const { user, handleFromLoginPage } = useContext(FirebaseContext);

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
	};

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const Search = styled("div")(({ theme }) => ({
		position: "relative",
		borderRadius: theme.shape.borderRadius,
		backgroundColor: alpha(theme.palette.common.white, 0.15),
		"&:hover": {
			backgroundColor: alpha(theme.palette.common.white, 0.25),
		},
		marginLeft: 0,
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			marginLeft: theme.spacing(1),
			width: "auto",
		},
	}));

	const StyledInputBase = styled(InputBase)(({ theme }) => ({
		color: "inherit",
		width: "100%",
		"& .MuiInputBase-input": {
			padding: theme.spacing(1, 1, 1, 0),
			// vertical padding + font size from searchIcon
			paddingLeft: ` calc(1em + ${theme.spacing(4)})`,
			transition: theme.transitions.create("width"),
			[theme.breakpoints.up("sm")]: {
				width: "12ch",
				"&:focus": {
					width: "20ch",
				},
			},
		},
	}));

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
				navigate("/");
		}
		handleCloseUserMenu(); // Cierra el menú después de la selección
	};

	const handleSignOut = () => {
		const auth = getAuth();
		signOut(auth)
			.then(() => {
				handleFromLoginPage("/", false);
				// navigate("/");
				// setFromLoginPage(false);
				console.log("sin bucle infinito");
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleNavMenuItemClick = (page) => {
		navigate(page === "Inicio" ? "/" : `/${page}`);
		handleCloseNavMenu();
	};

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Button sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
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
					<Typography>Bienvenido {user?.username}</Typography>

					<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
						<GiHamburgerMenu
							style={{ fontSize: "25px" }}
							onClick={handleOpenNavMenu}
						/>
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
							}}
						>
							{pages.map((page) => (
								<MenuItem
									key={page}
									onClick={() => handleNavMenuItemClick(page)}
								>
									<Typography textAlign="center">{page}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
					<Button sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
					<Typography
						variant="h5"
						// noWrap
						// component="a"
						// href="#app-bar-with-responsive-menu"
						sx={{
							mr: 2,
							display: { xs: "flex", md: "none" },
							flexGrow: 1,
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
						}}
					>
						BOUTIQUE
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
						{pages.map((page) => (
							<Button
								key={page}
								onClick={() => navigate(page === "Inicio" ? "/" : `/${page}`)}
								sx={{ my: 2, color: "white", display: "block" }}
							>
								{page}
							</Button>
						))}
						<Search sx={{ display: "flex", alignItems: "center" }}>
							<IoIosSearch style={{ fontSize: "30px" }} />
							<StyledInputBase
								placeholder="Buscar…"
								inputProps={{ "aria-label": "buscar" }}
							/>
						</Search>
					</Box>

					<Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
						<Tooltip title="El carrito se vaciara en 24 hs. o al finalizar la compra.">
							<Button onClick={toggleDrawer("right", true)} sx={{ p: 0 }}>
								<BiCartDownload style={{ fontSize: "30px", color: "white" }} />
								<span style={{ color: "pink" }}>
									{quantity > 0 ? quantity : ""}
								</span>
							</Button>
						</Tooltip>
						<Cart state={state} toggleDrawer={toggleDrawer} />
						<Box>
							{user ? (
								<Tooltip title="Mi usuario">
									<Button onClick={handleOpenUserMenu} sx={{ p: 0 }}>
										<FaUser style={{ fontSize: "20px", color: "white" }} />
										<Typography variant="p" sx={{ color: "white" }}>
											{user.username}
										</Typography>
									</Button>
								</Tooltip>
							) : (
								<Tooltip title="Inciar sesión">
									<Button
										onClick={() => {
											handleFromLoginPage("/Login", true);
											// navigate("/Login"), setFromLoginPage(true);
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
						<Tooltip title="Cerrar sesión">
							<Box>
								<Button onClick={handleSignOut} sx={{ p: 0 }}>
									<TbLogout style={{ fontSize: "27px", color: "white" }} />
								</Button>
							</Box>
						</Tooltip>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};
