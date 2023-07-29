import {AppError} from "@/src/lib/error";

const createCategory = (id = 1, overrides = {}) => ({
	id,
	name: "category",
	createdAt: "2023-07-08T06:54:18.004Z",
	...overrides
});

const createIngredient = (id = 1, overrides = {}) => ({
	id,
	name: "ingredient",
	createdAt: "2023-07-08T06:54:17.961Z",
	...overrides
});

const createProductIngredient = (id = 1, overrides = {}) => ({
	id,
	ingredientId: 1,
	productId: 1,
	createdAt: "2023-07-08T06:54:17.986Z",
	Ingredient: createIngredient(),
	...overrides
});

const createProduct = (id = 1, overrides = {}) => ({
	id,
	categoryId: 1,
	name: "product",
	image: "/images/fallback-image.png",
	priceUsd: 0,
	weight: 0,
	sizeCm: null,
	isVegan: null,
	isSpicy: null,
	createdAt: "2023-07-08T06:54:18.004Z",
	ProductIngredients: [createProductIngredient()],
	Category: createCategory(),
	...overrides
});

const createCartProduct = (id = 1, overrides = {}) => ({
	id,
	cartId: 1,
	productId: 1,
	createdAt: "2023-07-09T15:43:32.189Z",
	Product: createProduct(),
	...overrides
});

const createCart = (id = 1, overrides = {}) => ({
	id,
	orderId: 1,
	createdAt: "2023-07-08T06:54:18.004Z",
	CartProducts: [createCartProduct()],
	...overrides
});

const createOrder = (id = 1, overrides = {}) => ({
	id,
	status: "new",
	clientId: "LGyrZu-1QfpUphwNnILDu",
	clientName: "Name",
	clientPhone: "Phone",
	clientAddress: "Address",
	createdAt: "2023-07-08T06:54:18.004Z",
	Cart: createCart(),
	...overrides
});

const createError = (message = "Something went wrong.") => new Error(message);

const createAppError = (message = "Something went wrong.") =>
	new AppError(message);

export {
	createAppError,
	createCart,
	createCartProduct,
	createCategory,
	createError,
	createIngredient,
	createOrder,
	createProduct,
	createProductIngredient
};
