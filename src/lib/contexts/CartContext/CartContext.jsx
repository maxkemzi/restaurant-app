"use client";

import {useStorageState} from "@/src/lib/hooks";
import {createContext, useCallback, useContext, useMemo} from "react";
import CartProductDTO from "./CartProductDTO";

const initialProducts = [];

const CartContext = createContext({
	products: initialProducts,
	addProduct: () => {},
	removeProduct: () => {},
	clearCart: () => {},
	totalCount: 0,
	totalCost: 0
});

const PRODUCTS_STORAGE_KEY = "cartProducts";

const CartProvider = ({children}) => {
	const [products, setProducts] = useStorageState(
		PRODUCTS_STORAGE_KEY,
		initialProducts
	);

	const addProduct = useCallback(
		product => {
			setProducts(prev => {
				const productExists = prev.some(el => el.id === product.id);
				if (productExists) {
					return prev.map(el =>
						el.id === product.id ? {...el, count: el.count + 1} : el
					);
				}

				return [...prev, new CartProductDTO(product)];
			});
		},
		[setProducts]
	);

	const removeProduct = useCallback(
		id => {
			setProducts(prev => {
				const existingProduct = prev.find(el => el.id === id);

				const productDoesNotExist = existingProduct === undefined;
				if (productDoesNotExist) {
					throw new Error(
						`Error removing product. Product with id: ${id} doesn't exists in the cart.`
					);
				}

				const productIsNotLast = existingProduct.count > 1;
				if (productIsNotLast) {
					return prev.map(el =>
						el.id === id ? {...el, count: el.count - 1} : el
					);
				}

				return prev.filter(el => el.id !== id);
			});
		},
		[setProducts]
	);

	const clearCart = useCallback(() => {
		setProducts(initialProducts);
	}, [setProducts]);

	const totalCount = useMemo(
		() => products.reduce((prev, prod) => prev + prod.count, 0),
		[products]
	);
	const totalCost = useMemo(
		() => products.reduce((prev, prod) => prev + prod.priceUsd * prod.count, 0),
		[products]
	);

	const value = useMemo(
		() => ({
			products,
			addProduct,
			removeProduct,
			clearCart,
			totalCount,
			totalCost
		}),
		[addProduct, clearCart, products, removeProduct, totalCost, totalCount]
	);

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

const useCartContext = () => useContext(CartContext);

export {CartContext, CartProvider, useCartContext};
