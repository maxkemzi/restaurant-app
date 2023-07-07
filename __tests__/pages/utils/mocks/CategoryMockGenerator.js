class CategoryMockGenerator {
	static #idCounter = 1;

	static generateMany(n) {
		return Array.from(Array(n).keys()).map(CategoryMockGenerator.generate);
	}

	static generate() {
		const mock = {name: `category${CategoryMockGenerator.#idCounter}`};

		CategoryMockGenerator.#idCounter += 1;

		return mock;
	}
}

export default CategoryMockGenerator;
