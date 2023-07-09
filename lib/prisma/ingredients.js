import prisma from "@/prisma/client";

const getIngredients = async () => {
	const ingredients = await prisma.ingredient.findMany();
	return ingredients;
};

const createIngredient = async data => {
	const ingredient = await prisma.ingredient.create({
		data
	});
	return ingredient;
};

const deleteIngredientById = async id => {
	const ingredient = await prisma.ingredient.delete({
		where: {id}
	});
	return ingredient;
};

const updateIngredientById = async (id, data) => {
	const ingredient = await prisma.ingredient.update({
		where: {id},
		data
	});
	return ingredient;
};

const getIngredientById = async id => {
	const ingredient = await prisma.ingredient.findUnique({
		where: {id}
	});
	return ingredient;
};

export {
	getIngredients,
	createIngredient,
	deleteIngredientById,
	updateIngredientById,
	getIngredientById
};
