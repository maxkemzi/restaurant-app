import {parseQueryParams} from "@/lib/helpers";
import {
	deleteOrderById,
	getOrderById,
	updateOrderById
} from "@/lib/prisma/orders";

const handler = async (req, res) => {
	if (req.method === "DELETE") {
		try {
			const {id} = parseQueryParams(req.query);

			const order = await deleteOrderById(id);
			res.json(order);
		} catch (e) {
			res.status(500).json({message: "Something went wrong."});
		}
	} else if (req.method === "PUT") {
		try {
			const {id} = parseQueryParams(req.query);
			const {
				client_name,
				client_phone,
				client_address,
				product_ids: productIds
			} = req.body;

			const products = productIds?.map(productId => ({
				product_id: Number(productId)
			}));

			const order = await updateOrderById(id, {
				client_name,
				client_phone,
				client_address,
				products
			});

			res.json(order);
		} catch (e) {
			console.log(e);
			res.status(500).json({message: "Something went wrong."});
		}
	} else if (req.method === "GET") {
		try {
			const {id} = parseQueryParams(req.query);

			const order = await getOrderById(id);
			res.json(order);
		} catch (e) {
			res.status(500).json({message: "Something went wrong."});
		}
	}
};

export default handler;
