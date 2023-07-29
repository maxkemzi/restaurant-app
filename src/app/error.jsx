"use client";

import Button from "@/src/components/ui/Button";
import {useToastContext} from "@/src/lib/contexts";
import {AppError} from "@/src/lib/error";
import {useEffect} from "react";

const Error = ({error, reset}) => {
	const {showToast} = useToastContext();

	useEffect(() => {
		showToast(
			"error",
			error instanceof AppError ? error.message : "Something went wrong."
		);

		console.error(error);
	}, [error, showToast]);

	return (
		<div className="p-4">
			<div>
				<p className="mb-2">Error: {error.message}</p>
				<Button onClick={reset}>Try again</Button>
			</div>
		</div>
	);
};

export default Error;
