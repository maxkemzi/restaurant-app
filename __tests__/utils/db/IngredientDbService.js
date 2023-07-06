import DbService from "./DbService";

class IngredientDbService {
	static #service = new DbService("ingredient");

	static exists(ingredient) {
		return this.#service.exists(ingredient);
	}

	static getById(id) {
		return this.#service.getById(id);
	}

	static get(filter) {
		return this.#service.get(filter);
	}

	static createMany(ingredients) {
		return this.#service.createMany(ingredients);
	}

	static create(ingredient) {
		return this.#service.create(ingredient);
	}
}

export default IngredientDbService;
