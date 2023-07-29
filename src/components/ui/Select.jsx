const Select = ({children, onChange, value, testId}) => (
	<select
		value={value}
		onChange={onChange}
		className="select select-bordered"
		data-testid={testId}>
		{children}
	</select>
);

export default Select;
