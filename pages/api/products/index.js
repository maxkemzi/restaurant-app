import {parseQueryParams} from "@/lib/helpers";
import {createProduct, getProducts} from "@/lib/prisma/products";

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
				category_id,
				ingredient_ids: ingredientIds
			} = req.body;

			const ingredients = ingredientIds?.map(id => ({
				ingredient_id: Number(id)
			}));

			const product = await createProduct({
				image,
				name,
				price_USD,
				weight,
				size_cm,
				is_vegan,
				is_spicy,
				category_id,
				ingredients
			});

			res.status(201).json(product);
		} catch (e) {
			console.log(e);
			res.status(500).json({message: "Something went wrong."});
		}
	} else if (req.method === "GET") {
		try {
			const {category_id, category_name, is_vegan, is_spicy, sort} =
				parseQueryParams(req.query);

			const products = await getProducts({
				category_id,
				category_name,
				is_vegan,
				is_spicy,
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
