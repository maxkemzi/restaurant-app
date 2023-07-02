import {parseQueryParams} from "@/lib/helpers";
import prisma from "@/prisma/client";

const handler = async (req, res) => {
	if (req.method === "PUT") {
		try {
			const {id} = parseQueryParams(req.query);
			const {name} = req.body;

			const ingredient = await prisma.ingredient.update({
				where: {id},
				data: {name}
			});
			res.status(200).json(ingredient);
		} catch (e) {
			res.status(500).json({message: "Something went wrong."});
		}
	} else if (req.method === "DELETE") {
		try {
			const {id} = parseQueryParams(req.query);

			const ingredient = await prisma.ingredient.delete({where: {id}});
			res.json(ingredient);
		} catch (e) {
			res.status(500).json({message: "Something went wrong."});
		}
	} else if (req.method === "GET") {
		try {
			const {id} = parseQueryParams(req.query);

			const ingredient = await prisma.ingredient.findUnique({where: {id}});
			res.json(ingredient);
		} catch (e) {
			res.status(500).json({message: "Something went wrong."});
		}
	}
};

export default handler;
