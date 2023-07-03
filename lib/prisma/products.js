import prisma from "@/prisma/client";

const createProduct = async ({
	image,
	name,
	price_USD,
	weight,
	size_cm,
	is_vegan,
	is_spicy,
	category_id: categoryId,
	ingredients
}) => {
	const product = await prisma.product.create({
		data: {
			image,
			name,
			price_USD,
			weight,
			size_cm,
			is_vegan,
			is_spicy,
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

const getProducts = async params => {
	const options = {
		where: {
			AND: [
				{
					Category: {
						is: {
							id: params.category_id != null ? params.category_id : undefined
						}
					}
				},
				{
					Category: {
						is: {
							name:
								params.category_name != null ? params.category_name : undefined
						}
					}
				}
			],
			is_vegan: params.is_vegan != null ? params.is_vegan : undefined,
			is_spicy: params.is_spicy != null ? params.is_spicy : undefined
		},
		include: {ProductIngredients: {include: {Ingredient: true}}}
	};

	if (params.sort === "price_asc") {
		options.orderBy = {price_USD: "asc"};
	} else if (params.sort === "price_desc") {
		options.orderBy = {price_USD: "desc"};
	}

	const products = await prisma.product.findMany(options);
	return products;
};

const deleteProductById = async id => {
	const product = await prisma.product.delete({
		where: {id: id != null ? id : undefined},
		include: {
			ProductIngredients: {include: {Ingredient: true}}
		}
	});
	return product;
};

const getProductById = async id => {
	const product = await prisma.product.findUnique({
		where: {id: id != null ? id : undefined},
		include: {
			ProductIngredients: {include: {Ingredient: true}}
		}
	});
	return product;
};

const updateProductById = async (
	id,
	{
		image,
		name,
		category_id,
		price_USD,
		weight,
		size_cm,
		is_vegan,
		is_spicy,
		ingredients
	}
) => {
	const product = await prisma.product.update({
		where: {id},
		data: {
			image,
			name,
			category_id,
			price_USD,
			weight,
			size_cm,
			is_vegan,
			is_spicy,
			ProductIngredients: {
				deleteMany: Array.isArray(ingredients) ? {} : undefined,
				createMany: {
					data: Array.isArray(ingredients) ? ingredients : undefined
				}
			}
		},
		include: {ProductIngredients: {include: {Ingredient: true}}}
	});
	return product;
};

export {
	createProduct,
	getProducts,
	deleteProductById,
	getProductById,
	updateProductById
};
