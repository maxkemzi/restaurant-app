import {
	AiOutlineMinus,
	AiOutlinePlus,
	AiOutlineShoppingCart
} from "react-icons/ai";

const IconName = {
	CART: "cart",
	MINUS: "minus",
	PLUS: "plus"
};

const iconNameToComponentMapping = {
	[IconName.CART]: AiOutlineShoppingCart,
	[IconName.PLUS]: AiOutlinePlus,
	[IconName.MINUS]: AiOutlineMinus
};

const Icon = ({name}) => {
	const Component = iconNameToComponentMapping[name];

	return <Component size="1.2rem" />;
};

export default Icon;
