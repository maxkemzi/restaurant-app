import {useCartContext} from "@/contexts/cartContext";
import capitalize from "@/utils/helpers/capitalize";
import CartDropdown from "./CartDropdown";
import MobileMenu from "./MobileMenu";
import MenuItem from "./MenuItem";
import MobileMenuDropdown from "./MobileMenuDropdown";
import Menu from "./Menu";
import MenuDropdown from "./MenuDropdown";
import Logo from "./Logo";

const Navbar = ({categories}) => {
	const {
		cart: {count, cost}
	} = useCartContext();

	return (
		<div className="navbar bg-base-100">
			<div className="navbar-start">
				<MobileMenu>
					<MenuItem path="/" text="Home" />
					<MobileMenuDropdown text="Menu">
						{categories.map(({name, id}) => (
							<MenuItem
								key={id}
								path={`/products/${name}`}
								text={capitalize(name)}
							/>
						))}
					</MobileMenuDropdown>
				</MobileMenu>
				<Logo />
			</div>
			<div className="navbar-center hidden lg:flex">
				<Menu>
					<MenuItem path="/" text="Home" />
					<MenuDropdown text="Menu">
						{categories.map(({name, id}) => (
							<MenuItem
								key={id}
								path={`/products/${name}`}
								text={capitalize(name)}
							/>
						))}
					</MenuDropdown>
				</Menu>
			</div>
			<div className="navbar-end">
				<CartDropdown productsCount={count} totalCost={cost} />
			</div>
		</div>
	);
};

export default Navbar;
