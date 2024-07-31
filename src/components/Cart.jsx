import React from "react";

import { Box, Button, Drawer } from "@mui/material";

import { useNavigate } from "react-router";

export const Cart = ({ state, toggleDrawer }) => {
	const navigate = useNavigate();

	const list = (anchor) => (
		<Box
			sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
			role="presentation"
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}
		></Box>
	);

	return (
		<div>
			{["right"]?.map((anchor) => (
				<React.Fragment key={anchor}>
					<Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
					<Drawer
						anchor={anchor}
						open={state[anchor]}
						onClose={toggleDrawer(anchor, false)}
					>
						{list(anchor)}
						<Button onClick={() => navigate("Login")}>Comprar</Button>
					</Drawer>
				</React.Fragment>
			))}
		</div>
	);
};
