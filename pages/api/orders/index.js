import {createOrder, getOrders} from "@/lib/prisma/orders";

const handler = async (req, res) => {
	if (req.method === "POST") {
		try {
			const {clientName, clientPhone, clientId, clientAddress, productIds} =
				req.body;

			const order = await createOrder({
				clientName,
				clientPhone,
				clientId,
				clientAddress,
				productIds
			});

			res.status(201).json(order);
		} catch (e) {
			console.log(e);
			res.status(500).json({message: "Something went wrong."});
		}
	} else if (req.method === "GET") {
		try {
			const orders = await getOrders();
			res.json(orders);
		} catch (e) {
			res.status(500).json({message: "Something went wrong."});
		}
	}
};

export default handler;
