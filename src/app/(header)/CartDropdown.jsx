"use client";

import Icon from "@/src/components/ui/Icon";
import {PathName} from "@/src/lib/constants";
import {useCartContext} from "@/src/lib/contexts";
import Link from "next/link";

const CartDropdown = () => {
	const {totalCost, totalCount} = useCartContext();

	return (
		<div className="dropdown dropdown-end">
			{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
			<label tabIndex={0} className="btn btn-ghost btn-circle">
				<div className="indicator">
					<Icon name="cart" />
					<span
						className="badge badge-sm indicator-item"
						data-testid="iconCount">
						{totalCount}
					</span>
				</div>
			</label>
			<div
				tabIndex={0}
				className="mt-3 z-[1] card card-compact dropdown-content w-40 sm:w-52 bg-base-100 shadow">
				<div className="card-body">
					<span className="font-bold text-lg">{totalCount} Items</span>
					<span className="text-info">Total: ${totalCost}</span>
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
