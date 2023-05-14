"use client";

import {useCartContext} from "@/contexts/cartContext";
import CartProductDTO from "@/dtos/CartProductDTO";
import {useEffect, useState} from "react";
import CheckboxField from "@/components/CheckboxField";
import {useToastContext} from "@/contexts/toastContext";
import Product from "../../../components/Product";

const Products = ({params}) => {
	const {addProduct} = useCartContext();
	const {showToast} = useToastContext();
	const [products, setProducts] = useState([]);
	const [isVegan, setIsVegan] = useState(false);
	const [isSpicy, setIsSpicy] = useState(false);

	useEffect(() => {
		const fetchProducts = async () => {
			const queryParams = {};

			queryParams.category_name = params.category;

			if (isVegan) {
				queryParams.is_vegan = true;
			}

			if (isSpicy) {
				queryParams.is_spicy = true;
			}

			const response = await fetch(
				`/api/products?${new URLSearchParams(queryParams)}`
			);

			if (!response.ok) {
				showToast("Error loading products.", "error");
				return;
			}

			const data = await response.json();
			setProducts(data);
		};
		fetchProducts();
	}, [isSpicy, isVegan, params.category, showToast]);

	const handleClick = product => () => {
		const cartProduct = new CartProductDTO(product);
		addProduct(cartProduct);
	};

	return (
		<>
			{params.category === "pizzas" ? (
				<div className="flex gap-6 mb-6">
					<CheckboxField
						variant="error"
						label="Spicy"
						defaultChecked={isSpicy}
						onChange={e => {
							setIsSpicy(e.target.checked);
						}}
					/>
					<CheckboxField
						label="Vegan"
						defaultChecked={isVegan}
						onChange={e => {
							setIsVegan(e.target.checked);
						}}
					/>
				</div>
			) : null}
			{products.length !== 0 ? (
				<div className="grid gap-6 grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))] sm:grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))]">
					{products.map(product => (
						<Product
							id={product.id}
							onClick={handleClick(product)}
							isVegan={product.is_vegan}
							isSpicy={product.is_spicy}
							categoryName={params.category}
							image={product.image}
							ingredients={product.ProductIngredients}
							name={product.name}
							priceUSD={product.price_USD}
							sizeCm={product.size_cm}
							weight={product.weight}
							key={product.id}
						/>
					))}
				</div>
			) : (
				<p>There are no products.</p>
			)}
		</>
	);
};

export default Products;
