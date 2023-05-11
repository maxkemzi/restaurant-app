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

			const ingredients = ingredientIds?.map(id => ({ingredient_id: id}));

			const product = await prisma.product.create({
				data: {
					image,
					name,
					price_USD: priceUSD,
					Category: {connect: {id: categoryId}},
					...(ingredients
						? {ProductIngredients: {createMany: {data: ingredients}}}
						: {}),
					weight,
					size_cm: sizeCm,
					is_vegan: isVegan,
					is_spicy: isSpicy
				},
				include: {ProductIngredients: {include: {Ingredient: true}}}
			});

			res.status(201).json(product);
		} catch (e) {
			res.status(500).json({message: "Something went wrong."});
		}
	} else if (req.method === "GET") {
		try {
			const {categoryId, categoryName, sort, isVegan, isSpicy} = req.query;

			const vegan = isVegan ? !!isVegan : undefined;
			const spicy = isSpicy ? !!isSpicy : undefined;

			const options = {
				where: {
					AND: [
						categoryId ? {Category: {is: {id: Number(categoryId)}}} : {},
						categoryName ? {Category: {is: {name: categoryName}}} : {}
					],
					is_vegan: vegan,
					is_spicy: spicy
				},
				include: {ProductIngredients: {include: {Ingredient: true}}}
			};

			if (sort === "price_asc") {
				options.orderBy = {price_USD: "asc"};
			} else if (sort === "price_desc") {
				options.orderBy = {price_USD: "desc"};
			}

			const products = await prisma.product.findMany(options);
			res.json(products);
		} catch (e) {
			res.status(500).json({message: "Something went wrong."});
		}
	}
};

export default handler;
