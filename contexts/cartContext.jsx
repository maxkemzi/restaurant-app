import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState
} from "react";

const cartInitialValue = {
	// Products object contains keys, that represent product id,
	// each key has an array of products with same ids as a value
	// products: {
	// 	[productId]: CartProductDTO[]
	// }
	products: {},
	cost: 0,
	count: 0
};

const cartContext = createContext({
	cart: cartInitialValue,
	addProduct: () => {},
	removeProduct: () => {},
	clearCart: () => {}
});

const CartProvider = ({children}) => {
	const [cart, setCart] = useState(cartInitialValue);

	useEffect(() => {
		if (!localStorage.getItem("cart")) {
			// If there is no cart item in local storage, set it with initial value
			localStorage.setItem("cart", JSON.stringify(cartInitialValue));
		}

		// Synchronize state value and local storage value
		setCart(JSON.parse(localStorage.getItem("cart")));
	}, []);

	const addProduct = useCallback(product => {
		setCart(prev => {
			const newValue = {...prev};

			// If products object has a key that represents new product's id,
			// push a new product to the array
			if (Object.hasOwn(newValue.products, product.id)) {
				newValue.products[product.id].push(product);
			} else {
				// Otherwise, create new key that represents new product's id
				// and add a new product to the array
				newValue.products[product.id] = [product];
			}

			// Add product cost to the total cost of the cart
			newValue.cost += product.priceUSD;
			// Increment total cart products count
			newValue.count += 1;

			// Update local storage value
			localStorage.setItem("cart", JSON.stringify(newValue));

			return newValue;
		});
	}, []);

	const removeProduct = useCallback(id => {
		setCart(prev => {
			const newValue = {...prev};

			// Get the last product by id
			const product = newValue.products[id].pop();

			// Subtract product cost from the total cost of the cart
			newValue.cost -= product.priceUSD;
			// Decrement total cart products count
			newValue.count -= 1;

			// If it is the last product in the array,
			// delete key that represents product's id
			if (newValue.products[id].length === 0) {
				delete newValue.products[id];
			}

			// Update local storage value
			localStorage.setItem("cart", JSON.stringify(newValue));
			return newValue;
		});
	}, []);

	const clearCart = useCallback(() => {
		// Remove cart value from local storage
		localStorage.removeItem("cart");
		// Reset state to it's initial value
		setCart(cartInitialValue);
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

	return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
};

const useCartContext = () => useContext(cartContext);

export {CartProvider, useCartContext};
