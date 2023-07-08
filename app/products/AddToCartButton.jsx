"use client";

import Button from "@/components/Button";
import Icon from "@/components/Icon";
import {useCartContext, useToastContext} from "@/lib/contexts";
import {CartProductDTO} from "@/lib/dtos";

const AddToCartButton = ({product}) => {
	const {
		addProduct,
		removeProduct,
		cart: {products}
	} = useCartContext();
	const {showToast} = useToastContext();

	const productInCart = Object.hasOwn(products, product.id);

	const handleAddToCart = () => {
		const cartProduct = new CartProductDTO(product);
		addProduct(cartProduct);

		showToast("success", "Product has been added to cart");
	};

	const handleRemoveFromCart = () => {
		removeProduct(product.id);
	};

	if (productInCart) {
		const productCount = products[product.id].length;

		return (
			<div className="flex gap-2 justify-between items-center text-center">
				<Button size="small" variant="circle" onClick={handleRemoveFromCart}>
					<Icon name="minus" />
				</Button>
				<p className="w-7">{productCount}</p>
				<Button size="small" variant="circle" onClick={handleAddToCart}>
					<Icon name="plus" />
				</Button>
			</div>
		);
	}

	return <Button onClick={handleAddToCart}>Add to cart</Button>;
};

export default AddToCartButton;
