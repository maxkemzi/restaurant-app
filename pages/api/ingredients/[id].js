import prisma from "@/prisma/client";

const handler = async (req, res) => {
	if (req.method === "PUT") {
		try {
			const {id} = req.query;
			const {name} = req.body;

			const ingredient = await prisma.ingredient.update({
				where: {id: Number(id)},
				data: {name}
			});
			res.status(201).json(ingredient);
		} catch (e) {
			res.status(500);
		}
	} else if (req.method === "DELETE") {
		try {
			const {id} = req.query;

			const ingredient = await prisma.ingredient.delete({
				where: {id: Number(id)}
			});
			res.json(ingredient);
		} catch (e) {
			res.status(500);
		}
	} else if (req.method === "GET") {
		try {
			const {id} = req.query;

			const ingredient = await prisma.ingredient.findUnique({
				where: {id: Number(id)}
			});
			res.json(ingredient);
		} catch (e) {
			res.status(500);
		}
	}
};

export default handler;
