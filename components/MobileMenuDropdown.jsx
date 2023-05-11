const MobileMenuDropdown = ({text, children}) => (
	<li tabIndex={0}>
		{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
		<a className="justify-between">
			{text}
			<svg
				className="fill-current"
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24">
				<path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
			</svg>
		</a>
		<ul className="p-2 bg-base-100 z-50">{children}</ul>
	</li>
);

export default MobileMenuDropdown;
