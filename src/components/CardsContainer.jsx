import { useContext } from "react";

import { Container } from "@mui/material";

import { FilterContext } from "../context/FilterContext";

import { Card } from "./Card";
import { Filters } from "./Filters";

export const CardsContainer = () => {
	const { filter, setFilter } = useContext(FilterContext);

	return (
		<Container>
			<Filters setFilter={setFilter} />

			<Card filter={filter} />
		</Container>
	);
};
