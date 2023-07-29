import Image from "next/image";

const CartProductCard = ({actionsSlot, cartProduct, testId}) => {
	const {image, name, weight, priceUsd} = cartProduct || {};
	return (
		<div
			className="card card-side flex justify-center flex-wrap bg-base-100 shadow-xl"
			data-testid={testId}>
			<figure className="sm:p-4 p-2">
				<div className="relative w-32 h-32">
					<Image
						className="object-cover"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						fill
						priority
						src={image}
						alt={name}
					/>
				</div>
			</figure>
			<div className="card-body p-4 sm:p-6 md:p-8 basis-3/5">
				<h2 className="card-title capitalize">{name}</h2>
				<p>{weight} g</p>
				<p>${priceUsd}</p>
				<div className="card-actions justify-end">{actionsSlot}</div>
			</div>
		</div>
	);
};

export default CartProductCard;
