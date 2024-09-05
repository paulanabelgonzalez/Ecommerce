import { createContext, useContext, useState } from "react";

import { useNavigate } from "react-router";

import { FirebaseContext } from "./FirebaseContext";

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
	const { products } = useContext(FirebaseContext);

	const navigate = useNavigate();

	const [filter, setFilter] = useState("");

	const [filteredProductsByCategory, setfilteredProductsByCategory] =
		useState(products);
	// const [filterFromCategory, setFilterFromCategory] = useState(false);

	console.log(filteredProductsByCategory);
	const handleCategory = (categoryName) => {
		console.log("Category - handleCategory llamado con:", categoryName);

		setfilteredProductsByCategory(
			products?.filter((product) => product.category === categoryName)
		);
		console.log(filteredProductsByCategory);
		// setFilterFromCategory(true);
		console.log("no me hace bucle el cambiar de categoria");
		navigate(`/Category/${categoryName}`);
	};

	return (
		<FilterContext.Provider
			value={{
				handleCategory,
				// filterFromCategory,
				// setFilterFromCategory,
				filteredProductsByCategory,
				filter,
				setFilter,
			}}
		>
			{children}
		</FilterContext.Provider>
	);
};
