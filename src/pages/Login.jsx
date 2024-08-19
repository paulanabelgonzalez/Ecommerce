import { useState, useContext } from "react";
import { useNavigate } from "react-router";

import { useFormik } from "formik";
import * as yup from "yup";

import {
	Button,
	Container,
	IconButton,
	InputAdornment,
	TextField,
	Typography,
} from "@mui/material";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { FaEyeSlash } from "react-icons/fa6";
import { IoEyeSharp } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

import { CartContext } from "../context/CartContext";
import { FirebaseContext } from "../context/FirebaseContext";

const validationSchema = yup.object({
	email: yup
		.string()
		.email("La dirección del correo no es valida.")
		.required("La dirección del correo es obligatoria."),
	password: yup
		.string()
		.min(8, "La contraseña debe tener un mínimo de 8 caracteres.")
		.required("La contraseña es obligatoria."),
});

export const Login = () => {
	const { cart } = useContext(CartContext);
	const { setUser, user, fromLoginPage, handleFromLoginPage } =
		useContext(FirebaseContext);

	const [typePassword, setTypePassword] = useState("password");

	const navigate = useNavigate();

	const auth = getAuth();

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},

		validationSchema: validationSchema,

		onSubmit: async (values) => {
			try {
				setUser(null);
				const userCredential = await signInWithEmailAndPassword(
					auth,
					values.email,
					values.password
				);

				const loggedInUser = userCredential.user;

				setUser({
					id: loggedInUser.uid,
					email: loggedInUser.email,
				});

				if (
					(fromLoginPage && cart.length === 0) ||
					(!fromLoginPage && cart.length === 0)
				) {
					navigate("/");
					console.log("si el carrito esta vacio va a home");
				} else if (fromLoginPage && cart.length !== 0) {
					navigate("/Productos");
					console.log("se logea antes de finalizar la compra");
				} else if (!fromLoginPage && cart.length !== 0) {
					navigate("/checkOut");
					console.log("se logea cuando finaliza la compra");
				}
			} catch (error) {
				console.error("Error al iniciar sesión:", error.code, error.message);
			}
		},
	});

	const handleEmailChange = (event) => {
		// Limpiar el usuario anterior al cambiar el campo de correo electrónico
		setUser(null);
		formik.handleChange(event);
	};

	return (
		<Container as="form" onSubmit={formik.handleSubmit}>
			<IoMdClose onClick={() => handleFromLoginPage("/", false)} />
			<TextField
				fullWidth
				id="email"
				name="email"
				label="Email"
				autoComplete="email"
				value={formik.values.email}
				onChange={handleEmailChange}
				onBlur={formik.handleBlur}
				error={formik.touched.email && Boolean(formik.errors.email)}
				helperText={formik.touched.email && formik.errors.email}
			/>

			<TextField
				fullWidth
				id="password"
				name="password"
				label="Password"
				autoComplete="password"
				type={typePassword}
				value={formik.values.password}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				error={formik.touched.password && Boolean(formik.errors.password)}
				helperText={formik.touched.password && formik.errors.password}
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							<IconButton
								aria-label="toggle password visibility"
								onClick={() =>
									setTypePassword(
										typePassword === "password" ? "text" : "password"
									)
								}
								edge="end"
							>
								{typePassword === "password" ? <IoEyeSharp /> : <FaEyeSlash />}
							</IconButton>
						</InputAdornment>
					),
				}}
			/>

			<Button color="primary" variant="contained" fullWidth type="submit">
				Iniciar sesión
			</Button>
			<Typography>
				Si no tienes cuenta,
				<Button onClick={() => navigate("/Register")}>REGISTRATE</Button>
			</Typography>
			<Typography>Bienvenido {user?.username}</Typography>
			<Typography>Id {user?.id}</Typography>
			<Typography>Email {user?.mail}</Typography>
		</Container>
	);
};
