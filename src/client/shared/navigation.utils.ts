import { AboutPage } from "../app/about/about.page";
import { AddAssetPage } from "../app/add-asset/add-asset.page";
import { AuthPage } from "../app/auth/auth.page";
import { HomePage } from "../app/home/home.page";

customElements.define("app-about-page", AboutPage);
customElements.define("app-home-page", HomePage);
customElements.define("app-auth-page", AuthPage);
customElements.define("app-add-asset-page", AddAssetPage);

export const navigate = (path: string | null) => {
	const pageComponent = path
		? path.replace("#", "").replace(/\//g, "-")
		: "home";
	const pageSelector = `<app-${pageComponent}-page></app-${pageComponent}-page>`;
	const routerOutlet = document.getElementById("router-outlet");
	if (!routerOutlet) return;
	routerOutlet.innerHTML = pageSelector;
};
