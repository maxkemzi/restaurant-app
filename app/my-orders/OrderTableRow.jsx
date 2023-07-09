import {OrderStatus} from "@/lib/constants";
import classNames from "classnames";

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
			<td>${totalProductCost}</td>
			<td>
				<div className={classNames("badge", badgeClassesByStatus)}>
					{orderStatusToTextMapping[status]}
				</div>
			</td>
			<td className="flex">
				<div className="ml-auto flex gap-2">{actionsSlot}</div>
			</td>
		</tr>
	);
};

export default OrderTableRow;
