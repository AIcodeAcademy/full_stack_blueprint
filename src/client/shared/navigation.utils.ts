import { AuthPage } from "@/client/app/auth/auth.page";
import { HomePage } from "@/client/app/home/home.page";
import { ToolsPage } from "@/client/app/tools/tools.page";

customElements.define("app-tools-page", ToolsPage);
customElements.define("app-home-page", HomePage);
customElements.define("app-auth-page", AuthPage);

export const navigate = (path: string | null) => {
	const pageComponent = path
		? path.replace("#", "").replace(/\//g, "-")
		: "home";
	const pageSelector = `<app-${pageComponent}-page></app-${pageComponent}-page>`;
	const routerOutlet = document.getElementById("router-outlet");
	if (!routerOutlet) return;
	routerOutlet.innerHTML = pageSelector;
};
