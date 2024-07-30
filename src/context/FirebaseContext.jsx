import { createContext, useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

export const FirebaseContext = createContext();

export const FirebaseProvider = ({ children }) => {
	// const [arrayUser, setArrayUser] = useState([]);
	const [products, setProducts] = useState([]);

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

		// 	const getUser = async () => {
		// 		const collectionReference2 = collection(db, "usuarios");
		// 		console.log("sin bucle");
		// 		const results = await getDocs(collectionReference2);
		// 		const newArrayUser = results.docs.map((user) => ({
		// 			...user.data(),
		// 			id: user.id,
		// 		}));
		// 		setArrayUser(newArrayUser);
		// 	};

		// getCollection();
		// 	getUser();
		getProducts();
	}, []);
	return (
		<FirebaseContext.Provider value={{ products }}>
			{children}
		</FirebaseContext.Provider>
	);
};
