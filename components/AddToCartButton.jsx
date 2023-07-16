"use client";

import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import {useCartContext, useToastContext} from "@/lib/contexts";

const AddToCartButton = ({product, testId}) => {
	const {addProduct, removeProduct, products} = useCartContext();
	const {showToast} = useToastContext();

	const handleAddToCart = () => {
		addProduct(product);
		showToast("success", "Product has been added to cart");
	};

	const handleRemoveFromCart = () => {
		removeProduct(product.id);
	};

	const productIsInCart = products.some(el => el.id === product.id);
	if (productIsInCart) {
		const productCount = products.find(el => el.id === product.id).count;
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
