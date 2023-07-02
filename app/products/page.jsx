import PizzaFilters from "./PizzaFilters";
import ProductList from "./ProductList";

const fetchProducts = async (category, {isSpicy, isVegan}) => {
	const queryParams = new URLSearchParams();

	if (category) {
		queryParams.set("category_name", category);
	}

	if (isVegan != null) {
		queryParams.set("is_vegan", isVegan);
	}

	if (isSpicy != null) {
		queryParams.set("is_spicy", isSpicy);
	}

	const response = await fetch(
		`${process.env.API_URL}/products?${queryParams}`,
		{next: {revalidate: 60}}
	);
	return response.json();
};

const Products = async ({searchParams}) => {
	const {isSpicy, isVegan, category} = searchParams;
	const products = await fetchProducts(category, {isSpicy, isVegan});

	return (
		<>
			{category === "pizzas" ? <PizzaFilters /> : null}
			<ProductList products={products} category={category} />
		</>
	);
};

export default Products;
