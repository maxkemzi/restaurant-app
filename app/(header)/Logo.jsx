import {PathName, RestaurantInfo} from "@/lib/constants";
import Link from "next/link";

const Logo = () => (
	<Link href={PathName.HOME} className="btn btn-ghost normal-case text-xl">
		{RestaurantInfo.NAME}
	</Link>
);

export default Logo;
