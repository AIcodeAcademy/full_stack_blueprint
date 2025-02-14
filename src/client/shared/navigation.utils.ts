import { AboutPage } from "../app/about/about.page";
import { HomePage } from "../app/home/home.page";

customElements.define("app-about-page", AboutPage);
customElements.define("app-home-page", HomePage);

export const navigate = (path: string | null) => {
	const pageComponent = path ? path.replace("#", "") : "home";
	const pageSelector = `<app-${pageComponent}-page></app-${pageComponent}-page>`;
	const routerOutlet = document.getElementById("router-outlet");
	if (!routerOutlet) return;
	routerOutlet.innerHTML = pageSelector;
};
