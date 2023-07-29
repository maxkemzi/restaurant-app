"use client";

import Button from "@/src/components/ui/Button";
import TextField from "@/src/components/ui/TextField";
import {PathName, phoneNumberRegex} from "@/src/lib/constants";
import {useCartContext, useToastContext} from "@/src/lib/contexts";
import {AppError} from "@/src/lib/error";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import CartProductList from "./CartProductList";
import {placeOrder} from "./actions";

const Cart = () => {
	const {products, totalCost, totalCount} = useCartContext();
	const {showToast} = useToastContext();
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: {errors}
	} = useForm({
		defaultValues: {
			clientPhone: "",
			clientAddress: "",
			clientName: ""
		}
	});

	const onSubmit = async data => {
		try {
			const productIds = products.flatMap(({id, count}) =>
				Array(count).fill(id)
			);
			const order = {...data, productIds};

			await placeOrder(order);
			showToast("success", "Your order have been placed.");
			router.push(PathName.MY_ORDERS);
		} catch (e) {
			throw new AppError("Error placing your order.");
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="grid grid-cols-[repeat(auto-fit,_minmax(280px,_1fr))] gap-6">
				<div className="flex-1 prose">
					<h1>Checkout</h1>
					<div>
						<h2>Personal info</h2>
						<div className="flex gap-4">
							<TextField
								className="basis-1/2"
								label="Name"
								error={errors.clientName?.message}
								InputProps={register("clientName", {
									required: "Name is required"
								})}
								testId="name-text-field"
							/>
							<TextField
								className="basis-1/2"
								label="Phone number"
								error={errors.clientPhone?.message}
								InputProps={register("clientPhone", {
									required: "Phone number is required",
									pattern: {
										value: phoneNumberRegex,
										message: "Invalid phone number"
									}
								})}
								testId="phone-text-field"
							/>
						</div>
						<h2>Delivery</h2>
						<div className="flex gap-4">
							<TextField
								className="basis-1/2"
								label="Address"
								error={errors.clientAddress?.message}
								InputProps={register("clientAddress", {
									required: "Client address is required"
								})}
								testId="address-text-field"
							/>
							<div className="basis-1/2" />
						</div>
					</div>
				</div>
				<div className="flex-1">
					<div className="mb-6">
						<CartProductList cartProducts={products} />
					</div>
					<div className="stats w-full">
						<div className="stat flex justify-between items-center">
							<div>
								<div className="stat-title">Total cost</div>
								<div className="stat-value" data-testid="total-cost">
									${totalCost}
								</div>
							</div>
							<Button
								isSubmit
								isDisabled={totalCount === 0}
								testId="place-order-button">
								Place an order
							</Button>
						</div>
					</div>
				</div>
			</div>
		</form>
	);
};

export default Cart;
