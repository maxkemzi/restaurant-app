"use client";

import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState
} from "react";

const initialCartState = {
	products: {},
	cost: 0,
	count: 0
};

const CartContext = createContext({
	cart: initialCartState,
	addProduct: () => {},
	removeProduct: () => {},
	clearCart: () => {}
});

const CART_STORAGE_KEY = "cart";

const CartProvider = ({children}) => {
	const [cart, setCart] = useState(initialCartState);

	useEffect(() => {
		const cartFromStorage = localStorage.getItem(CART_STORAGE_KEY);
		const cartInStorage = !!localStorage.getItem(CART_STORAGE_KEY);

		if (!cartInStorage) {
			localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(initialCartState));
			return;
		}

		setCart(JSON.parse(cartFromStorage));
	}, []);

	const updateCartInStorage = updatedState => {
		if (typeof window !== "undefined") {
			localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedState));
		}
	};

	const addProduct = useCallback(product => {
		setCart(prev => {
			const updatedCart = {...prev};
			const {products} = updatedCart;

			const productExists = Object.hasOwn(products, product.id);

			if (productExists) {
				products[product.id].push(product);
			} else {
				products[product.id] = [product];
			}

			updatedCart.cost += product.priceUSD;
			updatedCart.count += 1;

			updateCartInStorage(updatedCart);

			return updatedCart;
		});
	}, []);

	const removeProduct = useCallback(id => {
		setCart(prev => {
			const updatedCart = {...prev};
			const {products} = updatedCart;

			const productsById = products[id];
			const removedProduct = productsById.pop();

			updatedCart.cost -= removedProduct.priceUSD;
			updatedCart.count -= 1;

			const noProductsByIdLeft = productsById.length === 0;
			if (noProductsByIdLeft) {
				delete products[id];
			}

			updateCartInStorage(updatedCart);

			return updatedCart;
		});
	}, []);

	const clearCart = useCallback(() => {
		localStorage.removeItem(CART_STORAGE_KEY);
		setCart(initialCartState);
	}, []);

	const value = useMemo(
		() => ({
			cart,
			addProduct,
			removeProduct,
			clearCart
		}),
		[addProduct, removeProduct, cart, clearCart]
	);

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

const useCartContext = () => useContext(CartContext);

export {CartProvider, useCartContext};
