import {requestHandler} from "@/__tests__/pages/utils";
import {IngredientDbService, cleanUpDatabase} from "@/__tests__/pages/utils/db";
import {IngredientMockGenerator} from "@/__tests__/pages/utils/mocks";
import ingredientHandler from "@/pages/api/ingredients/[id]";
import {beforeEach, describe, expect, it} from "vitest";

describe("/api/ingredients/:id", () => {
	let ingredient;

	beforeEach(async () => {
		await cleanUpDatabase();

		const mockIngredient = IngredientMockGenerator.generate();
		ingredient = await IngredientDbService.create(mockIngredient);
	});

	describe("PUT", () => {
		it("should update ingredient by id", async () => {
			const mockIngredient = IngredientMockGenerator.generate();

			const requestOptions = {
				method: "PUT",
				body: mockIngredient,
				query: {id: ingredient.id}
			};

			const {body, statusCode} = await requestHandler(
				ingredientHandler,
				requestOptions
			);

			expect(statusCode).toBe(200);

			const ingredientFromDb = await IngredientDbService.getById(ingredient.id);

			expect(ingredientFromDb).toMatchObject(mockIngredient);
			expect(body).toEqual(ingredientFromDb);
		});

		it("should respond with 500 status code", async () => {
			const requestOptions = {
				method: "PUT",
				body: {name: false},
				query: {id: ingredient.id}
			};

			const {statusCode} = await requestHandler(
				ingredientHandler,
				requestOptions
			);

			expect(statusCode).toBe(500);
		});
	});

	describe("DELETE", () => {
		it("should delete ingredient by id", async () => {
			const requestOptions = {method: "DELETE", query: {id: ingredient.id}};

			const {body, statusCode} = await requestHandler(
				ingredientHandler,
				requestOptions
			);

			expect(statusCode).toBe(200);

			const existsInDb = await IngredientDbService.exists({id: ingredient.id});
			expect(existsInDb).toBe(false);

			expect(body).toEqual(ingredient);
		});

		it("should respond with 500 status code", async () => {
			const requestOptions = {method: "DELETE", query: {id: "invalid id"}};

			const {statusCode} = await requestHandler(
				ingredientHandler,
				requestOptions
			);

			expect(statusCode).toBe(500);
		});
	});

	describe("GET", () => {
		it("should return ingredient by id", async () => {
			const requestOptions = {query: {id: ingredient.id}};

			const {body, statusCode} = await requestHandler(
				ingredientHandler,
				requestOptions
			);

			expect(statusCode).toBe(200);

			const ingredientFromDb = await IngredientDbService.getById(ingredient.id);
			expect(body).toEqual(ingredientFromDb);
		});

		it("should respond with 500 status code", async () => {
			const requestOptions = {query: {id: "invalid id"}};

			const {statusCode} = await requestHandler(
				ingredientHandler,
				requestOptions
			);

			expect(statusCode).toBe(500);
		});
	});
});
