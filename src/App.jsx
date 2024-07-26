import { useContext } from "react";
import { FirebaseContext } from "./context/FirebaseContext";

function App() {
	const { array, arrayUser } = useContext(FirebaseContext);
	return (
		<>
			<h1>Lista de Productos</h1>
			<ul>
				{array.map((product) => (
					<li key={product.id}>
						<span>{product.nombre}</span>: {product.descripcion}
					</li>
				))}
			</ul>
			<h1>usuarios</h1>
			<ul>
				{arrayUser.map((user) => (
					<li key={user.id}>
						<span>{user.nombre}</span>: {user.email}
					</li>
				))}
			</ul>
		</>
	);
}

export default App;
