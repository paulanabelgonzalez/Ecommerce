import { createContext, useContext, useState } from "react";

import { useNavigate } from "react-router";

import { FirebaseContext } from "./FirebaseContext";
import { CartContext } from "./CartContext";

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
	const { handlePositionFixed } = useContext(CartContext);
	const { products } = useContext(FirebaseContext);

	const navigate = useNavigate();

	const [filter, setFilter] = useState("");
	const [filteredProductsByCategory, setfilteredProductsByCategory] =
		useState(products);

	const handleCategory = (categoryName) => {
		handlePositionFixed(true);
		setfilteredProductsByCategory(
			products?.filter((product) => product.category === categoryName)
		);
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
	};

	const categoryButtons = (currentCategory) => {
		const uniqueCategories = [
			...new Set(products.map((product) => product.category)),
		];
		return uniqueCategories.filter((category) => category !== currentCategory);
	};

	const handleCategoryClick = () => {
		setFilter("");
	};

	return (
		<FilterContext.Provider
			value={{
				categoryButtons,
				filter,
				filteredProductsByCategory,
				handleCategory,
				handleCategoryClick,
				setFilter,
				useFilter,
			}}
		>
			{children}
		</FilterContext.Provider>
	);
};
