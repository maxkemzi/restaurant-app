import {OrderStatus} from "@/lib/constants";
import classNames from "classnames";
import TableProduct from "./TableProduct";

const orderStatusToTextMapping = {
	[OrderStatus.NEW]: "new",
	[OrderStatus.IN_PROGRESS]: "in progress",
	[OrderStatus.COMPLETED]: "completed"
};

const OrderTableRow = ({order, actionsSlot}) => {
	const {
		id,
		clientName,
		clientPhone,
		clientAddress,
		Cart: {CartProducts},
		status
	} = order || {Cart: {}};

	const products = CartProducts.map(cartProduct => cartProduct.Product);

	const uniqueProducts = products.reduce(
		(prev, product) =>
			prev.some(el => el.id === product.id) ? prev : [...prev, product],
		[]
	);

	const totalProductCost = CartProducts?.reduce(
		(prev, curr) => prev + curr.Product.priceUsd,
		0
	);

	const badgeClassesByStatus = {
		"badge-info": status === OrderStatus.NEW,
		"badge-warning": status === OrderStatus.IN_PROGRESS,
		"badge-success": status === OrderStatus.COMPLETED
	};

	return (
		<tr>
			<td>{id}</td>
			<td>{clientName}</td>
			<td>{clientPhone}</td>
			<td>{clientAddress}</td>
			<td>
				<div className="collapse collapse-arrow border border-base-200">
					<input type="radio" name="products-accordion" />
					<div className="collapse-title font-medium">List</div>
					<div className="collapse-content">
						<div className="flex flex-col gap-2">
							{uniqueProducts.map(product => {
								const count = products.reduce(
									(prev, curr) => (curr.id === product.id ? prev + 1 : prev),
									0
								);

								return (
									<TableProduct
										key={product.id}
										count={count}
										product={product}
									/>
								);
							})}
						</div>
					</div>
				</div>
			</td>
			<td>${totalProductCost}</td>
			<td>
				<div className={classNames("badge", badgeClassesByStatus)}>
					{orderStatusToTextMapping[status]}
				</div>
			</td>
			<td>
				<div className="flex gap-2">{actionsSlot}</div>
			</td>
		</tr>
	);
};

export default OrderTableRow;
