import classNames from "classnames";
import {useId} from "react";

const TextField = ({label, error, className, InputProps}) => {
	const id = useId();
	return (
		<div className={classNames(className, "form-control w-full")}>
			<label className="label" htmlFor={id} data-testid="label">
				<span className="label-text">{label}</span>
			</label>
			<input id={id} className="input input-bordered w-full" {...InputProps} />
			{error ? (
				<label className="label" data-testid="error">
					<span className="label-text-alt text-error">{error}</span>
				</label>
			) : null}
		</div>
	);
};

export default TextField;
