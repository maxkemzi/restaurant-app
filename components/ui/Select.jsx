const Select = ({children, onChange, value}) => (
	<select value={value} onChange={onChange} className="select select-bordered">
		{children}
	</select>
);

export default Select;
