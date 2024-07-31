// import { useContext } from "react";
// import { FirebaseContext } from "./context/FirebaseContext";
import { Footer } from "./layout/Footer";
import { Header } from "./layout/Header";
import { Main } from "./layout/Main";

function App() {
	// const { array, arrayUser } = useContext(FirebaseContext);
	return (
		<>
			<Header />
			<Main />
			<Footer />
		</>
	);
}

export default App;
