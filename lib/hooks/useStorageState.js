import {useState, useEffect} from "react";

const useStorageState = (key, initialState) => {
	const [state, setState] = useState(initialState);

	useEffect(() => {
		const initState = () => {
			const stateFromStorage = localStorage.getItem(key);

			const stateIsInStorage = !!stateFromStorage;
			if (stateIsInStorage) {
				setState(JSON.parse(stateFromStorage));
			}
		};
		initState();
	}, [key]);

	useEffect(() => {
		const updateState = () => localStorage.setItem(key, JSON.stringify(state));
		updateState();
	}, [key, state]);

	return [state, setState];
};

export default useStorageState;
