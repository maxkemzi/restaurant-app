"use client";

import Button from "@/components/Button";
import TextField from "@/components/TextField";
import {PathName, phoneNumberRegex} from "@/lib/constants";
import {useCartContext, useToastContext} from "@/lib/contexts";
import {AppError} from "@/lib/error";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import CartProductList from "./CartProductList";
import {placeOrder} from "./actions";

const Cart = () => {
	const {
		cart: {products, cost, count}
	} = useCartContext();
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

	const cartProducts = Object.values(products).map(productArr => productArr[0]);

	const productIds = Object.entries(products).reduce((prev, [key, value]) => {
		const ids = new Array(value.length).fill(Number(key));
		return [...prev, ...ids];
	}, []);

	const onSubmit = async data => {
		try {
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
							/>
							<div className="basis-1/2" />
						</div>
					</div>
				</div>
				<div className="flex-1">
					<div className="mb-6">
						<CartProductList cartProducts={cartProducts} />
					</div>
					<div className="stats w-full">
						<div className="stat flex justify-between items-center">
							<div>
								<div className="stat-title">Total cost</div>
								<div className="stat-value">${cost}</div>
							</div>
							<Button isSubmit isDisabled={count === 0}>
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
