import "../app/about/about.page";
import "../app/home/home.page";

export const navigate = (path: string | null) => {
	const pageComponent = path ? path.replace("#", "") : "home";
	const pageSelector = `<app-${pageComponent}-page></app-${pageComponent}-page>`;
	const routerOutlet = document.getElementById("router-outlet");
	if (!routerOutlet) return;
	routerOutlet.innerHTML = pageSelector;
};
