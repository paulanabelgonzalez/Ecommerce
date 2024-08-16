import { useContext, useState } from "react";
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

import { db } from "../../firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { FaEyeSlash } from "react-icons/fa6";
import { IoEyeSharp } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

import { FirebaseContext } from "../context/FirebaseContext";

const validationSchema = yup.object({
	name: yup
		.string()
		.min(3, "El nombre debe tener un mínimo de 3 caracteres.")
		.required(" El nombre es obligatorio."),
	email: yup
		.string()
		.email("La dirección del correo no es valida.")
		.required("La dirección del correo es obligatoria."),
	password: yup
		.string()
		.min(8, "La contraseña debe tener un mínimo de 8 caracteres.")
		.required("La contraseña es obligatoria."),
});

export const Register = ({}) => {
	const { setModal } = useContext(FirebaseContext);

	const [typePassword, setTypePassword] = useState("password");

	const navigate = useNavigate();

	const auth = getAuth();

	const formik = useFormik({
		initialValues: {
			name: "Ingresa un nombre",
			email: "Ingresa tu correo electrónico",
			password: "contraseña 123",
			address: "Opcional,solo para envios",
		},

		validationSchema: validationSchema,

		onSubmit: async (values) => {
			try {
				const userCredential = await createUserWithEmailAndPassword(
					auth,
					values.email,
					values.password
				);

				const user = {
					username: values.name,
					mail: values.email,
					orders: [],
					id: userCredential.user.uid,
				};
				await setDoc(doc(db, "users", user.id), user);
				console.log(user);
				setModal(0);
				navigate("/modal");
			} catch (error) {
				console.error("Error durante el registro: ", error.code, error.message);
			}
		},
	});

	return (
		<Container as="form" onSubmit={formik.handleSubmit}>
			<IoMdClose onClick={() => navigate("/")} />
			<TextField
				fullWidth
				id="nombre"
				name="name"
				label="Nombre"
				value={formik.values.name}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				error={formik.touched.name && Boolean(formik.errors.name)}
				helperText={formik.touched.name && formik.errors.name}
			/>
			<TextField
				fullWidth
				id="emailRegistro"
				name="email"
				label="Email"
				value={formik.values.email}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				error={formik.touched.email && Boolean(formik.errors.email)}
				helperText={formik.touched.email && formik.errors.email}
			/>
			<TextField
				fullWidth
				id="passwordRegistro"
				name="password"
				label="Password"
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
			<TextField
				fullWidth
				id="address"
				name="address"
				label="Dirección"
				value={formik.values.address}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				error={formik.touched.address && Boolean(formik.errors.address)}
				helperText={formik.touched.address && formik.errors.address}
			/>
			<Button color="primary" variant="contained" fullWidth type="submit">
				Registrarse
			</Button>
			<Typography>
				Si ya tienes cuenta,{" "}
				<Button onClick={() => navigate("/Login")}>inicia sesión</Button>
			</Typography>
		</Container>
	);
};
