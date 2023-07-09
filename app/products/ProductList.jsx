import AddToCartButton from "./AddToCartButton";
import ProductCard from "./ProductCard";

const ProductList = ({products}) => {
	if (products.length === 0) {
		return <p className="text-center">There are no products</p>;
	}

	return (
		<div className="grid gap-6 grid-cols-[repeat(auto-fill,_minmax(max(280px,_calc((100%-(1.5rem_*_3))/4)),_1fr))]">
			{products.map(product => (
				<ProductCard
					key={product.id}
					product={product}
					buttonSlot={<AddToCartButton product={product} />}
				/>
			))}
		</div>
	);
};

export default ProductList;
