import { useState, useContext } from "react";

import {
	AppBar,
	Avatar,
	Box,
	Button,
	Container,
	InputBase,
	Menu,
	MenuItem,
	Toolbar,
	Tooltip,
	Typography,
} from "@mui/material";

import { styled, alpha } from "@mui/material/styles";

import { GiHamburgerMenu } from "react-icons/gi";
import { BiCartDownload } from "react-icons/bi";
import { IoIosSearch } from "react-icons/io";

import { CartContext } from "../context/CartContext";
import { FirebaseContext } from "../context/FirebaseContext";

import { Cart } from "./Cart";

const pages = ["Productos"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

export const NavBar = () => {
	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);
	const [state, setState] = useState({
		right: false,
	});

	const { quantity } = useContext(CartContext);

	const { user } = useContext(FirebaseContext);

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
								<MenuItem key={page} onClick={handleCloseNavMenu}>
									<Typography textAlign="center">{page}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
					<Button sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
					<Typography
						variant="h5"
						noWrap
						component="a"
						href="#app-bar-with-responsive-menu"
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
								onClick={handleCloseNavMenu}
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
						<Box sx={{ display: "flex" }}>
							<BiCartDownload
								style={{ fontSize: "30px" }}
								onClick={toggleDrawer("right", true)}
							/>
							<span style={{ color: "pink" }}>
								{quantity > 0 ? quantity : ""}
							</span>
						</Box>
						<Cart state={state} toggleDrawer={toggleDrawer} />
						<Tooltip title="Open settings">
							<Button onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								<Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
							</Button>
						</Tooltip>
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
								<MenuItem key={setting} onClick={handleCloseUserMenu}>
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
