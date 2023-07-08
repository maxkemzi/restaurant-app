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

const ButtonVariant = {
	PRIMARY: "primary",
	CIRCLE: "circle"
};

const Button = ({
	children,
	onClick,
	isSubmit,
	size = ButtonSize.MEDIUM,
	color = ButtonColor.PRIMARY,
	variant = ButtonVariant.PRIMARY
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

	const classesByVariant = {
		"btn-circle": variant === ButtonVariant.CIRCLE
	};

	return (
		<button
			onClick={onClick}
			type={isSubmit ? "submit" : "button"}
			className={classNames(
				"btn",
				classesBySize,
				classesByColor,
				classesByVariant
			)}>
			{children}
		</button>
	);
};

export {ButtonColor, ButtonSize};
export default Button;
