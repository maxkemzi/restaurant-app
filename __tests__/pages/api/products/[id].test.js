import {describe, it, expect, beforeEach} from "vitest";
import categoriesHandler from "@/pages/api/categories";
import ingredientsHandler from "@/pages/api/ingredients";
import productsHandler from "@/pages/api/products";
import productHandler from "@/pages/api/products/[id]";
import prisma from "@/prisma/client";
import cleanUp from "@/__tests__/cleanUp";
import mockRequestResponse from "@/__tests__/mockRequestResponse";

describe("/api/products/:id", () => {
	let productFromCreateReq;
	let ingredients;

	beforeEach(async () => {
		await cleanUp();

		// Create category
		const {req: createCategoryReq, res: createCategoryRes} =
			mockRequestResponse("POST", {name: "category"});
		await categoriesHandler(createCategoryReq, createCategoryRes);
		const category = createCategoryRes._getJSONData();

		// Create first ingredient
		const {req: createIngredient1Req, res: createIngredient1Res} =
			mockRequestResponse("POST", {name: "egg"});
		await ingredientsHandler(createIngredient1Req, createIngredient1Res);
		const ingredient1 = createIngredient1Res._getJSONData();

		// Create second ingredient
		const {req: createIngredient2Req, res: createIngredient2Res} =
			mockRequestResponse("POST", {name: "milk"});
		await ingredientsHandler(createIngredient2Req, createIngredient2Res);
		const ingredient2 = createIngredient2Res._getJSONData();

		ingredients = [ingredient1, ingredient2];

		// Create product
		const {req, res} = mockRequestResponse("POST", {
			image: "image",
			name: "name",
			category_id: category.id,
			price_USD: 500,
			weight: 500,
			size_cm: 30,
			is_vegan: false,
			is_spicy: false,
			ingredient_ids: [ingredient1.id]
		});
		await productsHandler(req, res);

		productFromCreateReq = res._getJSONData();
	});

	describe("PUT", () => {
		it("should update product by id", async () => {
			const newName = "pizza";
			const newIngredientIds = ingredients.map(ingredient => ingredient.id);

			const {req, res} = mockRequestResponse(
				"PUT",
				{name: newName, ingredient_ids: newIngredientIds},
				{id: productFromCreateReq.id}
			);
			await productHandler(req, res);

			const body = res._getJSONData();

			const productThatMustBeUpdated = JSON.parse(
				JSON.stringify(
					await prisma.product.findUnique({
						where: {id: productFromCreateReq.id},
						include: {ProductIngredients: {include: {Ingredient: true}}}
					})
				)
			);

			const expectedProduct = {
				...productFromCreateReq,
				name: newName,
				ProductIngredients: ingredients.map(ingredient => ({
					ingredient_id: ingredient.id,
					product_id: productFromCreateReq.id,
					Ingredient: ingredient
				}))
			};

			expect(res.statusCode).toBe(200);
			expect(productThatMustBeUpdated).toMatchObject(expectedProduct);
			expect(body).toMatchObject(expectedProduct);
		});

		it("should respond with 500 status code", async () => {
			const newName = "pizza";

			const {req, res} = mockRequestResponse(
				"PUT",
				{name: newName},
				{id: "id"}
			);
			await productHandler(req, res);

			expect(res.statusCode).toBe(500);
		});
	});

	describe("DELETE", () => {
		it("should delete product by id", async () => {
			const {req, res} = mockRequestResponse(
				"DELETE",
				{},
				{id: productFromCreateReq.id}
			);
			await productHandler(req, res);

			const body = res._getJSONData();

			const productThatMustBeDeleted = await prisma.product.findUnique({
				where: {id: productFromCreateReq.id}
			});

			expect(res.statusCode).toBe(200);
			expect(productThatMustBeDeleted).toBeNull();
			expect(body).toEqual(productFromCreateReq);
		});

		it("should respond with 500 status code", async () => {
			const {req, res} = mockRequestResponse("DELETE", {}, {id: "id"});
			await productHandler(req, res);

			expect(res.statusCode).toBe(500);
		});
	});

	describe("GET", () => {
		it("should return product by id", async () => {
			const {req, res} = mockRequestResponse(
				"GET",
				{},
				{id: productFromCreateReq.id}
			);
			await productHandler(req, res);

			const body = res._getJSONData();

			expect(res.statusCode).toBe(200);
			expect(body).toEqual(productFromCreateReq);
		});

		it("should respond with 500 status code", async () => {
			const {req, res} = mockRequestResponse("GET", {}, {id: "id"});
			await productHandler(req, res);

			expect(res.statusCode).toBe(500);
		});
	});
});
