import { useContext } from "react";
import { FirebaseContext } from "../context/FirebaseContext";
import { Box, Typography } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router";

export const OrderHistory = () => {
	const navigate = useNavigate();
	const { user } = useContext(FirebaseContext);

	return (
		<>
			<Box>
				<IoMdClose style={{ color: "black" }} onClick={() => navigate("/")} />
				{user?.orders?.map((order, index) => (
					<Box sx={{ border: "black 2px solid" }} key={index}>
						<Typography sx={{ color: "black" }}>{order.total}</Typography>
						{order?.order?.map((product, index) => (
							<Box key={index}>
								<Typography sx={{ color: "black" }}>
									{product.description}
								</Typography>
								<Typography sx={{ color: "black" }}>
									{product.quantity}
								</Typography>
								<Typography sx={{ color: "black" }}>{product.name}</Typography>
								<Typography sx={{ color: "black" }}>{product.price}</Typography>
								<img
									style={{ width: "300px" }}
									src={product.image}
									alt={product.name}
								/>
							</Box>
						))}
						<Typography sx={{ color: "black" }}>{order.date}</Typography>
					</Box>
				))}
			</Box>
		</>
	);
};
