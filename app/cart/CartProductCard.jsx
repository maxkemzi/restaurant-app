import Image from "next/image";

const CartProductCard = ({actionsSlot, cartProduct}) => {
	const {image, name, weight, priceUsd} = cartProduct || {};
	return (
		<div className="card card-side flex justify-center flex-wrap bg-base-100 shadow-xl">
			<figure className="p-4 grow max-w-[140px]">
				<Image width={80} height={80} src={image} alt={name} />
			</figure>
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
