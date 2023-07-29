import classNames from "classnames";

const CheckboxVariant = {
	SUCCESS: "success",
	ERROR: "error"
};

const CheckboxField = ({label, checked, onChange, variant}) => (
	<div className="form-control">
		<label className="label cursor-pointer">
			<span className="label-text mr-4">{label}</span>
			<input
				type="checkbox"
				className={classNames("checkbox", {
					"checkbox-success": variant === CheckboxVariant.SUCCESS,
					"checkbox-error": variant === CheckboxVariant.ERROR
				})}
				checked={checked}
				onChange={onChange}
			/>
		</label>
	</div>
);

export {CheckboxVariant};
export default CheckboxField;
