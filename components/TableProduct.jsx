import Image from "next/image";

const TableProduct = ({count, product, testId}) => {
	const {image, name} = product || {};

	return (
		<div className="card card-side bg-neutral shadow-xl" data-testid={testId}>
			<div className="w-full flex items-center justify-center flex-wrap">
				<div className="card-body p-4 sm:p-6 md:p-8 basis-3/5">
					<h5 className="capitalize font-semibold">{name}</h5>
					<p>{count}</p>
				</div>
				<div className="p-2 hidden lg:block">
					<figure>
						<div className="relative w-20 h-20">
							<Image fill objectFit="cover" src={image} alt={`${name} image`} />
						</div>
					</figure>
				</div>
			</div>
		</div>
	);
};

export default TableProduct;
