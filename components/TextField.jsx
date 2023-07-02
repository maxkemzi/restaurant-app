import classNames from "classnames";
import {useId} from "react";

const TextField = ({label, name, type, className}) => {
	const id = useId();
	return (
		<div className={classNames(className, "form-control w-full")}>
			<label className="label" htmlFor={id}>
				<span className="label-text">{label}</span>
			</label>
			<input
				id={id}
				type={type}
				name={name}
				className="input input-bordered w-full"
			/>
		</div>
	);
};

export default TextField;
