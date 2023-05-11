"use client";

import {RESTAURANT_NAME} from "@/utils/constants/restaurantInfo";
import "./globals.css";
import BodyContent from "@/components/BodyContent";
import {Montserrat} from "next/font/google";
import {CartProvider} from "@/contexts/cartContext";
import {ToastProvider} from "@/contexts/toastContext";

const montserrat = Montserrat({subsets: ["latin"]});

const RootLayout = ({children}) => (
	<html lang="en">
		<head>
			<title>{RESTAURANT_NAME}</title>
		</head>
		<body className={montserrat.className}>
			<CartProvider>
				<ToastProvider>
					<BodyContent>{children}</BodyContent>
				</ToastProvider>
			</CartProvider>
		</body>
	</html>
);

export default RootLayout;
