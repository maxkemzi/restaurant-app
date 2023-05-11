import classNames from "classnames";
import {
	createContext,
	useCallback,
	useEffect,
	useRef,
	useState,
	useMemo,
	useContext
} from "react";

const toastContext = createContext({
	showToast: () => {}
});

const ToastProvider = ({children}) => {
	const [isVisible, setIsVisible] = useState(false);
	const [type, setType] = useState(null);
	const [message, setMessage] = useState(null);
	const timeout = useRef(null);

	const showToast = useCallback((toastMessage, toastType = "success") => {
		// Set toast type, which changes it's background color
		setType(toastType);

		setMessage(toastMessage);
		setIsVisible(true);

		// Make toast invisible again after 3 seconds
		timeout.current = setTimeout(() => {
			setIsVisible(false);
		}, 3000);
	}, []);

	// Timeout cleanup
	useEffect(
		() => () => {
			if (timeout.current) {
				clearTimeout(timeout.current);
			}
		},
		[]
	);

	const value = useMemo(() => ({showToast}), [showToast]);

	return (
		<toastContext.Provider value={value}>
			{children}
			<div
				className={classNames("toast toast-top toast-end z-50", {
					invisible: !isVisible,
					"opacity-0": !isVisible
				})}>
				<div
					className={classNames("alert", {
						"alert-error": type === "error",
						"alert-success": type === "success"
					})}>
					<div>
						<span>{message}</span>
					</div>
				</div>
			</div>
		</toastContext.Provider>
	);
};

const useToastContext = () => useContext(toastContext);

export {ToastProvider, useToastContext};
