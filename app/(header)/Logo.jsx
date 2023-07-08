import {PathName} from "@/lib/constants";
import {RESTAURANT_NAME} from "@/lib/constants/restaurantInfo";
import Link from "next/link";

const Logo = () => (
	<Link href={PathName.HOME} className="btn btn-ghost normal-case text-xl">
		{RESTAURANT_NAME}
	</Link>
);

export default Logo;
