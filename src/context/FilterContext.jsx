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

	console.log(filteredProductsByCategory);

	const handleCategory = (categoryName) => {
		setfilteredProductsByCategory(
			products?.filter((product) => product.category === categoryName)
		);
		console.log(filteredProductsByCategory);

		console.log("no me hace bucle el cambiar de categoria");
		navigate(`/Category/${categoryName}`);
	};

	const useFilter = (array, filter) => {
		return filter
			? array.filter(
					(product) =>
						product.name.toLowerCase().includes(filter.toLowerCase()) ||
						product.category.toLowerCase().includes(filter.toLowerCase())
			  )
			: array;
		// setFilteredProducts(filtered);
		// console.log(filteredProducts);
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
				useFilter,
			}}
		>
			{children}
		</FilterContext.Provider>
	);
};
