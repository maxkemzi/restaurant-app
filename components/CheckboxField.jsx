import classNames from "classnames";

const CheckboxField = ({label, defaultChecked, onChange, variant}) => (
	<div className="form-control">
		<label className="label cursor-pointer">
			<span className="label-text mr-4">{label}</span>
			<input
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

export default CheckboxField;
