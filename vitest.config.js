import {defineConfig} from "vitest/config";
import path from "path";

export default defineConfig({
	test: {
		setupFiles: ["./__tests__/setup.js"]
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./")
		}
	}
});
