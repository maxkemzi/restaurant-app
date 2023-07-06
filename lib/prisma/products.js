import prisma from "@/prisma/client";

const createProduct = async ({ingredients, categoryId, ...data}) => {
	const product = await prisma.product.create({
		data: {
			...data,
			Category: {
				connect: {id: categoryId != null ? categoryId : undefined}
			},
			ProductIngredients: {
				createMany: {
					data: Array.isArray(ingredients) ? ingredients : undefined
				}
			}
		},
		include: {ProductIngredients: {include: {Ingredient: true}}}
	});
	return product;
};

const getProducts = async ({
	categoryId,
	categoryName,
	isVegan,
	isSpicy,
	sort
}) => {
	const options = {
		where: {
			AND: [
				{
					Category: {
						is: {
							id: categoryId != null ? categoryId : undefined
						}
					}
				},
				{
					Category: {
						is: {
							name: categoryName != null ? categoryName : undefined
						}
					}
				}
			],
			isVegan: isVegan != null ? isVegan : undefined,
			isSpicy: isSpicy != null ? isSpicy : undefined
		},
		include: {ProductIngredients: {include: {Ingredient: true}}}
	};

	if (sort === "priceAsc") {
		options.orderBy = {priceUsd: "asc"};
	} else if (sort === "priceDesc") {
		options.orderBy = {priceUsd: "desc"};
	}

	const products = await prisma.product.findMany(options);
	return products;
};

const deleteProductById = async id => {
	const product = await prisma.product.delete({
		where: {id},
		include: {
			ProductIngredients: {include: {Ingredient: true}}
		}
	});
	return product;
};

const getProductById = async id => {
	const product = await prisma.product.findUnique({
		where: {id},
		include: {
			ProductIngredients: {include: {Ingredient: true}}
		}
	});
	return product;
};

const updateProductById = async (id, {ingredients, ...data}) => {
	const ingredientsDefined = Array.isArray(ingredients);

	const product = await prisma.product.update({
		where: {id},
		data: {
			...data,
			ProductIngredients: ingredientsDefined
				? {
						deleteMany: {},
						createMany: {
							data: ingredients
						}
				  }
				: undefined
		},
		include: {ProductIngredients: {include: {Ingredient: true}}}
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
