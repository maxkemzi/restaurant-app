class ProductMockGenerator {
	static #idCounter = 1;

	static generateMany(n, categoryId) {
		return Array.from(Array(n).keys()).map(() =>
			ProductMockGenerator.generate(categoryId)
		);
	}

	static generate(categoryId) {
		const mock = {
			name: `product${ProductMockGenerator.#idCounter}`,
			categoryId,
			image: "",
			priceUsd: 0,
			weight: 0,
			sizeCm: 0,
			isVegan: ProductMockGenerator.#idCounter % 2 !== 0,
			isSpicy: ProductMockGenerator.#idCounter % 2 === 0
		};

		ProductMockGenerator.#idCounter += 1;

		return mock;
	}
}

export default ProductMockGenerator;
