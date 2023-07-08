"use server";

import {PathName} from "@/lib/constants";
import {createOrder} from "@/lib/prisma/orders";
import {nanoid} from "nanoid";
import {revalidatePath} from "next/cache";
import {cookies} from "next/headers";

const placeOrder = async order => {
	const clientId = cookies().get("clientId")?.value || nanoid();

	await createOrder({...order, clientId});
	revalidatePath(PathName.MY_ORDERS);

	cookies().set("clientId", clientId);
};

export {placeOrder};
