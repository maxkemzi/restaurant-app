"use client";

import Button from "@/components/Button";
import {useToastContext} from "@/lib/contexts";
import {AppError} from "@/lib/error";
import {deleteOrder} from "./actions";

const DeleteOrderButton = ({orderId}) => {
	const {showToast} = useToastContext();

	const handleAction = async () => {
		try {
			await deleteOrder(orderId);
			showToast("success", "Your order have been deleted");
		} catch (e) {
			throw new AppError("Error deleting your order.");
		}
	};

	return (
		<form action={handleAction} aria-label="form">
			<Button isSubmit color="error" size="small">
				Delete
			</Button>
		</form>
	);
};

export default DeleteOrderButton;
