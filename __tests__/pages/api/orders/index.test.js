import {describe, it, expect, beforeEach} from "vitest";
import categoriesHandler from "@/pages/api/categories";
import ingredientsHandler from "@/pages/api/ingredients";
import productsHandler from "@/pages/api/products";
import ordersHandler from "@/pages/api/orders";
import prisma from "@/prisma/client";
import cleanUp from "@/__tests__/cleanUp";
import mockRequestResponse from "@/__tests__/mockRequestResponse";

describe("/api/orders", () => {
	let mockBody;
	let mockOrder;
	let mockOrderWithIncludedRelations;

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

		// Create product
		const {req: createProductReq, res: createProductRes} = mockRequestResponse(
			"POST",
			{
				image: "image",
				name: "name",
				categoryId: category.id,
				priceUsd: 500,
				weight: 500,
				sizeCm: 30,
				isVegan: false,
				isSpicy: false,
				ingredientIds: [ingredient.id]
			}
		);
		await productsHandler(createProductReq, createProductRes);

		const product = createProductRes._getJSONData();

		mockOrder = {
			clientName: "name",
			clientAddress: "address",
			clientPhone: "+380"
		};

		mockOrderWithIncludedRelations = {
			...mockOrder,
			Cart: {
				CartProducts: [{productId: product.id, Product: {id: product.id}}]
			}
		};

		mockBody = {
			...mockOrder,
			productIds: [product.id]
		};
	});

	describe("POST", () => {
		it("should add an order", async () => {
			const {req, res} = mockRequestResponse("POST", mockBody);
			await ordersHandler(req, res);

			const body = res._getJSONData();

			const createdOrder = JSON.parse(
				JSON.stringify(
					await prisma.order.findFirst({
						include: {
							Cart: {include: {CartProducts: {include: {Product: true}}}}
						}
					})
				)
			);

			expect(res.statusCode).toBe(201);
			expect(createdOrder).toMatchObject(mockOrderWithIncludedRelations);
			expect(body).toMatchObject(mockOrderWithIncludedRelations);
		});

		it("should respond with 500 status code", async () => {
			const {req, res} = mockRequestResponse("POST", {});
			await ordersHandler(req, res);

			expect(res.statusCode).toBe(500);
		});
	});

	it("should return an empty array", async () => {
		const {req, res} = mockRequestResponse();
		await ordersHandler(req, res);

		const body = res._getJSONData();

		expect(res.statusCode).toBe(200);
		expect(body).toEqual([]);
	});
});
