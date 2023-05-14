import {describe, it, expect, beforeEach} from "vitest";
import categoriesHandler from "@/pages/api/categories";
import prisma from "@/prisma/client";
import cleanUp from "@/__tests__/cleanUp";
import mockRequestResponse from "@/__tests__/mockRequestResponse";

describe("/api/categories", () => {
	beforeEach(async () => {
		await cleanUp();
	});

	describe("POST", () => {
		it("should add category", async () => {
			const {req, res} = mockRequestResponse("POST", {name: "pizzas"});
			await categoriesHandler(req, res);

			const body = res._getJSONData();

			const createdCategory = JSON.parse(
				JSON.stringify(await prisma.category.findFirst())
			);

			expect(res.statusCode).toBe(201);
			expect(createdCategory).toMatchObject({name: "pizzas"});
			expect(body).toEqual(createdCategory);
		});

		it("should respond with 500 status code", async () => {
			const {req, res} = mockRequestResponse("POST", {name: 5});
			await categoriesHandler(req, res);

			expect(res.statusCode).toBe(500);
		});
	});

	it("should return categories", async () => {
		const {req, res} = mockRequestResponse();
		await categoriesHandler(req, res);

		const body = res._getJSONData();

		expect(res.statusCode).toBe(200);
		expect(body).toEqual([]);
	});
});
