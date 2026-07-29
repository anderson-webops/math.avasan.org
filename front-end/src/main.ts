import type { UserModule } from "~/types.ts";
import { setupLayouts } from "virtual:generated-layouts";

import { routes } from "vue-router/auto-routes";
import App from "./App.vue";
import { ViteSSG } from "./ssg";
import "./styles/main.css";

// https://github.com/antfu/vite-ssg
// noinspection JSUnusedGlobalSymbols
export const createApp = ViteSSG(
	App,
	{
		routes: setupLayouts([...routes]),
		base: import.meta.env.BASE_URL
	},
	ctx => {
		Object.values(
			import.meta.glob<UserModule>(
				["./modules/nprogress.ts", "./modules/pinia.ts"],
				{ eager: true, import: "install" }
			)
		).forEach(install => install?.(ctx));
	}
);
