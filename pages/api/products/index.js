import prisma from "@/prisma/client";

const handler = async (req, res) => {
	if (req.method === "POST") {
		try {
			const {
				image,
				name,
				categoryId,
				priceUSD,
				weight,
				sizeCm,
				ingredientIds,
				isVegan,
				isSpicy
			} = req.body;

			const ingredients = ingredientIds.map(id => ({ingredient_id: id}));

			const product = await prisma.product.create({
				data: {
					image,
					name,
					price_USD: priceUSD,
					Category: {connect: {id: categoryId}},
					ProductIngredients: {createMany: {data: ingredients}},
					weight,
					size_cm: sizeCm,
					is_vegan: isVegan,
					is_spicy: isSpicy
				},
				include: {ProductIngredients: {include: {Ingredient: true}}}
			});

			res.status(201).json(product);
		} catch (e) {
			res.status(500).json({error: e.message});
		}
	} else if (req.method === "GET") {
		try {
			const {categoryId, sort, isVegan, isSpicy} = req.query;

			const options = {
				where: {category_id: categoryId, is_vegan: isVegan, is_spicy: isSpicy},
				include: {ProductIngredients: {include: {Ingredient: true}}}
			};

			if (sort === "price_asc") {
				options.orderBy = {price_USD: "asc"};
			} else if (sort === "price_desc") {
				options.orderBy = {price_USD: "desc"};
			}

			const product = await prisma.product.findMany(options);
			res.json(product);
		} catch (e) {
			res.status(500).json({error: e.message});
		}
	}
};

export default handler;
