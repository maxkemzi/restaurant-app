const MobileMenu = ({children, testId}) => (
	<div className="dropdown" data-testid={testId}>
		{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
		<label tabIndex={0} className="btn btn-ghost lg:hidden">
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
		</label>
		<ul
			tabIndex={0}
			className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
			{children}
		</ul>
	</div>
);

export default MobileMenu;
