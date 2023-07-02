import Link from "next/link";

const MenuItem = ({path, text}) => (
	<li>
		<Link className="capitalize" href={path}>
			{text}
		</Link>
	</li>
);

export default MenuItem;
