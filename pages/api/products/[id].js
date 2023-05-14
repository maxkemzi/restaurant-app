import prisma from "@/prisma/client";
import parseQueryParams from "@/utils/helpers/parseQueryParams";

const handler = async (req, res) => {
	if (req.method === "DELETE") {
		try {
			const {id} = parseQueryParams(req.query);

			const product = await prisma.product.delete({
				where: {id},
				include: {
					ProductIngredients: {include: {Ingredient: true}}
				}
			});
			res.json(product);
		} catch (e) {
			res.status(500).json({message: "Something went wrong."});
		}
	} else if (req.method === "GET") {
		try {
			const {id} = parseQueryParams(req.query);

			const product = await prisma.product.findUnique({
				where: {id},
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
			const {id} = parseQueryParams(req.query);
			const {
				image,
				name,
				category_id,
				price_USD,
				weight,
				size_cm,
				is_vegan,
				is_spicy,
				ingredient_ids: ingredientIds
			} = req.body;

			const updatedProduct = await prisma.product.update({
				where: {id},
				data: {
					image,
					name,
					price_USD,
					category_id,
					weight,
					size_cm,
					is_vegan,
					is_spicy,
					ProductIngredients: {
						deleteMany: Array.isArray(ingredientIds) ? {} : undefined,
						createMany: Array.isArray(ingredientIds)
							? {
									data: ingredientIds.map(ingredientId => ({
										ingredient_id: ingredientId
									}))
							  }
							: undefined
					}
				},
				include: {ProductIngredients: {include: {Ingredient: true}}}
			});

			res.json(updatedProduct);
		} catch (e) {
			console.log(e);
			res.status(500).json({message: "Something went wrong."});
		}
	}
};

export default handler;
