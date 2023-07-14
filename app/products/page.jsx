import {getProducts} from "@/lib/prisma/products";
import ProductFilters from "./ProductFilters";
import ProductList from "./ProductList";
import SortSelect from "./SortSelect";

const hourInSeconds = 3600;
export const revalidate = hourInSeconds * 24;

const Products = async ({searchParams}) => {
	const {isSpicy, isVegan, categoryName, sort} = searchParams;
	const products = await getProducts({categoryName, sort});

	const filteredProducts = products.filter(
		product =>
			(isSpicy === "true" && product.isSpicy) ||
			(isVegan === "true" && product.isVegan) ||
			(isSpicy !== "true" && isVegan !== "true")
	);

	const hasSpicyProducts = products.some(product => product.isSpicy === true);
	const hasVeganProducts = products.some(product => product.isVegan === true);

	return (
		<>
			<div className="flex items-center mb-4 gap-2 flex-col sm:flex-row">
				<ProductFilters
					hasSpicyProducts={hasSpicyProducts}
					hasVeganProducts={hasVeganProducts}
				/>
				<div className="ml-0 sm:ml-auto">
					<SortSelect />
				</div>
			</div>
			<ProductList products={filteredProducts} />
		</>
	);
};

export default Products;
