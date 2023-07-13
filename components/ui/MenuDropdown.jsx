const MenuDropdown = ({text, children}) => (
	<li tabIndex={0}>
		<details>
			<summary>{text}</summary>
			<ul className="p-2">{children}</ul>
		</details>
	</li>
);

export default MenuDropdown;
