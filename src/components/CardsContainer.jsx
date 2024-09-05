import { useContext } from "react";

import { Card } from "./Card";
import { Filters } from "./Filters";

import { FilterContext } from "../context/FilterContext";

export const CardsContainer = () => {
	// const [filter, setFilter] = useState("");
	const { filter, setFilter } = useContext(FilterContext);

	return (
		<>
			<Filters setFilter={setFilter} />

			<Card filter={filter} />
		</>
	);
};
