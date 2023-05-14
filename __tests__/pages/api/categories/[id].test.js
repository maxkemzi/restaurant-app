import {describe, it, expect, beforeEach} from "vitest";
import categoriesHandler from "@/pages/api/categories";
import categoryHandler from "@/pages/api/categories/[id]";
import prisma from "@/prisma/client";
import cleanUp from "@/__tests__/cleanUp";
import mockRequestResponse from "@/__tests__/mockRequestResponse";

describe("/api/categories/:id", () => {
	let category;

	beforeEach(async () => {
		await cleanUp();

		// Create new category
		const {req, res} = mockRequestResponse("POST", {name: "pizzas"});
		await categoriesHandler(req, res);

		category = res._getJSONData();
	});

	describe("PUT", () => {
		it("should update category by id", async () => {
			const {req, res} = mockRequestResponse(
				"PUT",
				{name: "desserts"},
				{id: category.id}
			);
			await categoryHandler(req, res);

			const body = res._getJSONData();

			const updatedCategory = JSON.parse(
				JSON.stringify(
					await prisma.category.findUnique({where: {id: category.id}})
				)
			);

			expect(res.statusCode).toBe(200);
			expect(updatedCategory).toEqual({...category, name: "desserts"});
			expect(body).toEqual(updatedCategory);
		});

		it("should respond with 500 status code", async () => {
			const {req, res} = mockRequestResponse(
				"PUT",
				{name: "desserts"},
				{id: "id"}
			);
			await categoryHandler(req, res);

			expect(res.statusCode).toBe(500);
		});
	});

	describe("DELETE", () => {
		it("should delete category by id", async () => {
			const {req, res} = mockRequestResponse(
				"DELETE",
				{},
				{id: `${category.id}`}
			);
			await categoryHandler(req, res);

			const body = res._getJSONData();

			const deletedCategory = JSON.parse(
				JSON.stringify(
					await prisma.category.findUnique({where: {id: category.id}})
				)
			);

			expect(res.statusCode).toBe(200);
			expect(deletedCategory).toBeNull();
			expect(body).toEqual(category);
		});

		it("should respond with 500 status code", async () => {
			const {req, res} = mockRequestResponse("DELETE", {}, {id: "id"});
			await categoryHandler(req, res);

			expect(res.statusCode).toBe(500);
		});
	});

	describe("GET", () => {
		it("should return category by id", async () => {
			const {req, res} = mockRequestResponse("GET", {}, {id: `${category.id}`});
			await categoryHandler(req, res);

			const body = res._getJSONData();

			expect(res.statusCode).toBe(200);
			expect(body).toEqual(category);
		});

		it("should respond with 500 status code", async () => {
			const {req, res} = mockRequestResponse("GET", {}, {id: "id"});
			await categoryHandler(req, res);

			expect(res.statusCode).toBe(500);
		});
	});
});
