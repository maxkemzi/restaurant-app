import Menu from "@/src/components/ui/Menu";
import MenuDropdown from "@/src/components/ui/MenuDropdown";
import MenuItem from "@/src/components/ui/MenuItem";
import MobileMenu from "@/src/components/ui/MobileMenu";
import MobileMenuDropdown from "@/src/components/ui/MobileMenuDropdown";
import MyLink from "@/src/components/ui/MyLink";
import {PathName} from "@/src/lib/constants";
import {getCategories} from "@/src/lib/prisma/categories";
import Logo from "../../components/Logo";
import CartDropdown from "./CartDropdown";
import CategoryMenuItems from "./CategoryMenuItems";

export const revalidate = 60;

const Header = async () => {
	const categories = await getCategories();

	return (
		<header className="navbar bg-base z-50 flex-wrap sm:flex-nowrap">
			<div className="navbar-start w-full sm:w-1/2">
				<MobileMenu testId="mobile-menu">
					<MenuItem path={PathName.HOME} text="Home" testId="menu-item-home" />
					<MobileMenuDropdown text="Menu">
						<CategoryMenuItems categories={categories} />
					</MobileMenuDropdown>
				</MobileMenu>
				<Logo testId="logo" />
			</div>
			<div className="navbar-center hidden lg:flex">
				<Menu testId="menu">
					<MenuItem path={PathName.HOME} text="Home" testId="menu-item-home" />
					<MenuDropdown text="Menu">
						<CategoryMenuItems categories={categories} />
					</MenuDropdown>
				</Menu>
			</div>
			<div className="navbar-end gap-2 w-full justify-end sm:w-1/2 sm:justify-end">
				<CartDropdown />
				<MyLink path={PathName.MY_ORDERS} size="small">
					My orders
				</MyLink>
			</div>
		</header>
	);
};

export default Header;
