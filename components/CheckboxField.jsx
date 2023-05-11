import classNames from "classnames";
import {useId} from "react";

const CheckboxField = ({
	label,
	defaultChecked,
	onChange,
	variant = "success"
}) => {
	const id = useId();
	return (
		<div className="form-control">
			<label className="label cursor-pointer" htmlFor={id}>
				<span className="label-text mr-4">{label}</span>
				<input
					id={id}
					type="checkbox"
					className={classNames("checkbox", {
						"checkbox-success": variant === "success",
						"checkbox-error": variant === "error"
					})}
					defaultChecked={defaultChecked}
					onChange={onChange}
				/>
			</label>
		</div>
	);
};

export default CheckboxField;
