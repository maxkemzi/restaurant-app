"use client";

import CartProduct from "@/components/CartProduct";
import TextField from "@/components/TextField";
import {useCartContext} from "@/contexts/cartContext";
import {useToastContext} from "@/contexts/toastContext";
import {useRouter} from "next/navigation";

const Cart = () => {
	const {
		cart: {products, cost},
		removeProduct,
		addProduct,
		clearCart
	} = useCartContext();
	const {showToast} = useToastContext();
	const router = useRouter();

	const productIds = Object.entries(products).reduce((prev, [key, value]) => {
		const ids = new Array(value.length).fill(key);
		return [...prev, ...ids];
	}, []);

	const handleAdd = product => () => addProduct(product);

	const handleRemove = id => () => removeProduct(id);

	const handleSubmit = async e => {
		e.preventDefault();

		const data = {
			clientName: e.target.clientName.value,
			clientAddress: e.target.clientAddress.value,
			clientPhone: e.target.clientPhone.value,
			productIds
		};

		const endpoint = "/api/orders";

		const options = {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(data)
		};

		const response = await fetch(endpoint, options);

		if (response.ok) {
			showToast("Your order is successfully placed.");
			router.push("/");
			clearCart();
		} else {
			showToast("Error processing your order.", "error");
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="grid grid-cols-[repeat(auto-fit,_minmax(280px,_1fr))] gap-6">
				<div className="flex-1 prose">
					<h1>Checkout</h1>
					<div>
						<h2>Personal info</h2>
						<div className="flex gap-4">
							<TextField className="basis-1/2" label="Name" name="clientName" />
							<TextField
								className="basis-1/2"
								label="Phone number"
								name="clientPhone"
							/>
						</div>
						<h2>Delivery</h2>
						<div className="flex gap-4">
							<TextField
								className="basis-1/2"
								label="Address"
								name="clientAddress"
							/>
							<div className="basis-1/2" />
						</div>
					</div>
				</div>
				<div className="flex-1">
					<div className="flex flex-col gap-4 mb-6">
						{Object.entries(products).map(([id, arr]) => {
							const product = arr[0];
							const count = arr.length;

							return (
								<CartProduct
									key={product.id}
									count={count}
									image={product.image}
									name={product.name}
									priceUSD={product.priceUSD}
									weight={product.weight}
									onAddClick={handleAdd(product)}
									onRemoveClick={handleRemove(id)}
								/>
							);
						})}
					</div>
					<div className="stats w-full">
						<div className="stat flex justify-between items-center">
							<div>
								<div className="stat-title">Total cost</div>
								<div className="stat-value">${cost}</div>
							</div>
							<button type="submit" className="btn btn-primary">
								Place an order
							</button>
						</div>
					</div>
				</div>
			</div>
		</form>
	);
};

export default Cart;
