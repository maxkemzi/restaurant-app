import classNames from "classnames";
import Link from "next/link";

const LinkSize = {
	SMALL: "small",
	MEDIUM: "medium",
	LARGE: "large"
};

const MyLink = ({path, children, size = LinkSize.MEDIUM}) => {
	const classesBySize = {
		"btn-sm": size === LinkSize.SMALL,
		"btn-md": size === LinkSize.MEDIUM,
		"btn-lg": size === LinkSize.LARGE
	};

	return (
		<Link href={path} className={classNames("btn btn-primary", classesBySize)}>
			{children}
		</Link>
	);
};

export {LinkSize};
export default MyLink;
