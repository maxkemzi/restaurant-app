import AddToCartButton from "../products/AddToCartButton";
import CartProductCard from "./CartProductCard";

const CartProductList = ({cartProducts}) => {
	if (cartProducts.length === 0) {
		return <p className="text-center">Your cart is empty</p>;
	}

	return (
		<div className="flex flex-col gap-4">
			{cartProducts.map(cartProduct => (
				<CartProductCard
					key={cartProduct.id}
					cartProduct={cartProduct}
					actionsSlot={<AddToCartButton product={cartProduct} />}
				/>
			))}
		</div>
	);
};

export default CartProductList;
