class CartProductDTO {
	name;

	weight;

	id;

	sizeCm;

	priceUsd;

	image;

	constructor(product) {
		this.name = product.name;
		this.image = product.image;
		this.weight = product.weight;
		this.id = product.id;
		this.sizeCm = product.sizeCm;
		this.priceUsd = product.priceUsd;
	}
}

export default CartProductDTO;
