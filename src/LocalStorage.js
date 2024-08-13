export const getAddedProducts = () => {
	return JSON.parse(localStorage.getItem("cart"));
};
export const setCartLS = (cart) => {
	localStorage.setItem("cart", cart);
};
