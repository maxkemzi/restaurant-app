import prisma from "@/prisma/client";

const getOrders = async () => {
	const orders = await prisma.order.findMany({
		include: {Cart: {include: {CartProducts: {include: {Product: true}}}}}
	});
	return orders;
};

const createOrder = async ({products, ...data}) => {
	const productsDefined = Array.isArray(products);

	const order = await prisma.order.create({
		data: {
			...data,
			Cart: {
				create: {
					CartProducts: productsDefined
						? {
								createMany: {
									data: products
								}
						  }
						: undefined
				}
			}
		},
		include: {Cart: {include: {CartProducts: {include: {Product: true}}}}}
	});
	return order;
};

const deleteOrderById = async id => {
	const order = await prisma.order.delete({
		where: {id},
		include: {Cart: {include: {CartProducts: {include: {Product: true}}}}}
	});
	return order;
};

const updateOrderById = async (id, {products, ...data}) => {
	const productsDefined = Array.isArray(products);

	const order = await prisma.order.update({
		where: {id},
		data: {
			...data,
			Cart: {
				update: {
					CartProducts: productsDefined
						? {
								deleteMany: {},
								createMany: {
									data: products
								}
						  }
						: undefined
				}
			}
		},
		include: {Cart: {include: {CartProducts: {include: {Product: true}}}}}
	});
	return order;
};

const getOrderById = async id => {
	const order = await prisma.order.findUnique({
		where: {id},
		include: {Cart: {include: {CartProducts: {include: {Product: true}}}}}
	});
	return order;
};

export {getOrders, createOrder, deleteOrderById, updateOrderById, getOrderById};
