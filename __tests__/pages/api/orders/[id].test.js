import {requestHandler} from "@/__tests__/utils";
import {
	CategoryDbService,
	IngredientDbService,
	ProductDbService,
	OrderDbService,
	cleanUpDatabase
} from "@/__tests__/utils/db";
import {
	CategoryMockGenerator,
	IngredientMockGenerator,
	OrderMockGenerator,
	ProductMockGenerator
} from "@/__tests__/utils/mocks";
import orderHandler from "@/pages/api/orders/[id]";
import {beforeEach, describe, expect, it} from "vitest";

describe("/api/orders/:id", () => {
	let order;

	beforeEach(async () => {
		await cleanUpDatabase();

		const mockCategory = CategoryMockGenerator.generate();
		const category = await CategoryDbService.create(mockCategory);

		const mockIngredient = IngredientMockGenerator.generate();
		const ingredient = await IngredientDbService.create(mockIngredient);

		const mockProduct = ProductMockGenerator.generate(category.id);
		const product = await ProductDbService.create({
			...mockProduct,
			ProductIngredients: {create: {data: {ingredientId: ingredient.id}}}
		});

		const mockOrder = OrderMockGenerator.generate();
		order = await OrderDbService.create({
			...mockOrder,
			Cart: {create: {CartProducts: {create: {productId: product.id}}}}
		});
	});

	describe("PUT", () => {
		it("should update order by id", async () => {
			const mockOrder = {clientName: "new order name"};

			const requestOptions = {
				method: "PUT",
				body: mockOrder,
				query: {id: order.id}
			};

			const {statusCode, body} = await requestHandler(
				orderHandler,
				requestOptions
			);

			expect(statusCode).toBe(200);

			const orderFromDb = await OrderDbService.getById(order.id);

			expect(orderFromDb).toMatchObject(mockOrder);
			expect(body).toMatchObject(orderFromDb);
		});

		it("should respond with 500 status code", async () => {
			const mockOrder = {clientName: false};

			const requestOptions = {method: "PUT", body: mockOrder};

			const {statusCode} = await requestHandler(orderHandler, requestOptions);

			expect(statusCode).toBe(500);
		});
	});

	describe("DELETE", () => {
		it("should delete order by id", async () => {
			const requestOptions = {method: "DELETE", query: {id: order.id}};

			const {body, statusCode} = await requestHandler(
				orderHandler,
				requestOptions
			);

			expect(statusCode).toBe(200);

			const existsInDb = await OrderDbService.exists({id: order.id});
			expect(existsInDb).toBe(false);

			expect(body).toMatchObject(order);
		});

		it("should respond with 500 status code", async () => {
			const requestOptions = {method: "DELETE", query: {id: "invalid id"}};

			const {statusCode} = await requestHandler(orderHandler, requestOptions);

			expect(statusCode).toBe(500);
		});
	});

	describe("GET", () => {
		it("should return order by id", async () => {
			const requestOptions = {query: {id: order.id}};

			const {body, statusCode} = await requestHandler(
				orderHandler,
				requestOptions
			);

			expect(statusCode).toBe(200);

			const orderFromDb = await OrderDbService.getById(order.id);
			expect(body).toMatchObject(orderFromDb);
		});

		it("should respond with 500 status code", async () => {
			const requestOptions = {query: {id: "invalid id"}};

			const {statusCode} = await requestHandler(orderHandler, requestOptions);

			expect(statusCode).toBe(500);
		});
	});
});
