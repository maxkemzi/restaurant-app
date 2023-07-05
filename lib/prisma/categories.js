import prisma from "@/prisma/client";

const getCategories = async () => {
	const categories = await prisma.category.findMany();
	return categories;
};

const createCategory = async data => {
	const category = await prisma.category.create({data});
	return category;
};

const deleteCategoryById = async id => {
	const category = await prisma.category.delete({
		where: {id}
	});
	return category;
};

const updateCategoryById = async (id, data) => {
	const category = await prisma.category.update({
		where: {id},
		data
	});
	return category;
};

const getCategoryById = async id => {
	const category = await prisma.category.findUnique({
		where: {id}
	});
	return category;
};

export {
	getCategories,
	getCategoryById,
	createCategory,
	deleteCategoryById,
	updateCategoryById
};
