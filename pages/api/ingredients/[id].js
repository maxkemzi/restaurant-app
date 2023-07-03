import {parseQueryParams} from "@/lib/helpers";
import {
	deleteIngredientById,
	getIngredientById,
	updateIngredientById
} from "@/lib/prisma/ingredients";

const handler = async (req, res) => {
	if (req.method === "PUT") {
		try {
			const {id} = parseQueryParams(req.query);
			const {name} = req.body;

			const ingredient = await updateIngredientById(id, {name});
			res.status(200).json(ingredient);
		} catch (e) {
			res.status(500).json({message: "Something went wrong."});
		}
	} else if (req.method === "DELETE") {
		try {
			const {id} = parseQueryParams(req.query);

			const ingredient = await deleteIngredientById(id);
			res.json(ingredient);
		} catch (e) {
			res.status(500).json({message: "Something went wrong."});
		}
	} else if (req.method === "GET") {
		try {
			const {id} = parseQueryParams(req.query);

			const ingredient = await getIngredientById(id);
			res.json(ingredient);
		} catch (e) {
			res.status(500).json({message: "Something went wrong."});
		}
	}
};

export default handler;
