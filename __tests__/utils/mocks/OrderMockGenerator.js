class OrderMockGenerator {
	static generateMany(n) {
		return Array.from(Array(n).keys()).map(OrderMockGenerator.generate);
	}

	static generate() {
		const mock = {
			clientName: "name",
			clientAddress: "address",
			clientPhone: "phone"
		};

		return mock;
	}
}

export default OrderMockGenerator;
