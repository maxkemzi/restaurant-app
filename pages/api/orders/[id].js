import prisma from "@/prisma/client";
import parseQueryParams from "@/utils/helpers/parseQueryParams";

const handler = async (req, res) => {
	if (req.method === "DELETE") {
		try {
			const {id} = parseQueryParams(req.query);

			const order = await prisma.order.delete({
				where: {id},
				include: {Cart: {include: {CartProducts: {include: {Product: true}}}}}
			});
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

			const updatedOrder = await prisma.order.update({
				where: {id},
				data: {
					client_address,
					client_name,
					client_phone,
					Cart: {
						update: {
							CartProducts: {
								deleteMany: Array.isArray(productIds) ? {} : undefined,
								createMany: Array.isArray(productIds)
									? {
											data: productIds.map(productId => ({
												product_id: productId
											}))
									  }
									: undefined
							}
						}
					}
				},
				include: {Cart: {include: {CartProducts: {include: {Product: true}}}}}
			});

			res.json(updatedOrder);
		} catch (e) {
			console.log(e);
			res.status(500).json({message: "Something went wrong."});
		}
	} else if (req.method === "GET") {
		try {
			const {id} = parseQueryParams(req.query);

			const order = await prisma.order.findUnique({
				where: {id},
				include: {Cart: {include: {CartProducts: {include: {Product: true}}}}}
			});
			res.json(order);
		} catch (e) {
			res.status(500).json({message: "Something went wrong."});
		}
	}
};

export default handler;
