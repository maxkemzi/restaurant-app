import getCreateAndDeleteElements from "@/utils/helpers/getCreateAndDeleteEls";
import prisma from "@/prisma/client";

const handler = async (req, res) => {
	if (req.method === "DELETE") {
		try {
			const {id} = req.query;

			const product = await prisma.product.delete({where: {id: Number(id)}});
			res.json(product);
		} catch (e) {
			res.status(500).json({message: "Something went wrong."});
		}
	} else if (req.method === "GET") {
		try {
			const {id} = req.query;

			const product = await prisma.product.findUnique({
				where: {id: Number(id)},
				include: {
					ProductIngredients: {include: {Ingredient: true}}
				}
			});
			res.json(product);
		} catch (e) {
			res.status(500).json({message: "Something went wrong."});
		}
	} else if (req.method === "PUT") {
		try {
			const {id} = req.query;
			const {
				image,
				name,
				categoryId,
				priceUSD,
				weight,
				ingredientIds,
				sizeCm,
				isVegan,
				isSpicy
			} = req.body;

			const getProductIngredientsOps = async () => {
				const oldProduct = await prisma.product.findUnique({
					where: {id: Number(id)},
					include: {ProductIngredients: true}
				});

				const productIngredientIds = oldProduct.ProductIngredients.map(
					ingredient => ingredient.ingredient_id
				);

				const [deleteIds, createIds] = getCreateAndDeleteElements(
					productIngredientIds,
					ingredientIds
				);

				const deleteIngredientIds = [];
				let shouldSkip;

				deleteIds.forEach(el => {
					shouldSkip = false;
					oldProduct.ProductIngredients.forEach(ingredient => {
						if (shouldSkip) {
							return;
						}

						if (
							el === ingredient.ingredient_id &&
							!deleteIngredientIds.includes(ingredient.id)
						) {
							deleteIngredientIds.push(ingredient.id);
							shouldSkip = true;
						}
					});
				});

				// Product ingredients, that need to be created
				const createData = createIds.map(ingrId => ({
					ingredient_id: ingrId,
					product_id: oldProduct.id
				}));

				return [
					// Delete redundant product ingredients if needed
					...deleteIngredientIds.map(el =>
						prisma.productIngredient.delete({
							where: {id: el},
							include: {Ingredient: true}
						})
					),
					// Create new product ingredients if needed
					prisma.productIngredient.createMany({
						data: createData
					})
				];
			};

			// Get operations to update product ingredients
			const operations = await getProductIngredientsOps();

			const result = await prisma.$transaction([
				// Update product ingredients
				...operations,
				// Update product
				prisma.product.update({
					where: {id: Number(id)},
					data: {
						image,
						name,
						price_USD: priceUSD,
						category_id: categoryId,
						weight,
						size_cm: sizeCm,
						is_vegan: isVegan,
						is_spicy: isSpicy
					},
					include: {ProductIngredients: {include: {Ingredient: true}}}
				})
			]);

			const updatedProduct = result[result.length - 1];

			res.json(updatedProduct);
		} catch (e) {
			res.status(500).json({message: "Something went wrong."});
		}
	}
};

export default handler;
