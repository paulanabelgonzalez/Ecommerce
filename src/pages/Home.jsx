import { useContext } from "react";

import { Box } from "@mui/material";

import { FirebaseContext } from "../context/FirebaseContext";

import { Carousel } from "../components/Carousel";
import { ListCategories } from "../components/ListCategories";

import { Spinner } from "../components/Spinner";

export const Home = () => {
	const { loading } = useContext(FirebaseContext);

	return (
		<>
			{loading ? (
				<Spinner />
			) : (
				<>
					<Carousel />
					<Box>
						<ListCategories />
					</Box>
				</>
			)}
		</>
	);
};
