import {OrderStatus} from "@/lib/constants";
import {getOrdersByClientId} from "@/lib/prisma/orders";
import {cookies} from "next/headers";
import DeleteButton from "./DeleteButton";

const orderStatusToTextMapping = {
	[OrderStatus.NEW]: "new",
	[OrderStatus.IN_PROGRESS]: "in progress",
	[OrderStatus.COMPLETED]: "completed"
};

export const revalidate = 60;

const MyOrders = async () => {
	const cookieStore = cookies();
	const clientId = cookieStore.get("clientId")?.value;

	const orders = clientId ? await getOrdersByClientId(clientId) : [];

	return (
		<div className="overflow-x-auto">
			<table className="table w-full">
				<thead>
					<tr>
						<th>№</th>
						<th>Name</th>
						<th>Phone</th>
						<th>Address</th>
						<th>Total</th>
						<th>Status</th>
						{/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
						<th />
					</tr>
				</thead>
				<tbody>
					{orders.map(order => {
						const totalCost = order.Cart.CartProducts.reduce(
							(prev, curr) => prev + curr.Product.priceUsd,
							0
						);
						return (
							<tr key={order.id}>
								<th>{order.id}</th>
								<td>{order.clientName}</td>
								<td>{order.clientPhone}</td>
								<td>{order.clientAddress}</td>
								<td>${totalCost}</td>
								<td>
									<div className="badge badge-success">
										{orderStatusToTextMapping[order.status]}
									</div>
								</td>
								<td className="flex">
									<div className="ml-auto">
										<DeleteButton orderId={order.id} />
									</div>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default MyOrders;
