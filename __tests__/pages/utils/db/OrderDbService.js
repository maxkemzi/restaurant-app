import DbService from "./DbService";

class OrderDbService {
	static #service = new DbService("order");

	static exists(order) {
		return this.#service.exists(order);
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

	static createMany(orders) {
		return this.#service.createMany(orders);
	}

	static create(order) {
		return this.#service.create(order);
	}
}

export default OrderDbService;
