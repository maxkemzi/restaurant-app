class IngredientMockGenerator {
	static #idCounter = 1;

	static generateMany(n) {
		return Array.from(Array(n).keys()).map(IngredientMockGenerator.generate);
	}

	static generate() {
		const mock = {name: `ingredient${IngredientMockGenerator.#idCounter}`};

		IngredientMockGenerator.#idCounter += 1;

		return mock;
	}
}

export default IngredientMockGenerator;
