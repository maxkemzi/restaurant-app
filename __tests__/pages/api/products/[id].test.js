import {requestHandler} from "@/__tests__/utils";
import {
	CategoryDbService,
	IngredientDbService,
	ProductDbService,
	cleanUpDatabase
} from "@/__tests__/utils/db";
import {
	CategoryMockGenerator,
	IngredientMockGenerator,
	ProductMockGenerator
} from "@/__tests__/utils/mocks";
import productHandler from "@/pages/api/products/[id]";
import {beforeEach, describe, expect, it} from "vitest";

describe("/api/products/:id", () => {
	let product;
	let category;

	beforeEach(async () => {
		await cleanUpDatabase();

		const mockCategory = CategoryMockGenerator.generate();
		category = await CategoryDbService.create(mockCategory);

		const mockIngredient = IngredientMockGenerator.generate();
		const ingredient = await IngredientDbService.create(mockIngredient);

		const mockProduct = ProductMockGenerator.generate(category.id);
		product = await ProductDbService.create({
			...mockProduct,
			ProductIngredients: {create: {data: {ingredientId: ingredient.id}}}
		});
	});

	describe("PUT", () => {
		it("should update product by id", async () => {
			const mockProduct = {name: "new product name"};

			const requestOptions = {
				method: "PUT",
				body: mockProduct,
				query: {id: product.id}
			};

			const {statusCode, body} = await requestHandler(
				productHandler,
				requestOptions
			);

			expect(statusCode).toBe(200);

			const productFromDb = await ProductDbService.getById(product.id);

			expect(productFromDb).toMatchObject(mockProduct);
			expect(body).toMatchObject(productFromDb);
		});

		it("should respond with 500 status code", async () => {
			const requestOptions = {
				method: "PUT",
				body: {name: false},
				query: {id: product.id}
			};

			const {statusCode} = await requestHandler(productHandler, requestOptions);

			expect(statusCode).toBe(500);
		});
	});

	describe("DELETE", () => {
		it("should delete product by id", async () => {
			const requestOptions = {method: "DELETE", query: {id: product.id}};

			const {body, statusCode} = await requestHandler(
				productHandler,
				requestOptions
			);

			expect(statusCode).toBe(200);

			const existsInDb = await ProductDbService.exists({id: product.id});
			expect(existsInDb).toBe(false);

			expect(body).toMatchObject(product);
		});

		it("should respond with 500 status code", async () => {
			const requestOptions = {method: "DELETE", query: {id: "invalid id"}};

			const {statusCode} = await requestHandler(productHandler, requestOptions);

			expect(statusCode).toBe(500);
		});
	});

	describe("GET", () => {
		it("should return product by id", async () => {
			const requestOptions = {query: {id: product.id}};

			const {body, statusCode} = await requestHandler(
				productHandler,
				requestOptions
			);

			expect(statusCode).toBe(200);

			const productFromDb = await ProductDbService.getById(product.id);
			expect(body).toMatchObject(productFromDb);
		});

		it("should respond with 500 status code", async () => {
			const requestOptions = {query: {id: "invalid id"}};

			const {statusCode} = await requestHandler(productHandler, requestOptions);

			expect(statusCode).toBe(500);
		});
	});
});
