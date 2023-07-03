import {getProducts} from "@/lib/prisma/products";
import PizzaFilters from "./PizzaFilters";
import ProductList from "./ProductList";

export const revalidate = 60;

const Products = async ({searchParams}) => {
	const {isSpicy, isVegan, category} = searchParams;
	const products = await getProducts({
		category_name: category,
		is_spicy: isSpicy != null ? Boolean(isSpicy) : undefined,
		is_vegan: isVegan != null ? Boolean(isVegan) : undefined
	});

	return (
		<>
			{category === "pizzas" ? <PizzaFilters /> : null}
			<ProductList products={products} category={category} />
		</>
	);
};

export default Products;
