import {requestHandler} from "@/__tests__/pages/utils";
import {
	CategoryDbService,
	IngredientDbService,
	OrderDbService,
	ProductDbService,
	cleanUpDatabase
} from "@/__tests__/pages/utils/db";
import {
	CategoryMockGenerator,
	IngredientMockGenerator,
	OrderMockGenerator,
	ProductMockGenerator
} from "@/__tests__/pages/utils/mocks";
import ordersHandler from "@/pages/api/orders";
import {beforeEach, describe, expect, it} from "vitest";

describe("/api/orders", () => {
	let product;

	beforeEach(async () => {
		await cleanUpDatabase();

		const mockCategory = CategoryMockGenerator.generate();
		const category = await CategoryDbService.create(mockCategory);

		const mockIngredient = IngredientMockGenerator.generate();
		const ingredient = await IngredientDbService.create(mockIngredient);

		const mockProduct = ProductMockGenerator.generate(category.id);
		product = await ProductDbService.create({
			...mockProduct,
			ProductIngredients: {create: {data: {ingredientId: ingredient.id}}}
		});
	});

	describe("POST", () => {
		it("should add an order", async () => {
			const mockOrder = OrderMockGenerator.generate();

			const requestOptions = {
				method: "POST",
				body: {...mockOrder, productIds: [product.id]}
			};

			const {statusCode, body} = await requestHandler(
				ordersHandler,
				requestOptions
			);

			expect(statusCode).toBe(201);

			const existsInDb = await OrderDbService.exists(mockOrder);
			expect(existsInDb).toBe(true);

			const orderFromDb = await OrderDbService.get(mockOrder);
			expect(body).toMatchObject(orderFromDb);
		});

		it("should respond with 500 status code", async () => {
			const mockOrder = {clientName: false};

			const requestOptions = {method: "POST", body: mockOrder};

			const {statusCode} = await requestHandler(ordersHandler, requestOptions);

			expect(statusCode).toBe(500);
		});
	});

	describe("GET", () => {
		let orders;

		beforeEach(async () => {
			const mockOrders = OrderMockGenerator.generateMany(3);
			orders = await OrderDbService.createMany(
				mockOrders.map(order => ({
					...order,
					Cart: {
						create: {
							CartProducts: {create: {productId: product.id}}
						}
					}
				}))
			);
		});

		it("should return orders", async () => {
			const {statusCode, body} = await requestHandler(ordersHandler);

			expect(statusCode).toBe(200);
			expect(body).toMatchObject(orders);
		});
	});
});
