import {
	createIngredient,
	deleteIngredientById,
	getIngredientById,
	getIngredients,
	updateIngredientById
} from "@/src/lib/prisma/ingredients";
import prismaMock from "@/src/prisma/__mocks__/client";
import {describe, expect, it} from "vitest";

describe("ingredients service", () => {
	describe("get ingredients", () => {
		it("should return all ingredients", async () => {
			const ingredientMock = {id: 1, name: "ingredient"};

			prismaMock.ingredient.findMany.mockResolvedValue([ingredientMock]);
			const ingredients = await getIngredients();

			expect(ingredients).toStrictEqual([ingredientMock]);
		});

		it("should throw an error", async () => {
			prismaMock.ingredient.findMany.mockImplementation(() => {
				throw new Error();
			});

			expect(getIngredients()).rejects.toThrow();
		});
	});

	describe("create ingredient", () => {
		it("should create an ingredient", async () => {
			const ingredientMock = {id: 1, name: "ingredient"};

			prismaMock.ingredient.create.mockResolvedValue(ingredientMock);
			const ingredient = await createIngredient(ingredientMock);

			expect(prismaMock.ingredient.create).toHaveBeenCalledWith({
				data: ingredientMock
			});
			expect(ingredient).toStrictEqual(ingredientMock);
		});

		it("should throw an error", async () => {
			prismaMock.ingredient.create.mockImplementation(() => {
				throw new Error();
			});

			expect(createIngredient()).rejects.toThrow();
		});
	});

	describe("delete ingredient by id", () => {
		it("should delete a ingredient by id", async () => {
			const ingredientMock = {id: 1, name: "ingredient"};

			prismaMock.ingredient.delete.mockResolvedValue(ingredientMock);
			const ingredient = await deleteIngredientById(ingredientMock.id);

			expect(prismaMock.ingredient.delete).toHaveBeenCalledWith({
				where: {id: ingredientMock.id}
			});
			expect(ingredient).toStrictEqual(ingredientMock);
		});

		it("should throw an error", async () => {
			prismaMock.ingredient.delete.mockImplementation(() => {
				throw new Error();
			});

			expect(deleteIngredientById()).rejects.toThrow();
		});
	});

	describe("update ingredient by id", () => {
		it("should update an ingredient by id", async () => {
			const ingredientMock = {id: 1, name: "ingredient"};

			prismaMock.ingredient.update.mockResolvedValue(ingredientMock);
			const ingredient = await updateIngredientById(
				ingredientMock.id,
				ingredientMock
			);

			expect(prismaMock.ingredient.update).toHaveBeenCalledWith({
				where: {id: ingredientMock.id},
				data: ingredientMock
			});
			expect(ingredient).toStrictEqual(ingredientMock);
		});

		it("should throw an error", async () => {
			prismaMock.ingredient.update.mockImplementation(() => {
				throw new Error();
			});

			expect(updateIngredientById()).rejects.toThrow();
		});
	});

	describe("get ingredient by id", () => {
		it("should return an ingredient by id", async () => {
			const ingredientMock = {id: 1, name: "ingredient"};

			prismaMock.ingredient.findUnique.mockResolvedValue(ingredientMock);
			const ingredient = await getIngredientById(ingredientMock.id);

			expect(prismaMock.ingredient.findUnique).toHaveBeenCalledWith({
				where: {id: ingredientMock.id}
			});
			expect(ingredient).toStrictEqual(ingredientMock);
		});

		it("should throw an error", async () => {
			prismaMock.ingredient.findUnique.mockImplementation(() => {
				throw new Error();
			});

			expect(getIngredientById()).rejects.toThrow();
		});
	});
});
