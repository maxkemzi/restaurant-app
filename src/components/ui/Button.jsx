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
	isSubmit,
	isDisabled,
	testId,
	size = ButtonSize.MEDIUM,
	color = ButtonColor.PRIMARY,
	variant = ButtonVariant.PRIMARY,
	...rest
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
			disabled={isDisabled}
			type={isSubmit ? "submit" : "button"}
			className={classNames(
				"btn",
				classesBySize,
				classesByColor,
				classesByVariant
			)}
			data-testid={testId}
			{...rest}>
			{children}
		</button>
	);
};

export {ButtonColor, ButtonSize, ButtonVariant};
export default Button;
