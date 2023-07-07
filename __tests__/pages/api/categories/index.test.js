import {requestHandler} from "@/__tests__/pages/utils";
import {CategoryDbService, cleanUpDatabase} from "@/__tests__/pages/utils/db";
import {CategoryMockGenerator} from "@/__tests__/pages/utils/mocks";
import categoriesHandler from "@/pages/api/categories";
import {beforeEach, describe, expect, it} from "vitest";

describe("/api/categories", () => {
	beforeEach(async () => {
		await cleanUpDatabase();
	});

	describe("POST", () => {
		it("should add category", async () => {
			const mockCategory = CategoryMockGenerator.generate();

			const requestOptions = {
				method: "POST",
				body: mockCategory
			};

			const {statusCode, body} = await requestHandler(
				categoriesHandler,
				requestOptions
			);

			expect(statusCode).toBe(201);

			const existsInDb = await CategoryDbService.exists(mockCategory);
			expect(existsInDb).toBe(true);

			const categoryFromDb = await CategoryDbService.get(mockCategory);
			expect(body).toEqual(categoryFromDb);
		});

		it("should respond with 500 status code", async () => {
			const mockCategory = {name: false};

			const requestOptions = {method: "POST", body: mockCategory};

			const {statusCode} = await requestHandler(
				categoriesHandler,
				requestOptions
			);

			expect(statusCode).toBe(500);
		});
	});

	describe("GET", () => {
		let categories;

		beforeEach(async () => {
			const mockCategories = CategoryMockGenerator.generateMany(3);
			categories = await CategoryDbService.createMany(mockCategories);
		});

		it("should return categories", async () => {
			const {statusCode, body} = await requestHandler(categoriesHandler);

			expect(statusCode).toBe(200);
			expect(body).toEqual(categories);
		});
	});
});
