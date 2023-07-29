const SelectOption = ({children, value, testId}) => (
	<option value={value} data-testid={testId}>
		{children}
	</option>
);

export default SelectOption;
