class CartProductDTO {
	constructor(product) {
		const {name, image, weight, id, sizeCm, priceUsd} = product || {};
		this.name = name;
		this.image = image;
		this.weight = weight;
		this.id = id;
		this.sizeCm = sizeCm;
		this.priceUsd = priceUsd;
		this.count = 1;
	}
}

export default CartProductDTO;
