import {
	createProduct,
	deleteProductById,
	getProductById,
	getProducts,
	updateProductById
} from "@/lib/prisma/products";
import prismaMock from "@/prisma/__mocks__/client";
import {describe, expect, it} from "vitest";

describe("products service", () => {
	const defaultQueryOptions = {
		include: {ProductIngredients: {include: {Ingredient: true}}}
	};

	describe("get products", () => {
		const initialQueryOptions = {
			...defaultQueryOptions,
			where: {AND: []}
		};

		it("should return all products", async () => {
			const productMock = {id: 1, name: "product"};

			prismaMock.product.findMany.mockResolvedValue([productMock]);
			const products = await getProducts();

			expect(products).toStrictEqual([productMock]);
		});

		it("should be called without parameters", async () => {
			await getProducts();

			expect(prismaMock.product.findMany).toHaveBeenCalledWith(
				initialQueryOptions
			);
		});

		it("should be called with filter parameters", async () => {
			const params = {
				isVegan: false,
				isSpicy: false,
				categoryId: 1,
				categoryName: "category"
			};

			await getProducts(params);

			expect(prismaMock.product.findMany).toHaveBeenCalledWith({
				...initialQueryOptions,
				where: {
					AND: [
						{Category: {is: {id: params.categoryId}}},
						{Category: {is: {name: params.categoryName}}}
					],
					isVegan: params.isVegan,
					isSpicy: params.isSpicy
				}
			});
		});

		it("should be called with order by parameters", async () => {
			await getProducts({sort: "priceDesc"});

			expect(prismaMock.product.findMany).toHaveBeenCalledWith({
				...initialQueryOptions,
				orderBy: {priceUsd: "desc"}
			});

			await getProducts({sort: "priceAsc"});

			expect(prismaMock.product.findMany).toHaveBeenCalledWith({
				...initialQueryOptions,
				orderBy: {priceUsd: "asc"}
			});
		});

		it("should throw an error", async () => {
			prismaMock.product.findMany.mockImplementation(() => {
				throw new Error();
			});

			expect(getProducts()).rejects.toThrow();
		});
	});

	describe("create product", () => {
		it("should create a product", async () => {
			const productMock = {
				id: 1,
				name: "product",
				ingredientIds: [1],
				categoryId: 1
			};

			prismaMock.product.create.mockResolvedValue(productMock);
			const product = await createProduct(productMock);

			const ingredients = productMock.ingredientIds.map(id => ({
				ingredientId: id
			}));

			expect(prismaMock.product.create).toHaveBeenCalledWith({
				...defaultQueryOptions,
				data: {
					id: productMock.id,
					name: productMock.name,
					Category: {connect: {id: productMock.categoryId}},
					ProductIngredients: {createMany: {data: ingredients}}
				}
			});
			expect(product).toStrictEqual(productMock);
		});

		it("should throw an error", async () => {
			prismaMock.product.create.mockImplementation(() => {
				throw new Error();
			});

			expect(createProduct()).rejects.toThrow();
		});
	});

	describe("delete product by id", () => {
		it("should delete a product by id", async () => {
			const productMock = {id: 1, name: "product"};

			prismaMock.product.delete.mockResolvedValue(productMock);
			const product = await deleteProductById(productMock.id);

			expect(prismaMock.product.delete).toHaveBeenCalledWith({
				...defaultQueryOptions,
				where: {id: productMock.id}
			});
			expect(product).toStrictEqual(productMock);
		});

		it("should throw an error", async () => {
			prismaMock.product.delete.mockImplementation(() => {
				throw new Error();
			});

			expect(deleteProductById()).rejects.toThrow();
		});
	});

	describe("update product by id", () => {
		it("should update an product by id", async () => {
			const productMock = {id: 1, name: "product", ingredientIds: [1]};

			prismaMock.product.update.mockResolvedValue(productMock);
			const product = await updateProductById(productMock.id, productMock);

			const ingredients = productMock.ingredientIds.map(id => ({
				ingredientId: id
			}));

			expect(prismaMock.product.update).toHaveBeenCalledWith({
				...defaultQueryOptions,
				where: {id: productMock.id},
				data: {
					id: productMock.id,
					name: productMock.name,
					ProductIngredients: {deleteMany: {}, createMany: {data: ingredients}}
				}
			});
			expect(product).toStrictEqual(productMock);
		});

		it("should throw an error", async () => {
			prismaMock.product.update.mockImplementation(() => {
				throw new Error();
			});

			expect(updateProductById()).rejects.toThrow();
		});
	});

	describe("get product by id", () => {
		it("should return an product by id", async () => {
			const productMock = {id: 1, name: "product"};

			prismaMock.product.findUnique.mockResolvedValue(productMock);
			const product = await getProductById(productMock.id);

			expect(prismaMock.product.findUnique).toHaveBeenCalledWith({
				...defaultQueryOptions,
				where: {id: productMock.id}
			});
			expect(product).toStrictEqual(productMock);
		});

		it("should throw an error", async () => {
			prismaMock.product.findUnique.mockImplementation(() => {
				throw new Error();
			});

			expect(getProductById()).rejects.toThrow();
		});
	});
});
