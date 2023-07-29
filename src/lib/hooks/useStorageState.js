import {useCallback, useEffect, useState} from "react";

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

	const setInStorage = useCallback(
		value => localStorage.setItem(key, JSON.stringify(value)),
		[key]
	);

	const setStateAndSetInStorage = useCallback(
		newState => {
			setState(prevState => {
				const nextState =
					typeof newState === "function" ? newState(prevState) : newState;
				setInStorage(nextState);
				return nextState;
			});
		},
		[setInStorage]
	);

	return [state, setStateAndSetInStorage];
};

export default useStorageState;
