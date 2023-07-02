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
	isVisible: false,
	type: null,
	message: null
};

const ToastContext = createContext({
	toast: initialToastState,
	showToast: () => {}
});

const ToastProvider = ({children}) => {
	const [toast, setToast] = useState(initialToastState);

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
		setToast(prev => ({...prev, type, message, isVisible: true}));

		timeout.current = setTimeout(() => {
			setToast(prev => ({...prev, isVisible: false}));
		}, 3000);
	}, []);

	const value = useMemo(() => ({showToast}), [showToast]);

	return (
		<ToastContext.Provider value={value}>
			{children}
			<div
				className={classNames("toast toast-top toast-end z-50", {
					invisible: !toast.isVisible,
					"opacity-0": !toast.isVisible
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
