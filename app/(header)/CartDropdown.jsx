"use client";

import Icon from "@/components/Icon";
import {PathName} from "@/lib/constants";
import {useCartContext} from "@/lib/contexts";
import Link from "next/link";

const CartDropdown = () => {
	const {
		cart: {count, cost}
	} = useCartContext();

	return (
		<div className="dropdown dropdown-end">
			<button tabIndex={0} type="button" className="btn btn-ghost btn-circle">
				<div className="indicator">
					<Icon name="cart" />
					<span className="badge badge-sm indicator-item">{count}</span>
				</div>
			</button>
			<div
				tabIndex={0}
				className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow">
				<div className="card-body">
					<span className="font-bold text-lg">{count} Items</span>
					<span className="text-info">Total: ${cost}</span>
					<div className="card-actions">
						<Link href={PathName.CART} className="btn btn-primary btn-block">
							View cart
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartDropdown;
