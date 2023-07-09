import Image from "next/image";

const ProductCard = ({product, buttonSlot}) => {
	const {
		image,
		sizeCm,
		weight,
		name,
		priceUsd,
		ProductIngredients,
		Category: {name: categoryName},
		isSpicy,
		isVegan
	} = product || {Category: {}};

	const ingredientsString = ProductIngredients.map(el => {
		const str = el.Ingredient.name;
		return `${str[0].toUpperCase()}${str.slice(1)}`;
	}).join(", ");

	return (
		<div className="card bg-base-100 shadow-xl">
			<div className="p-6">
				<figure>
					<Image
						width={200}
						height={200}
						src={image}
						alt="product image"
						className="rounded-xl"
					/>
				</figure>
			</div>
			<div className="card-body">
				<h2 className="card-title self-center capitalize">
					{name}
					{isSpicy ? <div className="badge badge-error">Spicy</div> : null}
					{isVegan ? <div className="badge badge-success">Vegan</div> : null}
				</h2>
				<p className="text-center">
					{sizeCm ? `${sizeCm}cm / ` : null}
					{weight}
					{categoryName === "drink" ? "ml" : "g"}{" "}
					{ProductIngredients.length !== 0 ? `- ${ingredientsString}` : null}
				</p>
				<div className="card-actions justify-between items-center">
					<p>${priceUsd}</p>
					{buttonSlot}
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
