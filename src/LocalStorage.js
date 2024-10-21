export const getAddedProducts = () => {
	return JSON.parse(localStorage.getItem("cart")) || [];
};

export const setCartLS = (cart) => {
	localStorage.setItem("cart", JSON.stringify(cart));
	localStorage.setItem("cartTimestamp", Date.now());
};
