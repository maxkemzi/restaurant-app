"use client";

import classNames from "classnames";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState
} from "react";

const initialToastState = {
	type: null,
	message: ""
};

const ToastContext = createContext({
	toast: initialToastState,
	showToast: () => {}
});

const ToastProvider = ({children}) => {
	const [toast, setToast] = useState(initialToastState);
	const isVisible = useMemo(
		() => toast.type && toast.message,
		[toast.message, toast.type]
	);

	const timeout = useRef(null);
	useEffect(
		() => () => {
			if (timeout.current) {
				clearTimeout(timeout.current);
			}
		},
		[]
	);

	const showToast = useCallback((type, message) => {
		setToast({type, message});

		if (timeout.current) {
			clearTimeout(timeout.current);
		}

		timeout.current = setTimeout(() => {
			setToast(initialToastState);
		}, 3000);
	}, []);

	const value = useMemo(() => ({showToast, toast}), [showToast, toast]);

	return (
		<ToastContext.Provider value={value}>
			{children}
			<div
				className={classNames("toast toast-top toast-end z-50", {
					invisible: !isVisible,
					"opacity-0": !isVisible
				})}>
				<div
					className={classNames("alert", {
						"alert-error": toast.type === "error",
						"alert-success": toast.type === "success"
					})}>
					<div>
						<span>{toast.message}</span>
					</div>
				</div>
			</div>
		</ToastContext.Provider>
	);
};

const useToastContext = () => useContext(ToastContext);

export {ToastProvider, useToastContext};
