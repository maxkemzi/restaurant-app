import prisma from "@/src/prisma/client";

const defaultQueryOptions = {
	include: {Cart: {include: {CartProducts: {include: {Product: true}}}}}
};

const getOrders = async () => {
	const orders = await prisma.order.findMany(defaultQueryOptions);
	return orders;
};

const getOrdersByClientId = async clientId => {
	const orders = await prisma.order.findMany({
		...defaultQueryOptions,
		where: {clientId}
	});
	return orders;
};

const createOrder = async ({productIds, ...data}) => {
	const options = {
		...defaultQueryOptions,
		data
	};

	const productIdsDefined = Array.isArray(productIds);
	if (productIdsDefined) {
		const products = productIds.map(id => ({productId: id}));
		options.data.Cart = {
			create: {
				CartProducts: {
					createMany: {data: products}
				}
			}
		};
	}

	const order = await prisma.order.create(options);
	return order;
};

const deleteOrderById = async id => {
	const order = await prisma.order.delete({
		...defaultQueryOptions,
		where: {id}
	});
	return order;
};

const updateOrderById = async (id, {productIds, ...data}) => {
	const options = {
		...defaultQueryOptions,
		where: {id},
		data
	};

	const productIdsDefined = Array.isArray(productIds);
	if (productIdsDefined) {
		const products = productIds.map(pId => ({productId: pId}));
		options.data.Cart = {
			update: {
				CartProducts: {
					deleteMany: {},
					createMany: {data: products}
				}
			}
		};
	}

	const order = await prisma.order.update(options);
	return order;
};

const getOrderById = async id => {
	const order = await prisma.order.findUnique({
		...defaultQueryOptions,
		where: {id}
	});
	return order;
};

export {
	createOrder,
	deleteOrderById,
	getOrderById,
	getOrders,
	getOrdersByClientId,
	updateOrderById
};
