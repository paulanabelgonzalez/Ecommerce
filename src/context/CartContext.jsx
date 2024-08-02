import { createContext, useContext, useState } from "react";

import { getAddedProducts } from "../LocalStorage";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
	// const { products } = useContext(FirebaseContext);
	const [cart, setCart] = useState(getAddedProducts("cart") || []);
	const [quantity, setQuantity] = useState(1);

	const handleAdd = (product) => {
		const existingProduct = cart.find((item) => item.id === product.id);
		if (existingProduct) {
			const updatedCart = cart.map((item) =>
				item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
			);
			setCart(updatedCart);
		} else {
			setCart([...cart, { ...product, quantity: 1 }]);
		}
		console.log("Carrito añadido", cart);
	};

	const handleDelete = (productToDelete) => {
		const deletedProduct = cart.filter(
			(product) => product.id !== productToDelete.id
		);
		setCart(deletedProduct);
	};

	const handleAddQuantity = (productToAdd) => {
		const newCart = cart.map((cartProduct) =>
			cartProduct.id === productToAdd
				? { ...cartProduct, quantity: (cartProduct.quantity || 0) + 1 }
				: cartProduct
		);
		setCart(newCart);
		console.log(newCart, quantity);
	};

	const handleRemoveQuantity = () => {
		if (quantity > 0) {
			setQuantity((quantity) => quantity - 1);
		}
	};
	return (
		<CartContext.Provider
			value={{
				handleAdd,
				cart,
				handleDelete,
				handleAddQuantity,
				quantity,
				handleRemoveQuantity,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};
