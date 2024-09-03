import { useState } from "react";

import { Card } from "./Card";
import { Filters } from "./Filters";

export const CardsContainer = () => {
	const [filter, setFilter] = useState("");

	return (
		<>
			<Filters setFilter={setFilter} />

			<Card filter={filter} />
		</>
	);
};
