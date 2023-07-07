import {requestHandler} from "@/__tests__/pages/utils";
import {CategoryDbService, cleanUpDatabase} from "@/__tests__/pages/utils/db";
import {CategoryMockGenerator} from "@/__tests__/pages/utils/mocks";
import categoryHandler from "@/pages/api/categories/[id]";
import {beforeEach, describe, expect, it} from "vitest";

describe("/api/categories/:id", () => {
	let category;

	beforeEach(async () => {
		await cleanUpDatabase();

		const mockCategory = CategoryMockGenerator.generate();
		category = await CategoryDbService.create(mockCategory);
	});

	describe("PUT", () => {
		it("should update category by id", async () => {
			const mockCategory = CategoryMockGenerator.generate();

			const requestOptions = {
				method: "PUT",
				body: mockCategory,
				query: {id: category.id}
			};

			const {body, statusCode} = await requestHandler(
				categoryHandler,
				requestOptions
			);

			expect(statusCode).toBe(200);

			const categoryFromDb = await CategoryDbService.getById(category.id);

			expect(categoryFromDb).toMatchObject(mockCategory);
			expect(body).toEqual(categoryFromDb);
		});

		it("should respond with 500 status code", async () => {
			const requestOptions = {
				method: "PUT",
				body: {name: false},
				query: {id: category.id}
			};

			const {statusCode} = await requestHandler(
				categoryHandler,
				requestOptions
			);

			expect(statusCode).toBe(500);
		});
	});

	describe("DELETE", () => {
		it("should delete category by id", async () => {
			const requestOptions = {
				method: "DELETE",
				query: {id: category.id}
			};

			const {body, statusCode} = await requestHandler(
				categoryHandler,
				requestOptions
			);

			expect(statusCode).toBe(200);

			const existsInDb = await CategoryDbService.exists({id: category.id});
			expect(existsInDb).toBe(false);

			expect(body).toEqual(category);
		});

		it("should respond with 500 status code", async () => {
			const requestOptions = {
				method: "DELETE",
				query: {id: "invalid id"}
			};

			const {statusCode} = await requestHandler(
				categoryHandler,
				requestOptions
			);

			expect(statusCode).toBe(500);
		});
	});

	describe("GET", () => {
		it("should return category by id", async () => {
			const requestOptions = {
				query: {id: category.id}
			};

			const {body, statusCode} = await requestHandler(
				categoryHandler,
				requestOptions
			);

			expect(statusCode).toBe(200);

			const categoryFromDb = await CategoryDbService.getById(category.id);
			expect(body).toEqual(categoryFromDb);
		});

		it("should respond with 500 status code", async () => {
			const requestOptions = {
				query: {id: "invalid id"}
			};

			const {statusCode} = await requestHandler(
				categoryHandler,
				requestOptions
			);

			expect(statusCode).toBe(500);
		});
	});
});
