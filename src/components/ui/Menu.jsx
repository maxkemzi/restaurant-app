const Menu = ({children, testId}) => (
	<ul className="menu menu-horizontal px-1" data-testid={testId}>
		{children}
	</ul>
);

export default Menu;
