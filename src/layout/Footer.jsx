import { Typography, Container } from "@mui/material";

import { FaGithub, FaLinkedin } from "react-icons/fa";

export const Footer = () => {
	return (
		<Container
			as="footer"
			position="static"
			sx={{
				backgroundColor: "#1976d2",
				minWidth: "100%",
				textAlign: "center",
			}}
		>
			<Typography variant="subtitle1" color="white" component="div">
				COPYRIGHT
			</Typography>
			<Container>
				<a href="">
					<FaGithub />
				</a>
				<a href="">
					<FaLinkedin />
				</a>
			</Container>
		</Container>
	);
};
