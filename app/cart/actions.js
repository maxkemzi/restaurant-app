"use server";

import {PathName} from "@/lib/constants";
import {AppError} from "@/lib/error";
import {createOrder} from "@/lib/prisma/orders";
import {revalidatePath} from "next/cache";
import {cookies} from "next/headers";

const placeOrder = async order => {
	const clientId = cookies().get("clientId")?.value;

	if (!clientId) {
		throw new AppError("You don't have rights to perform this action.");
	}

	await createOrder({...order, clientId});
	revalidatePath(PathName.MY_ORDERS);
};

export {placeOrder};
