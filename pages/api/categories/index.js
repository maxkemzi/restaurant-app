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
			res.status(500).json({message: "Something went wrong."});
		}
	} else if (req.method === "GET") {
		try {
			const categories = await prisma.category.findMany();
			res.json(categories);
		} catch (e) {
			res.status(500).json({message: e.message});
		}
	}
};

export default handler;
