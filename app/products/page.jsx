import {getProducts} from "@/lib/prisma/products";
import PizzaFilters from "./PizzaFilters";
import ProductList from "./ProductList";
import SortSelect from "./SortSelect";

export const revalidate = 24 * 3600;

const Products = async ({searchParams}) => {
	const {isSpicy, isVegan, category, sort} = searchParams;
	const products = await getProducts({
		categoryName: category,
		sort,
		isSpicy: isSpicy != null ? Boolean(isSpicy) : undefined,
		isVegan: isVegan != null ? Boolean(isVegan) : undefined
	});

	return (
		<>
			<div className="flex items-center mb-4">
				{category === "pizza" ? <PizzaFilters /> : null}
				<div className="ml-auto">
					<SortSelect />
				</div>
			</div>
			<ProductList products={products} />
		</>
	);
};

export default Products;
