import Image from "next/image";

const CartProductCard = ({actionsSlot, cartProduct}) => {
	const {image, name, weight, priceUsd} = cartProduct || {};
	return (
		<div className="card card-side flex justify-center flex-wrap bg-base-100 shadow-xl">
			<div className="flex justify-center items-center p-4">
				<figure className="max-w-[100px]">
					<Image width={100} height={100} src={image} alt={name} />
				</figure>
			</div>
			<div className="card-body basis-3/5">
				<h2 className="card-title capitalize">{name}</h2>
				<p>{weight} g</p>
				<p>${priceUsd}</p>
				<div className="card-actions justify-end">{actionsSlot}</div>
			</div>
		</div>
	);
};

export default CartProductCard;
