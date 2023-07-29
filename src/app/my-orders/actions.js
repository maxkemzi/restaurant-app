"use server";

import {PathName} from "@/src/lib/constants";
import {AppError} from "@/src/lib/error";
import {deleteOrderById} from "@/src/lib/prisma/orders";
import {revalidatePath} from "next/cache";
import {cookies} from "next/headers";

const deleteOrder = async orderId => {
	const clientId = cookies().get("clientId");

	if (!clientId) {
		throw new AppError("You don't have rights to perform this action.");
	}

	await deleteOrderById(orderId);
	revalidatePath(PathName.MY_ORDERS);
};

export {deleteOrder};
