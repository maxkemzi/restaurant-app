const MobileMenu = ({children}) => (
	<div className="dropdown">
		<button type="button" tabIndex={0} className="btn btn-ghost lg:hidden">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="h-5 w-5"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor">
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
					d="M4 6h16M4 12h8m-8 6h16"
				/>
			</svg>
		</button>
		<ul
			tabIndex={0}
			className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
			{children}
		</ul>
	</div>
);

export default MobileMenu;
