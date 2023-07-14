import Link from "next/link";

const MenuItem = ({path, text, testId}) => (
	<li data-testid={testId}>
		<Link className="capitalize" href={path}>
			{text}
		</Link>
	</li>
);

export default MenuItem;
