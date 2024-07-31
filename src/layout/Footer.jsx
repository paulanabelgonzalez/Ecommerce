import AppBar from "@mui/material/AppBar";
import { Typography, Container } from "@mui/material";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export const Footer = () => {
	return (
		<AppBar
			position="static"
			sx={{ width: "100%", textAlign: "center", marginTop: "20px" }}
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
		</AppBar>
	);
};
