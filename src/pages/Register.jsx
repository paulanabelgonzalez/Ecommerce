import { useContext, useState } from "react";

import { useNavigate } from "react-router";

import { useFormik } from "formik";
import * as yup from "yup";

import {
	Box,
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
	const { setModal, handleFromLoginPage } = useContext(FirebaseContext);

	const auth = getAuth();

	const navigate = useNavigate();

	const [typePassword, setTypePassword] = useState("password");

	const formik = useFormik({
		initialValues: {
			name: "",
			email: "",
			password: "",
			address: "",
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
				setModal(0);
				navigate("/modal");
			} catch (error) {
				console.error("Error durante el registro: ", error.code, error.message);

				if (error.code === "auth/email-already-in-use") {
					setModal(3);
					navigate("/modal");
				} else if (error.code === "auth/invalid-email") {
					setModal(4);
					navigate("/modal");
				} else {
					console.error(
						"Error durante el registro: ",
						error.code,
						error.message
					);
				}
			}
		},
	});

	const boxInput = { width: "95%", maxWidth: "1100px", margin: "20px auto" };

	const inputProps = {
		color: "white",
		backgroundColor: "#9e9e9ead",
		boxShadow: "0 0 10px black",

		"&:focus-within .MuiOutlinedInput-notchedOutline": {
			borderColor: "#faf6f6eb",
			boxShadow: "0 0 10px white",
		},
	};

	const InputLabelProps = {
		color: "black",
		"&.Mui-focused": {
			color: "white",
		},
	};

	return (
		<Container maxWidth="md" as="form" onSubmit={formik.handleSubmit}>
			<Box sx={{ textAlign: "end", paddingBlock: "4px" }}>
				<Button
					onClick={() => handleFromLoginPage(-1, false)}
					sx={{
						textDecoration: "none",
						color: "#fff",
						fontSize: "12px",
						marginInlineEnd: { sm: "15px" },
						padding: "4px 24px",
						borderRadius: "15px",
						boxShadow: "0 25px 35px #53535333, inset 0 3px 14px 1px #fff",
						"&:hover": {
							color: "#999999",
							background: "#ffffffa1",
							boxShadow: "0 0 6px rgb(255 255 255)",
						},
					}}
				>
					Atrás
				</Button>
			</Box>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					gap: "4px",
				}}
			>
				<Box sx={boxInput}>
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
						FormHelperTextProps={{
							sx: { textShadow: "1px 1px 2px rgb(255 250 250)" },
						}}
						InputProps={{ sx: { ...inputProps } }}
						InputLabelProps={{ sx: { ...InputLabelProps } }}
					/>
				</Box>
				<Box sx={boxInput}>
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
						FormHelperTextProps={{
							sx: { textShadow: "1px 1px 2px rgb(255 250 250)" },
						}}
						InputProps={{ sx: { ...inputProps } }}
						InputLabelProps={{ sx: { ...InputLabelProps } }}
					/>
				</Box>
				<Box sx={boxInput}>
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
							sx: { ...inputProps },
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
										{typePassword === "password" ? (
											<IoEyeSharp />
										) : (
											<FaEyeSlash />
										)}
									</IconButton>
								</InputAdornment>
							),
						}}
						InputLabelProps={{ sx: { ...InputLabelProps } }}
					/>
				</Box>
				<Box sx={boxInput}>
					<TextField
						fullWidth
						id="address"
						name="address"
						label="Dirección"
						value={formik.values.address}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						helperText="Opcional, solo para envios"
						FormHelperTextProps={{
							sx: { textShadow: "1px 1px 2px rgb(255 250 250)" },
						}}
						InputProps={{ sx: { ...inputProps } }}
						InputLabelProps={{ sx: { ...InputLabelProps } }}
					/>
				</Box>
				<Button
					variant="contained"
					type="submit"
					sx={{
						width: "95%",
						maxWidth: "1100px",
						margin: "auto",
						border: "3px solid #999999",
						borderRadius: "23px",
						color: "#878686",
						fontWeight: "600",
						background: "linear-gradient(120deg, #5e5b5b, #f2f2f2, #5e5b5b )",
						backgroundSize: "150% 150%",
						transition: "background-position 0.5s ease",
						"&:hover": {
							backgroundPosition: "100% 0",
						},
						"&:active": {
							boxShadow: "inset 0 4px 8px rgba(0, 0, 0, 0.5)",
						},
					}}
				>
					Registrate
				</Button>
			</Box>
			<Typography
				sx={{
					textShadow: "1px 1px 2px rgb(255 250 250)",
					marginBlock: "10px",
					textAlign: "center",
				}}
			>
				Si ya tienes cuenta,{" "}
				<Button
					sx={{
						ml: "5px",
						color: "#4c4c4c",
						fontWeight: "600",
						textShadow: "1px 1px 2px rgb(255 250 250)",
						transition: "all .5s ease-out",
						"&:hover": {
							color: "#999999",
							background: "#ffffffa1",
							boxShadow: "0 0 6px rgb(255 255 255)",
						},
					}}
					onClick={() => navigate("/Login")}
				>
					Inicia sesión
				</Button>
			</Typography>
		</Container>
	);
};
