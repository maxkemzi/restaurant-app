import prisma from "@/prisma/client";

const handler = async (req, res) => {
	try {
		const category = await prisma.category.create({
			data: {name: "Pizza"}
		});
		res.status(201).json(category);
	} catch (e) {
		res.status(500);
	}
};

export default handler;
