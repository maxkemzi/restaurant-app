import {RESTAURANT_NAME} from "@/lib/constants/restaurantInfo";
import {CartProvider, ToastProvider} from "@/lib/contexts";
import {Montserrat} from "next/font/google";
import Header from "./(header)/Header";
import Footer from "./Footer";
import "./globals.css";

export const metadata = {
	title: RESTAURANT_NAME,
	description: "Created by Max Kyrychenko",
	keywords: ["Restaurant", "Pizza", "Desserts", "Food"],
	authors: [
		{
			name: "Max Kyrychenko",
			url: "https://github.com/Kemzi-coder"
		}
	],
	creator: "Max Kyrychenko",
	publisher: "Max Kyrychenko"
};

const RootLayout = async ({children}) => (
	<html lang="en">
		<body>
			<CartProvider>
				<ToastProvider>
					<div className="flex flex-col min-h-screen">
						<Header />
						<main className="flex-grow">{children}</main>
						<Footer />
					</div>
				</ToastProvider>
			</CartProvider>
		</body>
	</html>
);

export default RootLayout;
