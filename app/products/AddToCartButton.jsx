"use client";

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
		<button
			onClick={toggleProductInCart}
			type="button"
			className="btn btn-primary">
			{productInCart ? "Remove from cart" : "Add to cart"}
		</button>
	);
};

export default AddToCartButton;
