import { useState } from "react";

import { Box, Typography } from "@mui/material";

import { Carousel } from "../components/Carousel";
import { ListCategories } from "../components/ListCategories";

import videoHome from "../../src/assets/videoHome.mp4";

export const Home = () => {
	const [videoError, setVideoError] = useState(false);

	const videoStyles = {
		width: "100%",
		height: "100%",
		objectFit: "cover",
	};

	return (
		<>
			{/* <Box sx={{ maxWidth: "300px", margin: "auto" }}>
				<img
					width="300px"
					src="https://www.gifsanimados.org/data/media/1829/soldador-imagen-animada-0011.gif"
					border="0"
					alt="soldador-imagen-animada-0011"
				/>
			</Box> */}

			{/* <Carousel /> */}
			{/* <Box
				sx={{
					position: "relative",
					width: "100%",
					height: {
						xs: "400px",
						md: "600px",
					},
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					overflow: "hidden",
					marginBlock: "20px",
				}}
			>
				{!videoError && (
					<>
						<Box
							sx={{
								position: "absolute",
								top: "50%",
								left: "50%",
								transform: "translate(-50%, -50%)",
								width: "100vw",
								height: "auto",
								zIndex: 1,
								opacity: 0.7,
								filter: "blur(5px)",
								objectFit: "cover",
							}}
						>
							<video
								autoPlay
								loop
								muted
								style={videoStyles}
								onError={() => setVideoError(true)}
							>
								<source src={videoHome} type="video/mp4" />
							</video>
						</Box>

						<Box
							sx={{
								position: "relative",
								zIndex: 2,
								width: "100%",
								maxWidth: "1100px",
								height: "400px",
								objectFit: "cover",
								boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
							}}
						>
							<video
								autoPlay
								loop
								muted
								style={videoStyles}
								onError={() => setVideoError(true)}
							>
								<source src={videoHome} type="video/mp4" />
							</video>
						</Box>
					</>
				)}
			</Box> */}
			<Box>
				<ListCategories />
			</Box>
		</>
	);
};
