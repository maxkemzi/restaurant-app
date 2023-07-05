const {PrismaClient} = require("@prisma/client");

const prisma = new PrismaClient();

const main = async () => {
	await Promise.all([
		prisma.category.createMany({
			data: [{name: "pizza"}, {name: "dessert"}, {name: "drink"}]
		}),
		prisma.ingredient.createMany({
			data: [
				{name: "egg"},
				{name: "cherry"},
				{name: "cream cheese"},
				{name: "mozzarella cheese"},
				{name: "pizza sauce"},
				{name: "wholegrain flour"},
				{name: "chicken"},
				{name: "chili pepper"},
				{name: "basil"}
			]
		})
	]);

	const pizzaCategory = await prisma.category.findUnique({
		where: {name: "pizza"}
	});

	const margheritaIngredients = await prisma.ingredient.findMany({
		where: {
			OR: [
				{name: "pizza sauce"},
				{name: "mozzarella cheese"},
				{name: "wholegrain flour"},
				{name: "basil"}
			]
		}
	});
	await prisma.product.create({
		data: {
			image: "/images/products/margherita_pizza.webp",
			name: "margherita pizza",
			priceUsd: 15,
			weight: 500,
			sizeCm: 30,
			isVegan: true,
			isSpicy: false,
			Category: {
				connect: {id: pizzaCategory.id}
			},
			ProductIngredients: {
				createMany: {
					data: margheritaIngredients.map(ingredient => ({
						ingredientId: ingredient.id
					}))
				}
			}
		}
	});

	const vealIngredients = await prisma.ingredient.findMany({
		where: {
			OR: [
				{name: "chicken"},
				{name: "mozzarella cheese"},
				{name: "wholegrain flour"},
				{name: "chili pepper"}
			]
		}
	});
	await prisma.product.create({
		data: {
			image: "/images/products/sweet_chili_meat_pizza.webp",
			name: "sweet chili pizza",
			priceUsd: 13,
			weight: 500,
			sizeCm: 30,
			isVegan: false,
			isSpicy: true,
			Category: {
				connect: {id: pizzaCategory.id}
			},
			ProductIngredients: {
				createMany: {
					data: vealIngredients.map(ingredient => ({
						ingredientId: ingredient.id
					}))
				}
			}
		}
	});

	const drinkCategory = await prisma.category.findUnique({
		where: {name: "drink"}
	});

	await prisma.product.create({
		data: {
			image: "/images/products/cola_vanilla.png",
			name: "cola vanilla",
			priceUsd: 7,
			weight: 300,
			Category: {
				connect: {id: drinkCategory.id}
			}
		}
	});

	const dessertCategory = await prisma.category.findUnique({
		where: {name: "dessert"}
	});

	const cheesecakeIngredients = await prisma.ingredient.findMany({
		where: {
			OR: [{name: "egg"}, {name: "cream cheese"}, {name: "cherry"}]
		}
	});
	await prisma.product.create({
		data: {
			image: "/images/products/cheesecake_country.webp",
			name: "cheesecake",
			priceUsd: 20,
			weight: 300,
			Category: {
				connect: {id: dessertCategory.id}
			},
			ProductIngredients: {
				createMany: {
					data: cheesecakeIngredients.map(ingredient => ({
						ingredientId: ingredient.id
					}))
				}
			}
		}
	});
};

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async e => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
