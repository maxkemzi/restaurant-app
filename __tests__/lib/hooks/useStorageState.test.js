import {useStorageState} from "@/lib/hooks";
import {afterEach, it, expect} from "vitest";
import {renderHook, act} from "@testing-library/react";

afterEach(() => {
	localStorage.clear();
});

it("should return initial state", () => {
	const initialValue = "initialValue";
	const {result} = renderHook(() => useStorageState("testKey", initialValue));

	const state = result.current[0];
	expect(state).toBe(initialValue);
});

it("should update state and store in localStorage", () => {
	const key = "testKey";
	const {result} = renderHook(() => useStorageState(key, "initialValue"));

	const updatedValue = "updatedValue";
	act(() => {
		const setState = result.current[1];
		setState(updatedValue);
	});

	const state = result.current[0];
	expect(state).toBe(updatedValue);
	expect(JSON.parse(localStorage.getItem(key))).toBe(updatedValue);
});

it("should restore state from localStorage", () => {
	const key = "testKey";
	const value = "storedValue";
	localStorage.setItem(key, JSON.stringify(value));

	const {result} = renderHook(() => useStorageState(key, "initialValue"));

	const state = result.current[0];
	expect(state).toBe(value);
});

it("should call setState function and store in localStorage", () => {
	const key = "testKey";
	const initialValue = "initialValue";
	const {result} = renderHook(() => useStorageState(key, initialValue));

	act(() => {
		const setState = result.current[1];
		setState(prevState => prevState.toUpperCase());
	});

	const state = result.current[0];
	const expectedValue = initialValue.toUpperCase();
	expect(state).toBe(expectedValue);
	expect(JSON.parse(localStorage.getItem(key))).toBe(expectedValue);
});
