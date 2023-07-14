"use client";

import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import {useCartContext, useToastContext} from "@/lib/contexts";
import {CartProductDTO} from "@/lib/dtos";

const AddToCartButton = ({product, testId}) => {
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
			<div
				className="flex gap-2 justify-between items-center text-center"
				data-testid={testId}>
				<Button
					size="small"
					variant="circle"
					onClick={handleRemoveFromCart}
					data-testid="remove-button">
					<Icon name="minus" />
				</Button>
				<p className="w-7" data-testid="product-count">
					{productCount}
				</p>
				<Button
					size="small"
					variant="circle"
					onClick={handleAddToCart}
					data-testid="add-button">
					<Icon name="plus" />
				</Button>
			</div>
		);
	}

	return (
		<Button onClick={handleAddToCart} testId={testId}>
			Add to cart
		</Button>
	);
};

export default AddToCartButton;
