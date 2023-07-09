import Image from "next/image";

const TableProduct = ({count, product}) => {
	const {image, name} = product || {};

	return (
		<div className="card card-side bg-neutral shadow-xl">
			<div className="w-full flex items-center flex-wrap">
				<div className="card-body basis-3/5">
					<p className="capitalize font-semibold">{name}</p>
					<p>{count}</p>
				</div>
				<div className="p-2">
					<figure className="grow max-w-[80px]">
						<Image width={80} height={80} src={image} alt={name} />
					</figure>
				</div>
			</div>
		</div>
	);
};

export default TableProduct;
