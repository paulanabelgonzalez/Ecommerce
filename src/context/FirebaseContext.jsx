import { createContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export const FirebaseContext = createContext();

export const FirebaseProvider = ({ children }) => {
	const [array, setArray] = useState([]);
	const [arrayUser, setArrayUser] = useState([]);
	useEffect(() => {
		const getCollection = async () => {
			const collectionReference = collection(db, "productos");
			console.log("sin bucle");
			const results = await getDocs(collectionReference);
			const newArray = results.docs.map((product) => ({
				...product.data(),
				id: product.id,
			}));
			setArray(newArray);
		};

		const getUser = async () => {
			const collectionReference2 = collection(db, "usuarios");
			console.log("sin bucle");
			const results = await getDocs(collectionReference2);
			const newArrayUser = results.docs.map((user) => ({
				...user.data(),
				id: user.id,
			}));
			setArrayUser(newArrayUser);
		};

		getCollection();
		getUser();
	}, []);
	return (
		<FirebaseContext.Provider value={{ array, arrayUser }}>
			{children}
		</FirebaseContext.Provider>
	);
};
