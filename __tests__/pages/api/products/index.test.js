import {requestHandler} from "@/__tests__/pages/utils";
import {
	CategoryDbService,
	IngredientDbService,
	ProductDbService,
	cleanUpDatabase
} from "@/__tests__/pages/utils/db";
import {
	CategoryMockGenerator,
	IngredientMockGenerator,
	ProductMockGenerator
} from "@/__tests__/pages/utils/mocks";
import productsHandler from "@/pages/api/products";
import {beforeEach, describe, expect, it} from "vitest";

describe("/api/products", () => {
	let category;
	let ingredient;

	beforeEach(async () => {
		await cleanUpDatabase();

		const mockCategory = CategoryMockGenerator.generate();
		category = await CategoryDbService.create(mockCategory);

		const mockIngredient = IngredientMockGenerator.generate();
		ingredient = await IngredientDbService.create(mockIngredient);
	});

	describe("POST", () => {
		it("should add product", async () => {
			const mockProduct = ProductMockGenerator.generate(category.id);

			const requestOptions = {
				method: "POST",
				body: {...mockProduct, ingredientIds: [ingredient.id]}
			};

			const {statusCode, body} = await requestHandler(
				productsHandler,
				requestOptions
			);

			expect(statusCode).toBe(201);

			const existsInDb = await ProductDbService.exists(mockProduct);
			expect(existsInDb).toBe(true);

			const productFromDb = await ProductDbService.get(mockProduct);
			expect(body).toMatchObject(productFromDb);
		});

		it("should respond with 500 status code", async () => {
			const mockProduct = {name: false};

			const requestOptions = {method: "POST", body: mockProduct};

			const {statusCode} = await requestHandler(
				productsHandler,
				requestOptions
			);

			expect(statusCode).toBe(500);
		});
	});

	describe("GET", () => {
		describe("should respond with 500 status code", async () => {
			it("pass invalid is vegan value", async () => {
				const requestOptions = {method: "GET", query: {isVegan: "invalid"}};

				const {statusCode} = await requestHandler(
					productsHandler,
					requestOptions
				);

				expect(statusCode).toBe(500);
			});

			it("pass invalid is spicy value", async () => {
				const requestOptions = {method: "GET", query: {isSpicy: "invalid"}};

				const {statusCode} = await requestHandler(
					productsHandler,
					requestOptions
				);

				expect(statusCode).toBe(500);
			});

			it("pass invalid category id value", async () => {
				const requestOptions = {method: "GET", query: {categoryId: "invalid"}};

				const {statusCode} = await requestHandler(
					productsHandler,
					requestOptions
				);

				expect(statusCode).toBe(500);
			});

			it("pass invalid category name value", async () => {
				const requestOptions = {
					method: "GET",
					query: {categoryName: false}
				};

				const {statusCode} = await requestHandler(
					productsHandler,
					requestOptions
				);

				expect(statusCode).toBe(500);
			});
		});

		describe("should return products", () => {
			let products;

			beforeEach(async () => {
				const mockProducts = ProductMockGenerator.generateMany(3, category.id);
				products = await ProductDbService.createMany(mockProducts);
			});

			it("should return all products", async () => {
				const {statusCode, body} = await requestHandler(productsHandler);

				expect(statusCode).toBe(200);
				expect(body).toMatchObject(products);
			});

			it("should return only spicy products", async () => {
				const requestOptions = {query: {isSpicy: "true"}};

				const {statusCode, body} = await requestHandler(
					productsHandler,
					requestOptions
				);

				expect(statusCode).toBe(200);

				const spicyProductsFromDb = await ProductDbService.getMany({
					isSpicy: true
				});
				expect(body).toMatchObject(spicyProductsFromDb);
			});

			it("should return only vegan products", async () => {
				const requestOptions = {query: {isVegan: "true"}};

				const {statusCode, body} = await requestHandler(
					productsHandler,
					requestOptions
				);

				expect(statusCode).toBe(200);

				const veganProductsFromDb = await ProductDbService.getMany({
					isVegan: true
				});
				expect(body).toMatchObject(veganProductsFromDb);
			});

			it("should return products sorted by price in descending order", async () => {
				const requestOptions = {query: {sort: "priceDesc"}};

				const {statusCode, body} = await requestHandler(
					productsHandler,
					requestOptions
				);

				expect(statusCode).toBe(200);

				const productsFromDb = await ProductDbService.getMany(
					{},
					{priceUsd: "desc"}
				);
				expect(body).toMatchObject(productsFromDb);
			});

			it("should return products sorted by price in ascending order", async () => {
				const requestOptions = {query: {sort: "priceAsc"}};

				const {statusCode, body} = await requestHandler(
					productsHandler,
					requestOptions
				);

				expect(statusCode).toBe(200);

				const productsFromDb = await ProductDbService.getMany(
					{},
					{priceUsd: "asc"}
				);
				expect(body).toMatchObject(productsFromDb);
			});
		});
	});
});
