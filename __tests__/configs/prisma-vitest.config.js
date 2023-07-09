import {defineConfig, mergeConfig} from "vitest/config";
import vitestConfig from "../../vitest.config";

export default mergeConfig(
	vitestConfig,
	defineConfig({
		test: {
			include: ["./__tests__/lib/prisma/**/*.test.js"],
			setupFiles: ["./__tests__/setups/prismaSetup.js"]
		}
	})
);
