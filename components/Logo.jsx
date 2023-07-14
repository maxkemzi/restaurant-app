import {PathName, RestaurantInfo} from "@/lib/constants";
import Link from "next/link";

const Logo = ({testId}) => (
	<Link
		href={PathName.HOME}
		className="btn btn-ghost normal-case text-xl"
		data-testid={testId}>
		{RestaurantInfo.NAME}
	</Link>
);

export default Logo;
