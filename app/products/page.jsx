import {getProducts} from "@/lib/prisma/products";
import PizzaFilters from "./PizzaFilters";
import ProductList from "./ProductList";

export const revalidate = 60;

const Products = async ({searchParams}) => {
	const {isSpicy, isVegan, category} = searchParams;
	const products = await getProducts({
		categoryName: category,
		isSpicy: isSpicy != null ? Boolean(isSpicy) : undefined,
		isVegan: isVegan != null ? Boolean(isVegan) : undefined
	});

	return (
		<>
			{category === "pizza" ? <PizzaFilters /> : null}
			<ProductList products={products} category={category} />
		</>
	);
};

export default Products;
