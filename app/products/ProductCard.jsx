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
			<figure className="px-2 py-2 sm:px-4 sm:py-2 md:px-6 md:py-4">
				<div className="relative w-48 h-48">
					<Image
						fill
						objectFit="cover"
						src={image}
						alt="product image"
						className="rounded-xl"
					/>
				</div>
			</figure>
			<div className="card-body p-4 sm:p-6 md:p-8">
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
