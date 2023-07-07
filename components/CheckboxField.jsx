import classNames from "classnames";

const CheckboxField = ({label, checked, onChange, variant}) => (
	<div className="form-control">
		<label className="label cursor-pointer">
			<span className="label-text mr-4">{label}</span>
			<input
				type="checkbox"
				className={classNames("checkbox", {
					"checkbox-success": variant === "success",
					"checkbox-error": variant === "error"
				})}
				checked={checked}
				onChange={onChange}
			/>
		</label>
	</div>
);

export default CheckboxField;
