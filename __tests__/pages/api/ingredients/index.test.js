import {describe, it, expect, beforeEach} from "vitest";
import ingredientsHandler from "@/pages/api/ingredients";
import prisma from "@/prisma/client";
import cleanUp from "@/__tests__/cleanUp";
import mockRequestResponse from "@/__tests__/mockRequestResponse";

describe("/api/ingredients", () => {
	beforeEach(async () => {
		await cleanUp();
	});

	describe("POST", () => {
		it("should add ingredient", async () => {
			const {req, res} = mockRequestResponse("POST", {name: "egg"});
			await ingredientsHandler(req, res);

			const body = res._getJSONData();

			const createdIngredient = JSON.parse(
				JSON.stringify(await prisma.ingredient.findFirst())
			);

			expect(res.statusCode).toBe(201);
			expect(createdIngredient).toMatchObject({name: "egg"});
			expect(body).toEqual(createdIngredient);
		});

		it("should respond with 500 status code", async () => {
			const {req, res} = mockRequestResponse("POST", {name: 5});
			await ingredientsHandler(req, res);

			expect(res.statusCode).toBe(500);
		});
	});

	it("should return ingredients", async () => {
		const {req, res} = mockRequestResponse();
		await ingredientsHandler(req, res);

		const body = res._getJSONData();

		expect(res.statusCode).toBe(200);
		expect(body).toEqual([]);
	});
});
