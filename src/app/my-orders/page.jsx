import {getOrdersByClientId} from "@/src/lib/prisma/orders";
import {cookies} from "next/headers";
import OrderTableRow from "../../components/OrderTableRow";
import DeleteOrderButton from "./DeleteOrderButton";

export const revalidate = 60;

const MyOrders = async () => {
	const cookieStore = cookies();
	const clientId = cookieStore.get("clientId")?.value;

	const orders = clientId ? await getOrdersByClientId(clientId) : [];
	if (orders.length === 0) {
		return <p className="text-center">You don&apos;t have any orders yet</p>;
	}

	return (
		<div className="overflow-x-auto bg-base-100">
			<table className="table w-full">
				<thead>
					<tr>
						<th>№</th>
						<th>Name</th>
						<th>Phone</th>
						<th>Address</th>
						<th>Products</th>
						<th>Total</th>
						<th>Status</th>
						{/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
						<th />
					</tr>
				</thead>
				<tbody>
					{orders.map(order => (
						<OrderTableRow
							key={order.id}
							order={order}
							actionsSlot={<DeleteOrderButton orderId={order.id} />}
							testId={`order-table-row-${order.id}`}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default MyOrders;
