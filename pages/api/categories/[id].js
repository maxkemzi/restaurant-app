import {parseQueryParams} from "@/lib/helpers";
import prisma from "@/prisma/client";

const handler = async (req, res) => {
	if (req.method === "PUT") {
		try {
			const {id} = parseQueryParams(req.query);
			const {name} = req.body;

			const category = await prisma.category.update({
				where: {id},
				data: {name}
			});
			res.json(category);
		} catch (e) {
			console.log(e);
			res.status(500).json({message: "Something went wrong."});
		}
	} else if (req.method === "DELETE") {
		try {
			const {id} = parseQueryParams(req.query);

			const category = await prisma.category.delete({where: {id}});
			res.json(category);
		} catch (e) {
			res.status(500).json({message: "Something went wrong."});
		}
	} else if (req.method === "GET") {
		try {
			const {id} = parseQueryParams(req.query);

			const category = await prisma.category.findUnique({where: {id}});
			res.json(category);
		} catch (e) {
			res.status(500).json({message: "Something went wrong."});
		}
	}
};

export default handler;
