import prisma from "@/prisma/client";

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

			const order = await prisma.order.create({
				data: {
					client_address,
					client_name,
					client_phone,
					Cart: {
						create: {
							CartProducts: {
								createMany: {data: products}
							}
						}
					}
				},
				include: {Cart: {include: {CartProducts: {include: {Product: true}}}}}
			});

			res.status(201).json(order);
		} catch (e) {
			console.log(e);
			res.status(500).json({message: "Something went wrong."});
		}
	} else if (req.method === "GET") {
		try {
			const orders = await prisma.order.findMany({
				include: {Cart: {include: {CartProducts: {include: {Product: true}}}}}
			});
			res.json(orders);
		} catch (e) {
			res.status(500).json({message: "Something went wrong."});
		}
	}
};

export default handler;
