import prisma from "@/prisma/client";

const handler = async (req, res) => {
	if (req.method === "PUT") {
		try {
			const {id} = req.query;
			const {name} = req.body;

			const category = await prisma.category.update({
				where: {id: Number(id)},
				data: {name}
			});
			res.status(201).json(category);
		} catch (e) {
			res.status(500);
		}
	} else if (req.method === "DELETE") {
		try {
			const {id} = req.query;

			const category = await prisma.category.delete({
				where: {id: Number(id)}
			});
			res.json(category);
		} catch (e) {
			res.status(500);
		}
	} else if (req.method === "GET") {
		try {
			const {id} = req.query;

			const category = await prisma.category.findUnique({
				where: {id: Number(id)}
			});
			res.json(category);
		} catch (e) {
			res.status(500);
		}
	}
};

export default handler;
