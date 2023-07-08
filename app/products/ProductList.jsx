import AddToCartButton from "./AddToCartButton";
import ProductCard from "./ProductCard";

const ProductList = ({products, category}) => {
	if (products.length === 0) {
		return <p className="text-center">There are no products</p>;
	}

	return (
		<div className="grid gap-6 grid-cols-[repeat(auto-fill,_minmax(max(280px,_calc((100%-(1.5rem_*_3))/4)),_1fr))]">
			{products.map(product => (
				<ProductCard
					key={product.id}
					buttonSlot={<AddToCartButton product={product} />}
					id={product.id}
					isVegan={product.isVegan}
					isSpicy={product.isSpicy}
					categoryName={category}
					image={product.image}
					ingredients={product.ProductIngredients}
					name={product.name}
					priceUsd={product.priceUsd}
					sizeCm={product.sizeCm}
					weight={product.weight}
				/>
			))}
		</div>
	);
};

export default ProductList;
