import { createContext, useEffect, useState } from "react";

import { useNavigate } from "react-router";

import { db } from "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
	arrayUnion,
	collection,
	doc,
	onSnapshot,
	updateDoc,
} from "firebase/firestore";

export const FirebaseContext = createContext();

export const FirebaseProvider = ({ children }) => {
	const auth = getAuth();

	const navigate = useNavigate();

	const [fromLoginPage, setFromLoginPage] = useState(false);
	const [loading, setLoading] = useState(true);
	const [modal, setModal] = useState(0);
	const [products, setProducts] = useState([]);
	const [user, setUser] = useState(null);

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false);
		}, 3000);

		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		const getProducts = () => {
			setLoading(true);

			const collectionReference = collection(db, "products");
			onSnapshot(collectionReference, (snapshot) => {
				const productsArray = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setProducts(productsArray);

				setTimeout(() => {
					setLoading(false);
				}, 3000);
			});
		};

		getProducts();
	}, []);

	useEffect(() => {
		const isAuth = () => {
			onAuthStateChanged(auth, async (user) => {
				try {
					if (user) {
						const uid = user.uid;
						const userDocRef = doc(db, "users", uid);
						onSnapshot(userDocRef, (doc) => {
							const userInfo = doc.data();
							setUser({ ...user, ...userInfo });
						});
					} else {
						setUser(null);
					}
				} catch (error) {
					setUser(null);
					console.error("Error during authentication:", error);
				}
			});
		};
		isAuth();
	}, []);

	const finalizePurchase = async (cart, subtotal) => {
		if (user && user.uid) {
			try {
				const userDocRef = doc(db, "users", user.uid);
				await updateDoc(userDocRef, {
					orders: arrayUnion({
						order: [...cart],
						date: new Date().toLocaleString(),
						total: subtotal,
					}),
				});

				console.log("Compra finalizada y guardada en Firestore.");
			} catch (error) {
				console.error("Error al finalizar la compra:", error);
			}
		} else {
			console.error("Usuario no autenticado.");
		}
	};

	const handleFromLoginPage = (page, boolean) => {
		navigate(page);
		setFromLoginPage(boolean);
		console.log(fromLoginPage);
	};

	const handleGoBack = () => {
		navigate(-1);
	};

	return (
		<FirebaseContext.Provider
			value={{
				products,
				user,
				setUser,
				finalizePurchase,
				fromLoginPage,
				handleFromLoginPage,
				handleGoBack,
				loading,
				modal,
				setLoading,
				setModal,
			}}
		>
			{children}
		</FirebaseContext.Provider>
	);
};
