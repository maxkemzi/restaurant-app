import path from "path";
import {defineConfig} from "vitest/config";

export default defineConfig({
	test: {
		setupFiles: ["./__tests__/setups/globalSetup.js"]
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./")
		}
	}
});
