import {defineConfig, mergeConfig} from "vitest/config";
import vitestConfig from "../../vitest.config";

export default mergeConfig(
	vitestConfig,
	defineConfig({
		test: {
			include: ["./__tests__/pages/api/**/*.test.js"],
			singleThread: true
		}
	})
);
