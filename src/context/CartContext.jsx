import { createContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { getAddedProducts, setCartLS } from "../LocalStorage";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const [cart, setCart] = useState(getAddedProducts());
	const [cartInProducts, setCartInProducts] = useState(false);
	const [quantity, setQuantity] = useState(1);
	const [subtotal, setSubtotal] = useState(0);

	const navigate = useNavigate();

	useEffect(() => {
		checkCartExpiration();
	}, []);

	useEffect(() => {
		const initialSubtotal = cart.reduce((acc, product) => {
			const price =
				isNaN(product.price) || product.price === "Consultar precio"
					? 0
					: product.price;
			return acc + (product.quantity > 0 ? price * product.quantity : 0);
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

	const checkCartExpiration = () => {
		const cartDate = localStorage.getItem("cartDate");

		if (cartDate) {
			const currentDate = new Date();
			const savedDate = new Date(cartDate);

			// Calcula la diferencia en milisegundos y lo convierte en días
			const differenceInDays =
				(currentDate - savedDate) / (1000 * 60 * 60 * 24);

			if (differenceInDays > 7) {
				handleDeleteAll();
				console.log("Carrito eliminado después de 7 días.");
			}
		}
	};

	const currentCart = (newCart) => {
		setCart(newCart);
		setCartLS(newCart);
		// Guarda la fecha actual en el localStorage
		localStorage.setItem("cartDate", new Date().toISOString());
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

	const formatNumber = (number) => {
		return new Intl.NumberFormat("es-ES", {
			style: "decimal",
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(number);
	};

	const handlePositionFixed = (boolean) => {
		setCartInProducts(boolean);
	};

	const handleNavigation = (boolean, page) => {
		handlePositionFixed(boolean);
		navigate(page);
	};

	return (
		<CartContext.Provider
			value={{
				cart,
				cartInProducts,
				formatNumber,
				handleAdd,
				handleAddQuantity,
				handleDelete,
				handleDeleteAll,
				handleNavigation,
				handlePositionFixed,
				handleRemoveQuantity,
				quantity,
				setCart,
				setCartInProducts,
				subtotal,
				subTotalProduct,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};
