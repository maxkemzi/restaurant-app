import DbService from "./DbService";

class ProductDbService {
	static #service = new DbService("product");

	static exists(category) {
		return this.#service.exists(category);
	}

	static getById(id) {
		return this.#service.getById(id);
	}

	static get(filter, order) {
		return this.#service.get(filter, order);
	}

	static getMany(filter, order) {
		return this.#service.getMany(filter, order);
	}

	static createMany(products, ingredients) {
		const productsToCreate = products.map(product => ({
			...product,
			ProductIngredients: {create: ingredients}
		}));

		return this.#service.createMany(productsToCreate);
	}

	static create(product, ingredients) {
		const productToCreate = {
			...product,
			ProductIngredients: {create: ingredients}
		};

		return this.#service.create(productToCreate);
	}
}

export default ProductDbService;
