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
		where: {id: id != null ? id : undefined}
	});
	return ingredient;
};

const getIngredientById = async id => {
	const ingredient = await prisma.ingredient.findUnique({
		where: {id: id != null ? id : undefined}
	});
	return ingredient;
};

const updateIngredientById = async (id, data) => {
	const ingredient = await prisma.ingredient.update({
		where: {id: id != null ? id : undefined},
		data
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
