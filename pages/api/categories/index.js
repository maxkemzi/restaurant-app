import prisma from "@/prisma/client";

const handler = async (req, res) => {
	if (req.method === "POST") {
		try {
			const {name} = req.body;

			const category = await prisma.category.create({
				data: {name}
			});
			res.status(201).json(category);
		} catch (e) {
			res.status(500);
		}
	} else {
		try {
			const categories = await prisma.category.findMany();
			res.json(categories);
		} catch (e) {
			res.status(500);
		}
	}
};

export default handler;
