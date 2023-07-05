import {describe, it, expect, beforeEach} from "vitest";
import productsHandler from "@/pages/api/products";
import categoriesHandler from "@/pages/api/categories";
import ingredientsHandler from "@/pages/api/ingredients";
import ordersHandler from "@/pages/api/orders";
import orderHandler from "@/pages/api/orders/[id]";
import prisma from "@/prisma/client";
import cleanUp from "@/__tests__/cleanUp";
import mockRequestResponse from "@/__tests__/mockRequestResponse";

describe("/api/orders/:id", () => {
	let orderFromCreateResponse;
	let products;

	beforeEach(async () => {
		await cleanUp();

		// Create category
		const {req: createCategoryReq, res: createCategoryRes} =
			mockRequestResponse("POST", {name: "category"});
		await categoriesHandler(createCategoryReq, createCategoryRes);

		const category = createCategoryRes._getJSONData();

		// Create ingredient
		const {req: createIngredientReq, res: createIngredientRes} =
			mockRequestResponse("POST", {name: "egg"});
		await ingredientsHandler(createIngredientReq, createIngredientRes);

		const ingredient = createIngredientRes._getJSONData();

		// Create first product
		const {req: createProduct1Req, res: createProduct1Res} =
			mockRequestResponse("POST", {
				image: "image",
				name: "name1",
				categoryId: category.id,
				priceUsd: 500,
				weight: 500,
				sizeCm: 30,
				isVegan: false,
				isSpicy: false,
				ingredientIds: [ingredient.id]
			});
		await productsHandler(createProduct1Req, createProduct1Res);
		const product1 = createProduct1Res._getJSONData();

		// Create second product
		const {req: createProduct2Req, res: createProduct2Res} =
			mockRequestResponse("POST", {
				image: "image",
				name: "name2",
				categoryId: category.id,
				priceUsd: 500,
				weight: 500,
				sizeCm: 30,
				isVegan: false,
				isSpicy: false,
				ingredientIds: [ingredient.id]
			});
		await productsHandler(createProduct2Req, createProduct2Res);
		const product2 = createProduct2Res._getJSONData();

		products = [product1, product2];

		// Create order
		const {req, res} = mockRequestResponse("POST", {
			clientName: "name",
			clientAddress: "address",
			clientPhone: "+380",
			productIds: [product1.id]
		});
		await ordersHandler(req, res);

		orderFromCreateResponse = res._getJSONData();
	});

	describe("PUT", () => {
		it("should update order by id", async () => {
			const newClientName = "Max";
			const newProductIds = products.map(product => product.id);

			const {req, res} = mockRequestResponse(
				"PUT",
				{clientName: newClientName, productIds: newProductIds},
				{id: orderFromCreateResponse.id}
			);
			await orderHandler(req, res);

			const body = res._getJSONData();

			const orderThatMustBeUpdated = JSON.parse(
				JSON.stringify(
					await prisma.order.findUnique({
						where: {id: orderFromCreateResponse.id},
						include: {
							Cart: {include: {CartProducts: {include: {Product: true}}}}
						}
					})
				)
			);

			const expectedOrder = {
				...orderFromCreateResponse,
				clientName: newClientName,
				Cart: {
					...orderFromCreateResponse.Cart,
					CartProducts: products.map(({ProductIngredients: _, ...product}) => ({
						cartId: orderFromCreateResponse.Cart.id,
						productId: product.id,
						Product: product
					}))
				}
			};

			expect(res.statusCode).toBe(200);
			expect(orderThatMustBeUpdated).toMatchObject(expectedOrder);
			expect(body).toMatchObject(expectedOrder);
		});

		it("should respond with 500 status code", async () => {
			const newClientName = false;

			const {req, res} = mockRequestResponse(
				"PUT",
				{clientName: newClientName},
				{id: orderFromCreateResponse.id}
			);
			await orderHandler(req, res);

			expect(res.statusCode).toBe(500);
		});
	});

	describe("DELETE", () => {
		it("should delete order by id", async () => {
			const {req, res} = mockRequestResponse(
				"DELETE",
				{},
				{id: orderFromCreateResponse.id}
			);
			await orderHandler(req, res);

			const body = res._getJSONData();

			const orderThatMustBeDeleted = await prisma.order.findUnique({
				where: {id: orderFromCreateResponse.id}
			});

			expect(res.statusCode).toBe(200);
			expect(orderThatMustBeDeleted).toBeNull();
			expect(body).toEqual(orderFromCreateResponse);
		});

		it("should respond with 500 status code", async () => {
			const {req, res} = mockRequestResponse("DELETE", {}, {id: "id"});
			await orderHandler(req, res);

			expect(res.statusCode).toBe(500);
		});
	});

	describe("GET", () => {
		it("should return order by id", async () => {
			const {req, res} = mockRequestResponse(
				"GET",
				{},
				{id: orderFromCreateResponse.id}
			);
			await orderHandler(req, res);

			const body = res._getJSONData();

			expect(res.statusCode).toBe(200);
			expect(body).toEqual(orderFromCreateResponse);
		});

		it("should respond with 500 status code", async () => {
			const {req, res} = mockRequestResponse("GET", {}, {id: "id"});
			await orderHandler(req, res);

			expect(res.statusCode).toBe(500);
		});
	});
});
