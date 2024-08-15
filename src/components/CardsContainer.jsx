import { Card } from "./Card";
import { useState } from "react";
import { Filters } from "./Filters";
import { Carousel } from "./Carousel";

export const CardsContainer = () => {
	const [filter, setFilter] = useState("");
	return (
		<>
			<Filters setFilter={setFilter} />

			<Carousel />

			<Card filter={filter} />
		</>
	);
};
