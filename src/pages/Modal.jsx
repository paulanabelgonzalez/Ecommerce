import { useContext } from "react";

import { useNavigate } from "react-router";

import { Box, Button, Typography } from "@mui/material";

import { FirebaseContext } from "../context/FirebaseContext";

import placa from "../assets/imgLetreros/placa.png";

export const Modal = () => {
	const { modal, user } = useContext(FirebaseContext);

	const navigate = useNavigate();

	const handlePage = () => {
		if (modal === 0 || modal === 1) {
			navigate("/");
		} else if (modal === 2) {
			navigate("/Login");
		} else {
			navigate("/Register");
		}
	};

	return (
		<>
			<Box
				sx={{
					width: { sm: "100%" },
					maxWidth: "500px",
					height: { xs: "192px", sm: "286px" },
					backgroundImage: `url(${placa})`,
					backgroundSize: "cover",
					margin: { xs: "20px", sm: "20px auto" },
					padding: "10px",
					borderRadius: 5,
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					gap: modal === 2 ? "26px" : modal === 4 ? "8px" : "4px",
				}}
			>
				<Typography
					sx={{
						fontSize: 24,
						textAlign: "center",
						fontWeight: 700,
						color: "#999999",
						textShadow:
							"1px -1px 2px rgba(255, 255, 255, 0.8), -1px 2px 3px rgba(0, 0, 0, 0.8), 3px 3px 8px rgba(0, 0, 0, 0.6), -3px 5px 5px rgba(0, 0, 0, 0.5)",
					}}
				>
					{modal === 0 &&
						`Bienvenido ${user?.username?.toUpperCase()}, te has registrado correctamente.`}
					{modal === 1 && "GRACIAS POR SU COMPRA!!"}
					{modal === 2 && "Los datos no son correctos!!"}
					{modal === 3 && "Este correo ya esta registrado"}
					{modal === 4 && "El correo electrónico ingresado no es válido."}
				</Typography>

				{(modal === 1 || modal === 3 || modal === 4) && (
					<>
						<Typography
							sx={{
								fontSize: modal === 3 || modal === 4 ? "18px" : "20px",
								textAlign: "center",
								fontWeight: 500,
							}}
						>
							{modal === 1 && "Su pedido llegará en 48hs." /*${hours}*/}
							{(modal === 3 || modal === 4) &&
								"Prueba con otro correo electrónico"}
						</Typography>
					</>
				)}

				<Box
					sx={{
						display: "flex",
						justifyContent: "flex-start",
					}}
				>
					<Button
						onClick={handlePage}
						sx={{
							color: "#fff",
							marginTop: (modal === 1 || modal === 3) && "9px",
							fontWeight: 700,
							fontSize: 12,
							boxShadow: "0 25px 35px #53535333, inset 0 3px 14px 1px #fff",
							padding: "4px 24px",
							"&:hover": {
								color: "#999999",
								background: "#ffffffa1",
								boxShadow: "0 0 6px rgb(255 255 255)",
							},
						}}
					>
						{modal === 0 && "Aceptar"}
						{modal === 1 && "Home"}
						{modal === 2 && "Intenta de nuevo"}
						{(modal === 3 || modal === 4) && "Ingresa otro E-mail"}
					</Button>
				</Box>
			</Box>
		</>
	);
};
