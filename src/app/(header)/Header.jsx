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

export const revalidate = 60;

const Header = async () => {
	const categories = await getCategories();

	const getCategoryLinkPath = categoryName => ({
		pathname: PathName.PRODUCTS,
		query: {categoryName}
	});

	return (
		<header className="navbar bg-base z-50 flex-wrap sm:flex-nowrap">
			<div className="navbar-start w-full sm:w-1/2">
				<MobileMenu testId="mobile-menu">
					<MenuItem path={PathName.HOME} text="Home" testId="menu-item-home" />
					<MobileMenuDropdown text="Menu">
						<MenuItem
							path={PathName.PRODUCTS}
							text="All"
							testId="menu-item-all"
						/>
						{categories.map(({name, id}) => (
							<MenuItem
								key={id}
								path={getCategoryLinkPath(name)}
								text={name}
								testId={`menu-item-category-${id}`}
							/>
						))}
					</MobileMenuDropdown>
				</MobileMenu>
				<Logo testId="logo" />
			</div>
			<div className="navbar-center hidden lg:flex">
				<Menu testId="menu">
					<MenuItem path={PathName.HOME} text="Home" testId="menu-item-home" />
					<MenuDropdown text="Menu">
						<MenuItem
							path={PathName.PRODUCTS}
							text="All"
							testId="menu-item-all"
						/>
						{categories.map(({name, id}) => (
							<MenuItem
								key={id}
								path={getCategoryLinkPath(name)}
								text={name}
								testId={`menu-item-category-${id}`}
							/>
						))}
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
