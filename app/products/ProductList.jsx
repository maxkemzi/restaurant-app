import ProductCard from "./ProductCard";
import AddToCartButton from "./AddToCartButton";

const ProductList = ({products, category}) => {
	if (products.length === 0) {
		return <p>There are no products.</p>;
	}

	return (
		<div className="grid gap-6 grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))] sm:grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))]">
			{products.map(product => (
				<ProductCard
					key={product.id}
					buttonSlot={<AddToCartButton product={product} />}
					id={product.id}
					isVegan={product.is_vegan}
					isSpicy={product.is_spicy}
					categoryName={category}
					image={product.image}
					ingredients={product.ProductIngredients}
					name={product.name}
					priceUSD={product.price_USD}
					sizeCm={product.size_cm}
					weight={product.weight}
				/>
			))}
		</div>
	);
};

export default ProductList;
