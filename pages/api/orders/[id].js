import getCreateAndDeleteElements from "@/utils/helpers/getCreateAndDeleteEls";
import prisma from "@/prisma/client";

const handler = async (req, res) => {
	if (req.method === "DELETE") {
		try {
			const {id} = req.query;

			const order = await prisma.order.delete({
				where: {id: Number(id)},
				include: {Cart: {include: {CartProducts: {include: {Product: true}}}}}
			});
			res.json(order);
		} catch (e) {
			res.status(500).json({error: e.message});
		}
	} else if (req.method === "PUT") {
		try {
			const {id} = req.query;
			const {clientName, clientPhone, clientAddress, productIds} = req.body;

			const getProductOps = async () => {
				const oldOrder = await prisma.order.findUnique({
					where: {id: Number(id)},
					include: {Cart: {include: {CartProducts: true}}}
				});

				const oldProductIds = oldOrder.Cart.CartProducts.map(
					product => product.product_id
				);

				const [deleteIds, createIds] = getCreateAndDeleteElements(
					oldProductIds,
					productIds
				);

				const deleteProductIds = [];
				let shouldSkip;

				deleteIds.forEach(el => {
					shouldSkip = false;
					oldOrder.Cart.CartProducts.forEach(product => {
						if (shouldSkip) {
							return;
						}

						if (
							el === product.product_id &&
							!deleteProductIds.includes(product.id)
						) {
							deleteProductIds.push(product.id);
							shouldSkip = true;
						}
					});
				});

				// Product ingredients, that need to be created
				const createData = createIds.map(prodId => ({
					cart_id: oldOrder.Cart.id,
					product_id: prodId
				}));

				return [
					// Delete redundant product ingredients if needed
					...deleteProductIds.map(el =>
						prisma.cartProduct.delete({
							where: {id: el}
						})
					),
					// Create new product ingredients if needed
					prisma.cartProduct.createMany({
						data: createData
					})
				];
			};

			// Get operations to update cart products
			const operations = await getProductOps();

			const result = await prisma.$transaction([
				// Update product ingredients
				...operations,
				// Update product
				prisma.order.update({
					where: {id: Number(id)},
					data: {
						client_address: clientAddress,
						client_name: clientName,
						client_phone: clientPhone
					},
					include: {Cart: {include: {CartProducts: {include: {Product: true}}}}}
				})
			]);

			const updatedOrder = result[result.length - 1];

			res.json(updatedOrder);
		} catch (e) {
			res.status(500).json({error: e.message});
		}
	} else if (req.method === "GET") {
		try {
			const {id} = req.query;

			const order = await prisma.order.findUnique({
				where: {id: Number(id)},
				include: {Cart: {include: {CartProducts: {include: {Product: true}}}}}
			});
			res.json(order);
		} catch (e) {
			res.status(500).json({error: e.message});
		}
	}
};

export default handler;
