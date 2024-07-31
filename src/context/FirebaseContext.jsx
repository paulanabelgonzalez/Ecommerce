import { createContext, useEffect, useState } from "react";
import { collection, onSnapshot, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

export const FirebaseContext = createContext();

export const FirebaseProvider = ({ children }) => {
	const [products, setProducts] = useState([]);

	const [user, setUser] = useState(null);
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

	const loginUser = async (data) => {
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				data.email,
				data.password
			);
			const loggedInUser = userCredential.user;
			console.log(data);
			// Check if the user exists in Firestore
			const userDocRef = doc(db, "users", loggedInUser.uid);
			const userDoc = await getDoc(userDocRef);

			if (userDoc.exists()) {
				// Retrieve user data from Firestore
				const userData = {
					id: loggedInUser.uid,
					email: loggedInUser.email,
					username: userDoc.data().username,
					descripcion: userDoc.data().descripcion,
					// Add more fields as needed
				};
				setUser(userData);
				console.log("User logged in:", userData.username);
			} else {
				console.error("User data not found in Firestore");
			}
		} catch (error) {
			alert("Error during login:", error.code, error.message);
		}
	};
	return (
		<FirebaseContext.Provider value={{ products, user, setUser, loginUser }}>
			{children}
		</FirebaseContext.Provider>
	);
};
