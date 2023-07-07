import react from "@vitejs/plugin-react";
import {defineConfig, mergeConfig} from "vitest/config";
import vitestConfig from "../../vitest.config";

export default mergeConfig(
	vitestConfig,
	defineConfig({
		plugins: [react()],
		test: {
			include: ["./__tests__/components/**/*.test.jsx"],
			setupFiles: ["./__tests__/setups/reactSetup.js"],
			environment: "jsdom"
		}
	})
);
