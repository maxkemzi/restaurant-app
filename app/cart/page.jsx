"use client";

import Button from "@/components/Button";
import TextField from "@/components/TextField";
import {PathName} from "@/lib/constants";
import {useCartContext, useToastContext} from "@/lib/contexts";
import {AppError} from "@/lib/error";
import {useRouter} from "next/navigation";
import CartProductCard from "./CartProductCard";
import {placeOrder} from "./actions";

const Cart = () => {
	const {
		cart: {products, cost},
		removeProduct,
		addProduct
	} = useCartContext();
	const {showToast} = useToastContext();
	const router = useRouter();

	const productIds = Object.entries(products).reduce((prev, [key, value]) => {
		const ids = new Array(value.length).fill(Number(key));
		return [...prev, ...ids];
	}, []);

	const handleAction = async formData => {
		try {
			const clientPhone = formData.get("clientPhone");
			const clientAddress = formData.get("clientAddress");
			const clientName = formData.get("clientName");

			const data = {
				clientPhone,
				clientAddress,
				clientName,
				productIds
			};

			await placeOrder(data);
			showToast("success", "Your order have been placed.");
			router.push(PathName.MY_ORDERS);
		} catch (e) {
			throw new AppError("Error placing your order.");
		}
	};

	return (
		<form action={handleAction}>
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
						{Object.values(products).map(productArr => {
							const product = productArr[0];
							const count = productArr.length;

							return (
								<CartProductCard
									key={product.id}
									count={count}
									image={product.image}
									name={product.name}
									priceUsd={product.priceUsd}
									weight={product.weight}
									onAddClick={() => addProduct(product)}
									onRemoveClick={() => removeProduct(product.id)}
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
							<Button isSubmit>Place an order</Button>
						</div>
					</div>
				</div>
			</div>
		</form>
	);
};

export default Cart;
