export const getAddedProducts = () => {
	return JSON.parse(localStorage.getItem("cart")) || [];
};

export const setCartLS = (cart) => {
	localStorage.setItem("cart", JSON.stringify(cart));
	localStorage.setItem("cartTimestamp", Date.now());
};

export const clearCartAfterTimeout = (setCart) => {
	const cartTimestamp = localStorage.getItem("cartTimestamp");
	const oneMinuteInMs = 60 * 1000;
	// const oneDayInMs = 24 * 60 * 60 * 1000;

	if (cartTimestamp && Date.now() - cartTimestamp >= oneMinuteInMs) {
		localStorage.clear();
		setCart([]);
		console.log("Carrito y localStorage vaciados después de 1 minuto");
	}
};
