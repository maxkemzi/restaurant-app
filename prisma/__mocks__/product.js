const createProductMock = (id, options) => {
	const categoryId = options?.categoryId || 1;
	const productIngredientIds = options?.productIngredientIds || [1];
	const ingredientIds = options?.ingredientIds || [1];

	return {
		id,
		categoryId,
		name: `product ${id}`,
		image: "/images/fallback-image.png",
		priceUsd: 0,
		weight: 0,
		sizeCm: null,
		isVegan: null,
		isSpicy: null,
		createdAt: "2023-07-08T06:54:18.004Z",
		ProductIngredients: productIngredientIds
			.map(prodIngrId =>
				ingredientIds.map(ingrId => ({
					id: prodIngrId,
					ingredientId: ingrId,
					productId: id,
					createdAt: "2023-07-08T06:54:17.986Z",
					Ingredient: {
						id: ingrId,
						name: `ingredient ${ingrId}`,
						createdAt: "2023-07-08T06:54:17.961Z"
					}
				}))
			)
			.flat(),
		Category: {
			id: categoryId,
			name: `category ${categoryId}`,
			createdAt: "2023-07-08T06:54:18.004Z"
		}
	};
};

export {createProductMock};
