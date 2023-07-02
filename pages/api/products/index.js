import {parseQueryParams} from "@/lib/helpers";
import prisma from "@/prisma/client";

const handler = async (req, res) => {
	if (req.method === "POST") {
		try {
			const {
				image,
				name,
				price_USD,
				weight,
				size_cm,
				is_vegan,
				is_spicy,
				category_id: categoryId,
				ingredient_ids: ingredientIds
			} = req.body;

			const ingredients = ingredientIds?.map(id => ({ingredient_id: id}));

			const product = await prisma.product.create({
				data: {
					Category: {connect: {id: categoryId}},
					ProductIngredients: {createMany: {data: ingredients}},
					image,
					name,
					price_USD,
					weight,
					size_cm,
					is_vegan,
					is_spicy
				},
				include: {ProductIngredients: {include: {Ingredient: true}}}
			});

			res.status(201).json(product);
		} catch (e) {
			console.log(e);
			res.status(500).json({message: "Something went wrong."});
		}
	} else if (req.method === "GET") {
		try {
			const {
				category_id: categoryId,
				category_name: categoryName,
				is_vegan: isVegan,
				is_spicy: isSpicy,
				sort
			} = parseQueryParams(req.query);

			const options = {
				where: {
					AND: [
						{Category: {is: {id: categoryId}}},
						{Category: {is: {name: categoryName}}}
					],
					is_vegan: isVegan,
					is_spicy: isSpicy
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
			console.log(e);
			res.status(500).json({message: "Something went wrong."});
		}
	}
};

export default handler;
