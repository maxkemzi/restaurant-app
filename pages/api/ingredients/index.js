import prisma from "@/prisma/client";

const handler = async (req, res) => {
	if (req.method === "POST") {
		try {
			const {name} = req.body;

			const ingredient = await prisma.ingredient.create({
				data: {name}
			});
			res.status(201).json(ingredient);
		} catch (e) {
			res.status(500).json({message: "Something went wrong."});
		}
	} else if (req.method === "GET") {
		try {
			const ingredients = await prisma.ingredient.findMany();
			res.json(ingredients);
		} catch (e) {
			res.status(500).json({message: "Something went wrong."});
		}
	}
};

export default handler;
