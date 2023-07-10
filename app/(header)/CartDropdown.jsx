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
			{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
			<label tabIndex={0} className="btn btn-ghost btn-circle">
				<div className="indicator">
					<Icon name="cart" />
					<span
						className="badge badge-sm indicator-item"
						data-testid="iconCount">
						{count}
					</span>
				</div>
			</label>
			<div
				tabIndex={0}
				className="mt-3 z-[1] card card-compact dropdown-content w-40 sm:w-52 bg-base-100 shadow">
				<div className="card-body">
					<span className="font-bold text-lg" data-testid="menuCount">
						{count} Items
					</span>
					<span className="text-info" data-testid="totalCost">
						Total: ${cost}
					</span>
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
