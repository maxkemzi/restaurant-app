class CartProductDTO {
	name;

	weight;

	id;

	sizeCm;

	priceUSD;

	image;

	constructor(product) {
		this.name = product.name;
		this.image = product.image;
		this.weight = product.weight;
		this.id = product.id;
		this.sizeCm = product.size_cm;
		this.priceUSD = product.price_USD;
	}
}

export default CartProductDTO;
