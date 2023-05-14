import prisma from "@/prisma/client";

const cleanUp = async () => {
	await Promise.all([prisma.order.deleteMany(), prisma.product.deleteMany()]);

	await Promise.all([
		prisma.category.deleteMany(),
		prisma.ingredient.deleteMany()
	]);
};

export default cleanUp;
