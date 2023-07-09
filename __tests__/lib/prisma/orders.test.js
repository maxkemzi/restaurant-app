import {
	createOrder,
	deleteOrderById,
	getOrderById,
	getOrders,
	getOrdersByClientId,
	updateOrderById
} from "@/lib/prisma/orders";
import prismaMock from "@/prisma/__mocks__/client";
import {describe, expect, it} from "vitest";

describe("orders service", () => {
	const defaultQueryOptions = {
		include: {Cart: {include: {CartProducts: {include: {Product: true}}}}}
	};

	describe("get orders", () => {
		it("should return all orders", async () => {
			const orderMock = {id: 1, name: "order"};

			prismaMock.order.findMany.mockResolvedValue([orderMock]);
			const orders = await getOrders();

			expect(prismaMock.order.findMany).toHaveBeenCalledWith(
				defaultQueryOptions
			);
			expect(orders).toStrictEqual([orderMock]);
		});

		it("should throw an error", async () => {
			prismaMock.order.findMany.mockImplementation(() => {
				throw new Error();
			});

			expect(getOrders()).rejects.toThrow();
		});
	});

	describe("get orders by client id", () => {
		it("should return orders by client id", async () => {
			const orderMock = {id: 1, name: "order", clientId: 1};

			prismaMock.order.findMany.mockResolvedValue([orderMock]);
			const order = await getOrdersByClientId(orderMock.clientId);

			expect(prismaMock.order.findMany).toHaveBeenCalledWith({
				...defaultQueryOptions,
				where: {clientId: orderMock.clientId}
			});
			expect(order).toStrictEqual([orderMock]);
		});

		it("should throw an error", async () => {
			prismaMock.order.findMany.mockImplementation(() => {
				throw new Error();
			});

			expect(getOrdersByClientId()).rejects.toThrow();
		});
	});

	describe("create order", () => {
		it("should create a order", async () => {
			const orderMock = {
				id: 1,
				name: "order",
				productIds: [1]
			};

			prismaMock.order.create.mockResolvedValue(orderMock);
			const order = await createOrder(orderMock);

			const products = orderMock.productIds.map(id => ({
				productId: id
			}));

			expect(prismaMock.order.create).toHaveBeenCalledWith({
				...defaultQueryOptions,
				data: {
					id: orderMock.id,
					name: orderMock.name,
					Cart: {
						create: {
							CartProducts: {createMany: {data: products}}
						}
					}
				}
			});
			expect(order).toStrictEqual(orderMock);
		});

		it("should throw an error", async () => {
			prismaMock.order.create.mockImplementation(() => {
				throw new Error();
			});

			expect(createOrder()).rejects.toThrow();
		});
	});

	describe("delete order by id", () => {
		it("should delete a order by id", async () => {
			const orderMock = {id: 1, name: "order"};

			prismaMock.order.delete.mockResolvedValue(orderMock);
			const order = await deleteOrderById(orderMock.id);

			expect(prismaMock.order.delete).toHaveBeenCalledWith({
				...defaultQueryOptions,
				where: {id: orderMock.id}
			});
			expect(order).toStrictEqual(orderMock);
		});

		it("should throw an error", async () => {
			prismaMock.order.delete.mockImplementation(() => {
				throw new Error();
			});

			expect(deleteOrderById()).rejects.toThrow();
		});
	});

	describe("update order by id", () => {
		it("should update an order by id", async () => {
			const orderMock = {id: 1, name: "order", productIds: [1]};

			prismaMock.order.update.mockResolvedValue(orderMock);
			const order = await updateOrderById(orderMock.id, orderMock);

			const products = orderMock.productIds.map(id => ({
				productId: id
			}));

			expect(prismaMock.order.update).toHaveBeenCalledWith({
				...defaultQueryOptions,
				where: {id: orderMock.id},
				data: {
					id: orderMock.id,
					name: orderMock.name,
					Cart: {
						update: {
							CartProducts: {
								deleteMany: {},
								createMany: {data: products}
							}
						}
					}
				}
			});
			expect(order).toStrictEqual(orderMock);
		});

		it("should throw an error", async () => {
			prismaMock.order.update.mockImplementation(() => {
				throw new Error();
			});

			expect(updateOrderById()).rejects.toThrow();
		});
	});

	describe("get order by id", () => {
		it("should return an order by id", async () => {
			const orderMock = {id: 1, name: "order"};

			prismaMock.order.findUnique.mockResolvedValue(orderMock);
			const order = await getOrderById(orderMock.id);

			expect(prismaMock.order.findUnique).toHaveBeenCalledWith({
				...defaultQueryOptions,
				where: {id: orderMock.id}
			});
			expect(order).toStrictEqual(orderMock);
		});

		it("should throw an error", async () => {
			prismaMock.order.findUnique.mockImplementation(() => {
				throw new Error();
			});

			expect(getOrderById()).rejects.toThrow();
		});
	});
});
