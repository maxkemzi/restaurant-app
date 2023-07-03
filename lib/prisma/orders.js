import prisma from "@/prisma/client";

const getOrders = async () => {
	const orders = await prisma.order.findMany({
		include: {Cart: {include: {CartProducts: {include: {Product: true}}}}}
	});
	return orders;
};

const createOrder = async ({
	client_name,
	client_phone,
	client_address,
	products
}) => {
	const order = await prisma.order.create({
		data: {
			client_name,
			client_phone,
			client_address,
			Cart: {
				create: {
					CartProducts: {
						createMany: {
							data: Array.isArray(products) ? products : undefined
						}
					}
				}
			}
		},
		include: {Cart: {include: {CartProducts: {include: {Product: true}}}}}
	});
	return order;
};

const deleteOrderById = async id => {
	const order = await prisma.order.delete({
		where: {id: id != null ? id : undefined},
		include: {Cart: {include: {CartProducts: {include: {Product: true}}}}}
	});
	return order;
};

const updateOrderById = async (
	id,
	{client_name, client_phone, client_address, products}
) => {
	const order = await prisma.order.update({
		where: {id: id != null ? id : undefined},
		data: {
			client_name,
			client_phone,
			client_address,
			Cart: {
				update: {
					CartProducts: {
						deleteMany: Array.isArray(products) ? {} : undefined,
						createMany: {
							data: Array.isArray(products) ? products : undefined
						}
					}
				}
			}
		},
		include: {Cart: {include: {CartProducts: {include: {Product: true}}}}}
	});
	return order;
};

const getOrderById = async id => {
	const order = await prisma.order.findUnique({
		where: {id: id != null ? id : undefined},
		include: {Cart: {include: {CartProducts: {include: {Product: true}}}}}
	});
	return order;
};

export {getOrders, createOrder, deleteOrderById, updateOrderById, getOrderById};
