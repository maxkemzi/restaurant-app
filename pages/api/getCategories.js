import prisma from "@/prisma/client";

const handler = async (req, res) => {
	try {
		const categories = await prisma.category.findMany();
		res.json(categories);
	} catch (e) {
		res.status(500);
	}
};

export default handler;
