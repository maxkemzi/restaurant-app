import Link from "next/link";

const MenuItem = ({path, text}) => (
	<li>
		<Link href={path}>{text}</Link>
	</li>
);

export default MenuItem;
