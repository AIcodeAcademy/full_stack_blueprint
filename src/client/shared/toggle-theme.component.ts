import { select } from "./dom.utils";

const html = String.raw;
/**
 * A theme toggle web component
 */
export class ThemeToggle extends HTMLElement {
	#template = html`
    <a id="theme-toggle" aria-label="Toggle theme">
      <span id="light">🔳</span>
      <span id="dark">🔲</span>
    </a>
  `;
	constructor() {
		super();
		this.innerHTML = this.#template;
		this.#setTheme(this.#getSystemTheme());
	}
	connectedCallback() {
		this.addEventListener("click", this.#onToggleTheme);
	}

	disconnectedCallback() {
		this.removeEventListener("click", this.#onToggleTheme);
	}

	#setTheme(theme: string) {
		const html = document.documentElement;
		html.setAttribute("data-theme", theme);
		const light = select("#light");
		const dark = select("#dark");
		if (!light || !dark) return;
		light.style.display = theme === "light" ? "block" : "none";
		dark.style.display = theme === "dark" ? "block" : "none";
	}
	#getSystemTheme() {
		const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
		const systemTheme = prefersDark.matches ? "dark" : "light";
		return systemTheme;
	}
	#onToggleTheme() {
		const html = document.documentElement;
		const currentTheme = html.getAttribute("data-theme");
		const newTheme = currentTheme === "dark" ? "light" : "dark";
		this.#setTheme(newTheme);
	}
}

customElements.define("app-theme-toggle", ThemeToggle);
