import {describe, it, expect, beforeEach} from "vitest";
import ingredientsHandler from "@/pages/api/ingredients";
import ingredientHandler from "@/pages/api/ingredients/[id]";
import prisma from "@/prisma/client";
import cleanUp from "@/__tests__/cleanUp";
import mockRequestResponse from "@/__tests__/mockRequestResponse";

describe("/api/ingredients/:id", () => {
	let ingredient;

	beforeEach(async () => {
		await cleanUp();

		// Create new category
		const {req, res} = mockRequestResponse("POST", {name: "egg"});
		await ingredientsHandler(req, res);

		ingredient = res._getJSONData();
	});

	describe("PUT", () => {
		it("should update ingredient by id", async () => {
			const {req, res} = mockRequestResponse(
				"PUT",
				{name: "milk"},
				{id: ingredient.id}
			);
			await ingredientHandler(req, res);

			const body = res._getJSONData();

			const updatedIngredient = JSON.parse(
				JSON.stringify(
					await prisma.ingredient.findUnique({where: {id: ingredient.id}})
				)
			);

			expect(res.statusCode).toBe(200);
			expect(updatedIngredient).toEqual({...ingredient, name: "milk"});
			expect(body).toEqual(updatedIngredient);
		});

		it("should respond with 500 status code", async () => {
			const {req, res} = mockRequestResponse("PUT", {}, {id: "id"});
			await ingredientHandler(req, res);

			expect(res.statusCode).toBe(500);
		});
	});

	describe("DELETE", () => {
		it("should delete ingredient by id", async () => {
			const {req, res} = mockRequestResponse(
				"DELETE",
				{},
				{id: `${ingredient.id}`}
			);
			await ingredientHandler(req, res);

			const body = res._getJSONData();

			const deletedIngredient = JSON.parse(
				JSON.stringify(
					await prisma.ingredient.findUnique({where: {id: ingredient.id}})
				)
			);

			expect(res.statusCode).toBe(200);
			expect(deletedIngredient).toBeNull();
			expect(body).toEqual(ingredient);
		});

		it("should respond with 500 status code", async () => {
			const {req, res} = mockRequestResponse("DELETE", {}, {id: "id"});
			await ingredientHandler(req, res);

			expect(res.statusCode).toBe(500);
		});
	});

	describe("GET", () => {
		it("should return ingredient by id", async () => {
			const {req, res} = mockRequestResponse(
				"GET",
				{},
				{id: `${ingredient.id}`}
			);
			await ingredientHandler(req, res);

			const body = res._getJSONData();

			expect(res.statusCode).toBe(200);
			expect(body).toEqual(ingredient);
		});

		it("should respond with 500 status code", async () => {
			const {req, res} = mockRequestResponse("GET", {}, {id: "id"});
			await ingredientHandler(req, res);

			expect(res.statusCode).toBe(500);
		});
	});
});
