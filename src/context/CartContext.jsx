import { createContext, useState } from "react";

import { getAddedProducts } from "../LocalStorage";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const [cart, setCart] = useState(getAddedProducts("cart") || []);

	const handleAdd = (product) => {
		const newCart = [...cart, product];
		setCart(newCart);
		console.log("carrito añadido", newCart);
	};

	const handleDelete = (productToDelete) => {
		const deletedProduct = cart.filter(
			(product) => product.id !== productToDelete.id
		);
		setCart(deletedProduct);
	};
	return (
		<CartContext.Provider value={{ handleAdd, cart, handleDelete }}>
			{children}
		</CartContext.Provider>
	);
};
