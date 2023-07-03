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
		where: {id: id != null ? id : undefined}
	});
	return category;
};

const updateCategoryById = async (id, data) => {
	const category = await prisma.category.update({
		where: {id: id != null ? id : undefined},
		data
	});
	return category;
};

const getCategoryById = async id => {
	const category = await prisma.category.findUnique({
		where: {id: id != null ? id : undefined}
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
