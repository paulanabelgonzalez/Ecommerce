import { createContext, useContext, useState } from "react";

import { useNavigate } from "react-router";

import { FirebaseContext } from "./FirebaseContext";

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
	const { products } = useContext(FirebaseContext);

	const navigate = useNavigate();

	const [productsFilteredByCategory, setFilteredProductsByCategory] = useState(
		[]
	);
	const [filterFromCategory, setFilterFromCategory] = useState(false);

	console.log(productsFilteredByCategory);
	const handleCategory = (name) => {
		console.log("Category - handleCategory called with:", name);

		setFilteredProductsByCategory(
			products?.filter((product) => product.category === name)
		);
		console.log(productsFilteredByCategory);
		setFilterFromCategory(true);
		navigate("/Productos");
	};

	return (
		<FilterContext.Provider
			value={{
				handleCategory,
				filterFromCategory,
				setFilterFromCategory,
				productsFilteredByCategory,
			}}
		>
			{children}
		</FilterContext.Provider>
	);
};
