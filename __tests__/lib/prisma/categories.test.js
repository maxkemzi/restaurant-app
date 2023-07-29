import {
	createCategory,
	deleteCategoryById,
	getCategories,
	getCategoryById,
	updateCategoryById
} from "@/src/lib/prisma/categories";
import prismaMock from "@/src/prisma/__mocks__/client";
import {describe, expect, it} from "vitest";

describe("categories service", () => {
	describe("get categories", () => {
		it("should return all categories", async () => {
			const categoryMock = {id: 1, name: "category"};

			prismaMock.category.findMany.mockResolvedValue([categoryMock]);
			const categories = await getCategories();

			expect(categories).toStrictEqual([categoryMock]);
		});

		it("should throw an error", async () => {
			prismaMock.category.findMany.mockImplementation(() => {
				throw new Error();
			});

			expect(getCategories()).rejects.toThrow();
		});
	});

	describe("create category", () => {
		it("should create a category", async () => {
			const categoryMock = {id: 1, name: "category"};

			prismaMock.category.create.mockResolvedValue(categoryMock);
			const category = await createCategory(categoryMock);

			expect(prismaMock.category.create).toHaveBeenCalledWith({
				data: categoryMock
			});
			expect(category).toStrictEqual(categoryMock);
		});

		it("should throw an error", async () => {
			prismaMock.category.create.mockImplementation(() => {
				throw new Error();
			});

			expect(createCategory()).rejects.toThrow();
		});
	});

	describe("delete category by id", () => {
		it("should delete a category by id", async () => {
			const categoryMock = {id: 1, name: "category"};

			prismaMock.category.delete.mockResolvedValue(categoryMock);
			const category = await deleteCategoryById(categoryMock.id);

			expect(prismaMock.category.delete).toHaveBeenCalledWith({
				where: {id: categoryMock.id}
			});
			expect(category).toStrictEqual(categoryMock);
		});

		it("should throw an error", async () => {
			prismaMock.category.delete.mockImplementation(() => {
				throw new Error();
			});

			expect(deleteCategoryById()).rejects.toThrow();
		});
	});

	describe("update category by id", () => {
		it("should update a category by id", async () => {
			const categoryMock = {id: 1, name: "category"};

			prismaMock.category.update.mockResolvedValue(categoryMock);
			const category = await updateCategoryById(categoryMock.id, categoryMock);

			expect(prismaMock.category.update).toHaveBeenCalledWith({
				where: {id: categoryMock.id},
				data: categoryMock
			});
			expect(category).toStrictEqual(categoryMock);
		});

		it("should throw an error", async () => {
			prismaMock.category.update.mockImplementation(() => {
				throw new Error();
			});

			expect(updateCategoryById()).rejects.toThrow();
		});
	});

	describe("get category by id", () => {
		it("should return a category by id", async () => {
			const categoryMock = {id: 1, name: "category"};

			prismaMock.category.findUnique.mockResolvedValue(categoryMock);
			const category = await getCategoryById(categoryMock.id);

			expect(prismaMock.category.findUnique).toHaveBeenCalledWith({
				where: {id: categoryMock.id}
			});
			expect(category).toStrictEqual(categoryMock);
		});

		it("should throw an error", async () => {
			prismaMock.category.findUnique.mockImplementation(() => {
				throw new Error();
			});

			expect(getCategoryById()).rejects.toThrow();
		});
	});
});
