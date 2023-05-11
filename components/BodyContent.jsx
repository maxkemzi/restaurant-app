import {useEffect, useState} from "react";
import {useToastContext} from "@/contexts/toastContext";
import Navbar from "./Navbar";
import Footer from "./Footer";

const BodyContent = ({children}) => {
	const {showToast} = useToastContext();
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		const fetchCategories = async () => {
			const response = await fetch("/api/categories");

			if (!response.ok) {
				showToast("Error loading categories.", "error");
			} else {
				const data = await response.json();
				setCategories(data);
			}
		};
		fetchCategories();
	}, [showToast]);

	return (
		<div className="flex flex-col min-h-screen">
			<Navbar categories={categories} />
			<main className="flex-grow">
				<div className="container mx-auto px-4">{children}</div>
			</main>
			<Footer />
		</div>
	);
};

export default BodyContent;
