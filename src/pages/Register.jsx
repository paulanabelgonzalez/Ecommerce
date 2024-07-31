import { useFormik } from "formik";
import * as yup from "yup";
import {
	TextField,
	Button,
	Container,
	Typography,
	InputAdornment,
	IconButton,
} from "@mui/material";
import { FaEyeSlash } from "react-icons/fa6";
import { IoEyeSharp } from "react-icons/io5";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useState } from "react";
import { useNavigate } from "react-router";
import { IoMdClose } from "react-icons/io";

const validationSchema = yup.object({
	email: yup
		.string("Enter your email")
		.email("Enter a valid email")
		.required("Email is required"),
	password: yup
		.string("Enter your password")
		.min(8, "Password should be of minimum 8 characters length")
		.required("Password is required"),
});

export const Register = ({}) => {
	const navigate = useNavigate();
	const auth = getAuth();
	const [typePassword, setTypePassword] = useState("password");
	const formik = useFormik({
		initialValues: {
			nombre: "pepito",
			email: "foobar@example.com",
			password: "foobar",
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
					username: values.nombre,
					mail: values.email,
					orders: [],
					cart: [],
					id: userCredential.user.uid,
				};
				await setDoc(doc(db, "users", user.id), user);
				console.log(user);
				navigate("/");
			} catch (error) {
				console.error("Error during registration: ", error.code, error.message);
			}
		},
	});

	return (
		<Container as="form" onSubmit={formik.handleSubmit}>
			<IoMdClose onClick={() => navigate("/")} />
			<TextField
				fullWidth
				id="nombre"
				name="nombre"
				label="nombre"
				value={formik.values.nombre}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				error={formik.touched.nombre && Boolean(formik.errors.nombre)}
				helperText={formik.touched.nombre && formik.errors.nombre}
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
