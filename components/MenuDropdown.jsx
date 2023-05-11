const MenuDropdown = ({text, children}) => (
	<li tabIndex={0}>
		{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
		<a>
			{text}
			<svg
				className="fill-current"
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 24 24">
				<path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
			</svg>
		</a>
		<ul className="p-2 bg-base-100 z-50">{children}</ul>
	</li>
);

export default MenuDropdown;
