import capitalize from "@/utils/helpers/capitalize";
import Image from "next/image";

const Product = ({
	image,
	sizeCm,
	weight,
	name,
	priceUSD,
	ingredients,
	categoryName,
	isSpicy,
	isVegan,
	onClick
}) => {
	const ingredientsString = ingredients
		.map(el => {
			const str = el.Ingredient.name;
			return `${str[0].toUpperCase()}${str.slice(1)}`;
		})
		.join(", ");

	return (
		<div className="card bg-base-100 shadow-xl">
			<figure className="px-6 pt-6">
				<Image
					width={200}
					height={200}
					src={image}
					alt="product image"
					className="rounded-xl"
				/>
			</figure>
			<div className="card-body">
				<h2 className="card-title self-center">
					{capitalize(name)}
					{isSpicy ? <div className="badge badge-error">Spicy</div> : null}
					{isVegan ? <div className="badge badge-success">Vegan</div> : null}
				</h2>
				<p className="text-center">
					{sizeCm ? `${sizeCm} cm / ` : null}
					{weight} {categoryName === "drinks" ? "ml" : "g"}{" "}
					{ingredients.length !== 0 ? `- ${ingredientsString}` : null}
				</p>
				<div className="card-actions justify-between items-center">
					<p>${priceUSD}</p>
					<button onClick={onClick} type="button" className="btn btn-primary">
						Order
					</button>
				</div>
			</div>
		</div>
	);
};

export default Product;
