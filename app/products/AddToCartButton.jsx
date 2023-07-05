"use client";

import Button from "@/components/Button";
import {useCartContext} from "@/lib/contexts";
import {CartProductDTO} from "@/lib/dtos";

const AddToCartButton = ({product}) => {
	const {
		addProduct,
		removeProduct,
		cart: {products}
	} = useCartContext();

	const productInCart = Object.hasOwn(products, product.id);

	const toggleProductInCart = () => {
		if (productInCart) {
			removeProduct(product.id);
		} else {
			const cartProduct = new CartProductDTO(product);
			addProduct(cartProduct);
		}
	};

	return (
		<Button onClick={toggleProductInCart}>
			{productInCart ? "Remove from cart" : "Add to cart"}
		</Button>
	);
};

export default AddToCartButton;
