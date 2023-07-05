import Button from "@/components/Button";
import Image from "next/image";

const CartProductCard = ({
	onRemoveClick,
	onAddClick,
	image,
	name,
	weight,
	count,
	priceUsd
}) => (
	<div className="card card-side flex justify-center flex-wrap bg-base-100 shadow-xl">
		<figure className="p-4 grow max-w-[140px]">
			<Image width={80} height={80} src={image} alt={name} />
		</figure>
		<div className="card-body basis-3/5">
			<div>
				<h2 className="card-title capitalize">{name}</h2>
				<p>Count: {count}</p>
			</div>
			<p>{weight} g</p>
			<p>${priceUsd}</p>
			<div className="card-actions justify-end">
				<Button onClick={onRemoveClick} size="small" color="error">
					Remove
				</Button>
				<Button onClick={onAddClick} size="small" color="success">
					Add
				</Button>
			</div>
		</div>
	</div>
);

export default CartProductCard;
