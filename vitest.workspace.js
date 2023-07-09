import {defineWorkspace} from "vitest/config";

export default defineWorkspace([
	{
		extends: "./__tests__/configs/react-vitest.config.js",
		test: {name: "react"}
	},
	{
		extends: "./__tests__/configs/prisma-vitest.config.js",
		test: {name: "prisma"}
	}
]);
