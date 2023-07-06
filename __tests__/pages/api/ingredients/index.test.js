import {requestHandler} from "@/__tests__/utils";
import {IngredientDbService, cleanUpDatabase} from "@/__tests__/utils/db";
import {IngredientMockGenerator} from "@/__tests__/utils/mocks";
import ingredientsHandler from "@/pages/api/ingredients";
import {beforeEach, describe, expect, it} from "vitest";

describe("/api/ingredients", () => {
	beforeEach(async () => {
		await cleanUpDatabase();
	});

	describe("POST", () => {
		it("should add ingredient", async () => {
			const mockIngredient = IngredientMockGenerator.generate();

			const requestOptions = {method: "POST", body: mockIngredient};

			const {body, statusCode} = await requestHandler(
				ingredientsHandler,
				requestOptions
			);

			expect(statusCode).toBe(201);

			const existsInDb = await IngredientDbService.exists(mockIngredient);
			expect(existsInDb).toBe(true);

			const ingredientFromDb = await IngredientDbService.get(mockIngredient);
			expect(body).toEqual(ingredientFromDb);
		});

		it("should respond with 500 status code", async () => {
			const requestOptions = {
				method: "POST",
				body: {name: false}
			};

			const {statusCode} = await requestHandler(
				ingredientsHandler,
				requestOptions
			);

			expect(statusCode).toBe(500);
		});
	});

	describe("GET", () => {
		let ingredients;

		beforeEach(async () => {
			const mockIngredients = IngredientMockGenerator.generateMany(3);
			ingredients = await IngredientDbService.createMany(mockIngredients);
		});

		it("should return ingredients", async () => {
			const {body, statusCode} = await requestHandler(ingredientsHandler);

			expect(statusCode).toBe(200);
			expect(body).toEqual(ingredients);
		});
	});
});
