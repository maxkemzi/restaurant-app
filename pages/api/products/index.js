import {parseQueryParams} from "@/lib/helpers";
import {createProduct, getProducts} from "@/lib/prisma/products";

const handler = async (req, res) => {
	if (req.method === "POST") {
		try {
			const {
				image,
				name,
				categoryId,
				priceUsd,
				weight,
				sizeCm,
				isVegan,
				isSpicy,
				ingredientIds
			} = req.body;

			const ingredients = ingredientIds?.map(ingredientId => ({
				ingredientId: Number(ingredientId)
			}));

			const product = await createProduct({
				image,
				name,
				priceUsd,
				weight,
				sizeCm,
				isVegan,
				isSpicy,
				categoryId,
				ingredients
			});

			res.status(201).json(product);
		} catch (e) {
			console.log(e);
			res.status(500).json({message: "Something went wrong."});
		}
	} else if (req.method === "GET") {
		try {
			const {categoryId, categoryName, isVegan, isSpicy, sort} =
				parseQueryParams(req.query);

			const products = await getProducts({
				categoryId,
				categoryName,
				isVegan,
				isSpicy,
				sort
			});

			res.json(products);
		} catch (e) {
			console.log(e);
			res.status(500).json({message: "Something went wrong."});
		}
	}
};

export default handler;
