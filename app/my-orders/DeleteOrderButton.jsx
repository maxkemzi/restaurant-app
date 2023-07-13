"use client";

import Button from "@/components/ui/Button";
import {useToastContext} from "@/lib/contexts";
import {AppError} from "@/lib/error";
import {deleteOrder} from "./actions";

const DeleteOrderButton = ({orderId}) => {
	const {showToast} = useToastContext();

	const handleSubmit = async e => {
		e.preventDefault();
		try {
			await deleteOrder(orderId);
			showToast("success", "Your order have been deleted");
		} catch (err) {
			throw new AppError("Error deleting your order.");
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<Button isSubmit color="error" size="small">
				Delete
			</Button>
		</form>
	);
};

export default DeleteOrderButton;
