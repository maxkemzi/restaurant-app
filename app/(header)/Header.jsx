import MyLink from "@/components/MyLink";
import {PathName} from "@/lib/constants";
import {getCategories} from "@/lib/prisma/categories";
import Menu from "../../components/Menu";
import MenuDropdown from "../../components/MenuDropdown";
import MenuItem from "../../components/MenuItem";
import MobileMenu from "../../components/MobileMenu";
import MobileMenuDropdown from "../../components/MobileMenuDropdown";
import CartDropdown from "./CartDropdown";
import Logo from "./Logo";

export const revalidate = 60;

const Header = async () => {
	const categories = await getCategories();

	const getCategoryLinkPath = category => ({
		pathname: PathName.PRODUCTS,
		query: {category}
	});

	return (
		<header className="navbar bg-base z-50">
			<div className="navbar-start">
				<MobileMenu>
					<MenuItem path={PathName.HOME} text="Home" />
					<MobileMenuDropdown text="Menu">
						<MenuItem path={PathName.PRODUCTS} text="All" />
						{categories.map(({name, id}) => (
							<MenuItem key={id} path={getCategoryLinkPath(name)} text={name} />
						))}
					</MobileMenuDropdown>
				</MobileMenu>
				<Logo />
			</div>
			<div className="navbar-center hidden lg:flex">
				<Menu>
					<MenuItem path={PathName.HOME} text="Home" />
					<MenuDropdown text="Menu">
						<MenuItem path={PathName.PRODUCTS} text="All" />
						{categories.map(({name, id}) => (
							<MenuItem key={id} path={getCategoryLinkPath(name)} text={name} />
						))}
					</MenuDropdown>
				</Menu>
			</div>
			<div className="navbar-end gap-2">
				<CartDropdown />
				<MyLink path={PathName.MY_ORDERS} size="small">
					My orders
				</MyLink>
			</div>
		</header>
	);
};

export default Header;
