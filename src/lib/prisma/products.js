import prisma from "@/src/prisma/client";

const defaultQueryOptions = {
	include: {ProductIngredients: {include: {Ingredient: true}}, Category: true}
};

const getProducts = async (params = {}) => {
	const {categoryId, categoryName, isVegan, isSpicy, sort} = params;

	const options = {
		...defaultQueryOptions,
		where: {AND: []}
	};

	if (categoryId != null) {
		options.where.AND.push({Category: {is: {id: categoryId}}});
	}

	if (categoryName != null) {
		options.where.AND.push({Category: {is: {name: categoryName}}});
	}

	if (isVegan != null) {
		options.where.isVegan = isVegan;
	}

	if (isSpicy != null) {
		options.where.isSpicy = isSpicy;
	}

	if (sort === "priceAsc") {
		options.orderBy = {priceUsd: "asc"};
	} else if (sort === "priceDesc") {
		options.orderBy = {priceUsd: "desc"};
	}

	const products = await prisma.product.findMany(options);
	return products;
};

const createProduct = async ({ingredientIds, categoryId, ...data}) => {
	const options = {
		...defaultQueryOptions,
		data
	};

	if (categoryId != null) {
		options.data.Category = {connect: {id: categoryId}};
	}

	if (Array.isArray(ingredientIds)) {
		const ingredients = ingredientIds.map(id => ({ingredientId: id}));
		options.data.ProductIngredients = {createMany: {data: ingredients}};
	}

	const product = await prisma.product.create(options);
	return product;
};

const deleteProductById = async id => {
	const product = await prisma.product.delete({
		...defaultQueryOptions,
		where: {id}
	});
	return product;
};

const updateProductById = async (id, {ingredientIds, ...data}) => {
	const options = {
		...defaultQueryOptions,
		where: {id},
		data
	};

	const ingredientIdsDefined = Array.isArray(ingredientIds);
	if (ingredientIdsDefined) {
		const ingredients = ingredientIds.map(iId => ({ingredientId: iId}));
		options.data.ProductIngredients = {
			deleteMany: {},
			createMany: {data: ingredients}
		};
	}

	const product = await prisma.product.update(options);
	return product;
};

const getProductById = async id => {
	const product = await prisma.product.findUnique({
		...defaultQueryOptions,
		where: {id}
	});
	return product;
};

export {
	createProduct,
	deleteProductById,
	getProductById,
	getProducts,
	updateProductById
};
