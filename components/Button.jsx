import classNames from "classnames";

const ButtonSize = {
	SMALL: "small",
	MEDIUM: "medium",
	LARGE: "large"
};

const ButtonColor = {
	SUCCESS: "success",
	ERROR: "error",
	INFO: "info",
	WARNING: "warning",
	PRIMARY: "primary"
};

const Button = ({
	children,
	onClick,
	isSubmit,
	size = ButtonSize.MEDIUM,
	color = ButtonColor.PRIMARY
}) => {
	const classesBySize = {
		"btn-sm": size === ButtonSize.SMALL,
		"btn-md": size === ButtonSize.MEDIUM,
		"btn-lg": size === ButtonSize.LARGE
	};

	const classesByColor = {
		"btn-primary": color === ButtonColor.PRIMARY,
		"btn-error": color === ButtonColor.ERROR,
		"btn-success": color === ButtonColor.SUCCESS,
		"btn-warning": color === ButtonColor.WARNING,
		"btn-info": color === ButtonColor.INFO
	};

	return (
		<button
			onClick={onClick}
			type={isSubmit ? "submit" : "button"}
			className={classNames("btn", classesBySize, classesByColor)}>
			{children}
		</button>
	);
};

export default Button;
