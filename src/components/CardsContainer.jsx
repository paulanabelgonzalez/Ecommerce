import { useContext, useEffect } from "react";

import { Container } from "@mui/material";

import { FilterContext } from "../context/FilterContext";
import { FirebaseContext } from "../context/FirebaseContext";

import { Card } from "./Card";
import { Filters } from "./Filters";
import { Spinner } from "./Spinner";

export const CardsContainer = () => {
	const { filter, setFilter } = useContext(FilterContext);
	const { loading, setLoading } = useContext(FirebaseContext);

	useEffect(() => {
		setLoading(true);

		setTimeout(() => {
			setLoading(false);
		}, 3000);
	}, []);

	return (
		<Container>
			{loading ? (
				<Spinner />
			) : (
				<>
					<Filters setFilter={setFilter} />

					<Card filter={filter} />
				</>
			)}
		</Container>
	);
};
