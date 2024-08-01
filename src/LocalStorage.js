export const getAddedProducts = () => {
	return JSON.parse(localStorage.getItem("cart"));
};
export const setCart = (cart) => {
	localStorage.setItem("cart", cart);
};
