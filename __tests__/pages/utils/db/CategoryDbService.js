import DbService from "./DbService";

class CategoryDbService {
	static #service = new DbService("category");

	static exists(category) {
		return this.#service.exists(category);
	}

	static getById(id) {
		return this.#service.getById(id);
	}

	static get(filter) {
		return this.#service.get(filter);
	}

	static createMany(categories) {
		return this.#service.createMany(categories);
	}

	static create(category) {
		return this.#service.create(category);
	}
}

export default CategoryDbService;
