import {parseQueryParams} from "@/lib/helpers";
import {
	deleteProductById,
	getProductById,
	updateProductById
} from "@/lib/prisma/products";

const handler = async (req, res) => {
	if (req.method === "DELETE") {
		try {
			const {id} = parseQueryParams(req.query);

			const product = await deleteProductById(id);
			res.json(product);
		} catch (e) {
			res.status(500).json({message: "Something went wrong."});
		}
	} else if (req.method === "GET") {
		try {
			const {id} = parseQueryParams(req.query);

			const product = await getProductById(id);
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

			const ingredients = ingredientIds?.map(ingredientId => ({
				ingredient_id: Number(ingredientId)
			}));

			const product = await updateProductById(id, {
				image,
				name,
				category_id,
				price_USD,
				weight,
				size_cm,
				is_vegan,
				is_spicy,
				ingredients
			});

			res.json(product);
		} catch (e) {
			console.log(e);
			res.status(500).json({message: "Something went wrong."});
		}
	}
};

export default handler;
