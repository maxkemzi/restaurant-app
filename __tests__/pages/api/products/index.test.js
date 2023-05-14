import {describe, it, expect, beforeEach} from "vitest";
import categoriesHandler from "@/pages/api/categories";
import ingredientsHandler from "@/pages/api/ingredients";
import productsHandler from "@/pages/api/products";
import prisma from "@/prisma/client";
import cleanUp from "@/__tests__/cleanUp";
import mockRequestResponse from "@/__tests__/mockRequestResponse";

describe("/api/products", () => {
	let mockBody;
	let mockProduct;
	let mockProductWithIncludedRelations;

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

		mockProduct = {
			image: "image",
			name: "name",
			category_id: category.id,
			price_USD: 500,
			weight: 500,
			size_cm: 30,
			is_vegan: false,
			is_spicy: false
		};

		mockProductWithIncludedRelations = {
			...mockProduct,
			ProductIngredients: [
				{ingredient_id: ingredient.id, Ingredient: ingredient}
			]
		};

		mockBody = {
			...mockProduct,
			ingredient_ids: [ingredient.id]
		};
	});

	describe("POST", () => {
		it("should add product", async () => {
			const {req, res} = mockRequestResponse("POST", mockBody);
			await productsHandler(req, res);

			const body = res._getJSONData();

			const createdProduct = await prisma.product.findFirst();

			expect(res.statusCode).toBe(201);
			expect(createdProduct).toMatchObject(mockProduct);
			expect(body).toMatchObject(mockProductWithIncludedRelations);
		});

		it("should respond with 500 status code", async () => {
			const {req, res} = mockRequestResponse("POST", {});
			await productsHandler(req, res);

			expect(res.statusCode).toBe(500);
		});
	});

	describe("GET", () => {
		it("should return an empty array", async () => {
			const {req, res} = mockRequestResponse();
			await productsHandler(req, res);

			const body = res._getJSONData();

			expect(res.statusCode).toBe(200);
			expect(body).toEqual([]);
		});

		describe("should respond with 500 status code", async () => {
			it("pass invalid is_vegan value", async () => {
				const {req, res} = mockRequestResponse("GET", {}, {is_vegan: "5"});
				await productsHandler(req, res);

				expect(res.statusCode).toBe(500);
			});

			it("pass invalid is_spicy value", async () => {
				const {req, res} = mockRequestResponse("GET", {}, {is_spicy: "5"});
				await productsHandler(req, res);

				expect(res.statusCode).toBe(500);
			});

			it("pass invalid category_id value", async () => {
				const {req, res} = mockRequestResponse("GET", {}, {category_id: "id"});
				await productsHandler(req, res);

				expect(res.statusCode).toBe(500);
			});

			it("pass invalid category_name value", async () => {
				const {req, res} = mockRequestResponse(
					"GET",
					{},
					{category_name: false}
				);
				await productsHandler(req, res);

				expect(res.statusCode).toBe(500);
			});
		});

		describe("should return products", () => {
			let mockBodies;
			let productsFromResponse;

			beforeEach(async () => {
				mockBodies = [
					{...mockBody, name: "pizza", price_USD: 500},
					{...mockBody, name: "cake", is_vegan: true, price_USD: 300},
					{...mockBody, name: "wok", is_spicy: true, price_USD: 400}
				];

				const createProduct = async body => {
					const {req: createProductReq, res: createProductRes} =
						mockRequestResponse("POST", body);
					await productsHandler(createProductReq, createProductRes);
					return createProductRes._getJSONData();
				};

				// Create products
				await Promise.all(mockBodies.map(body => createProduct(body)));

				// Get created products
				const {req: getProductsReq, res: getProductsRes} =
					mockRequestResponse();
				await productsHandler(getProductsReq, getProductsRes);
				productsFromResponse = getProductsRes._getJSONData();
			});

			it("should return all products", async () => {
				const {req, res} = mockRequestResponse("GET", {});
				await productsHandler(req, res);

				const body = res._getJSONData();

				expect(res.statusCode).toBe(200);
				expect(body).toEqual(productsFromResponse);
			});

			it("should return only spicy products", async () => {
				const {req, res} = mockRequestResponse("GET", {}, {is_spicy: "true"});
				await productsHandler(req, res);

				const body = res._getJSONData();

				expect(res.statusCode).toBe(200);
				expect(body).toEqual(
					productsFromResponse.filter(product => product.is_spicy === true)
				);
			});

			it("should return only vegan products", async () => {
				const {req, res} = mockRequestResponse("GET", {}, {is_vegan: "true"});
				await productsHandler(req, res);

				const body = res._getJSONData();

				expect(res.statusCode).toBe(200);
				expect(body).toEqual(
					productsFromResponse.filter(product => product.is_vegan === true)
				);
			});

			it("should return non-vegan and non-spicy products", async () => {
				const {req, res} = mockRequestResponse(
					"GET",
					{},
					{is_vegan: "false", is_spicy: "false"}
				);
				await productsHandler(req, res);

				const body = res._getJSONData();

				expect(res.statusCode).toBe(200);
				expect(body).toEqual(
					productsFromResponse.filter(
						product => product.is_vegan === false && product.is_spicy === false
					)
				);
			});

			it("should return products sorted by price in descending order", async () => {
				const {req, res} = mockRequestResponse("GET", {}, {sort: "price_desc"});
				await productsHandler(req, res);

				const body = res._getJSONData();

				expect(res.statusCode).toBe(200);
				expect(body).toEqual(
					productsFromResponse.sort((a, b) => (a.price_USD - b.price_USD) * -1)
				);
			});

			it("should return products sorted by price in ascending order", async () => {
				const {req, res} = mockRequestResponse("GET", {}, {sort: "price_asc"});
				await productsHandler(req, res);

				const body = res._getJSONData();

				expect(res.statusCode).toBe(200);
				expect(body).toEqual(
					productsFromResponse.sort((a, b) => a.price_USD - b.price_USD)
				);
			});
		});
	});
});
