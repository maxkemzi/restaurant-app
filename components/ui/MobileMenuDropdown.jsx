const MobileMenuDropdown = ({text, children}) => (
	<li>
		{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
		<a>{text}</a>
		<ul className="p-2">{children}</ul>
	</li>
);

export default MobileMenuDropdown;
