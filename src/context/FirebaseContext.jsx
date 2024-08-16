import { createContext, useEffect, useState } from "react";

import { db } from "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
	collection,
	doc,
	getDoc,
	onSnapshot,
	updateDoc,
	arrayUnion,
} from "firebase/firestore";

export const FirebaseContext = createContext();

export const FirebaseProvider = ({ children }) => {
	const [fromLoginPage, setFromLoginPage] = useState(false);
	const [products, setProducts] = useState([]);
	const [user, setUser] = useState(null);
	console.log(fromLoginPage);
	const auth = getAuth();

	useEffect(() => {
		const getProducts = () => {
			const collectionReference = collection(db, "products");
			onSnapshot(collectionReference, (snapshot) => {
				const productsArray = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setProducts(productsArray);
			});
		};

		getProducts();
	}, []);

	// const getUserInfo = async (uid) => {
	// 	try {
	// 		const docRef = doc(db, "users", uid);
	// 		const document = await getDoc(docRef);
	// 		return document.data();
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// };

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

	return (
		<FirebaseContext.Provider
			value={{
				products,
				user,
				setUser,
				finalizePurchase,
				fromLoginPage,
				setFromLoginPage,
			}}
		>
			{children}
		</FirebaseContext.Provider>
	);
};
