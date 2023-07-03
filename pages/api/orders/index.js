import {createOrder, getOrders} from "@/lib/prisma/orders";

const handler = async (req, res) => {
	if (req.method === "POST") {
		try {
			const {
				client_name,
				client_phone,
				client_address,
				product_ids: productIds
			} = req.body;

			const products = productIds?.map(id => ({
				product_id: Number(id)
			}));

			const order = await createOrder({
				client_name,
				client_phone,
				client_address,
				products
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
