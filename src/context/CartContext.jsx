import { createContext, useEffect, useState } from "react";

import {
	clearCartAfterTimeout,
	getAddedProducts,
	setCartLS,
} from "../LocalStorage";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const [cart, setCart] = useState(getAddedProducts());
	const [quantity, setQuantity] = useState(1);
	const [subtotal, setSubtotal] = useState(0);

	useEffect(() => {
		const intervalId = setInterval(() => {
			clearCartAfterTimeout(setCart);
		}, 60 * 1000);

		return () => clearInterval(intervalId); // Limpiar el intervalo al desmontar
	}, []);

	useEffect(() => {
		const initialSubtotal = cart.reduce((acc, product) => {
			return (
				acc + (product.quantity > 0 ? product.price * product.quantity : 0)
			);
		}, 0);
		setSubtotal(initialSubtotal);
		console.log(initialSubtotal);
	}, [cart]);

	useEffect(() => {
		const initialNotification = cart.reduce((acc, product) => {
			return acc + (product.quantity > 0 ? product.quantity : 0);
		}, 0);
		setQuantity(initialNotification);
		console.log(initialNotification);
	}, [cart]);

	const currentCart = (newCart) => {
		setCart(newCart);
		setCartLS(newCart);
	};

	const handleAdd = (product) => {
		const existingProduct = cart.find((item) => item.id === product.id);
		const newCart = existingProduct
			? cart.map((item) =>
					item.id === product.id
						? { ...item, quantity: item.quantity + 1 }
						: item
			  )
			: [...cart, { ...product, quantity: 1 }];

		currentCart(newCart);
		console.log("Carrito añadido", cart);
	};

	const handleDelete = (productToDelete) => {
		const deletedProduct = cart.filter(
			(product) => product.id !== productToDelete.id
		);
		currentCart(deletedProduct);
	};

	const handleDeleteAll = () => {
		setCart([]);
		localStorage.clear();
	};

	const handleAddQuantity = (productToAdd) => {
		const newCart = cart?.map((cartProduct) =>
			cartProduct.id === productToAdd
				? { ...cartProduct, quantity: (cartProduct.quantity || 0) + 1 }
				: cartProduct
		);
		currentCart(newCart);
		console.log(newCart, quantity);
	};

	const handleRemoveQuantity = (productToRemove) => {
		const newCart = cart.map((cartProduct) => {
			if (cartProduct.id === productToRemove) {
				const cartRemove = (cartProduct.quantity || 0) - 1;
				return {
					...cartProduct,
					quantity: cartRemove > 0 ? cartRemove : 1,
				};
			}
			return cartProduct;
		});
		currentCart(newCart);
		console.log(newCart, quantity);
	};

	const subTotalProduct = (product) => {
		return product.price * product.quantity;
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
				subTotalProduct,
				subtotal,
				setCart,
				handleDeleteAll,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};
