import { renderAnchor } from "./dom.utils";
import { navigate } from "./navigation.utils";
import "./toggle-theme.component";
const html = String.raw;
/**
 * A semantic header web component with navigation
 */
export class Header extends HTMLElement {
	#appName = "Full stack Blueprint";
	#links = [
		{ href: "#home", text: "Home" },
		{ href: "#about", text: "About" },
	];
	#template = html`
    <header id="main-header">
      <nav>
        <ul>
          <li>
            <a href="#home"><strong>${this.#appName}</strong></a>
          </li>
        </ul>
        <ul>
          ${this.#renderLinks()}
          <li>
            <app-theme-toggle></app-theme-toggle>
          </li>
        </ul>
      </nav>
    </header>
  `;
	constructor() {
		super();
		this.innerHTML = this.#template;
		navigate(window.location.hash);
	}

	connectedCallback() {
		const anchors = Array.from(this.querySelectorAll<HTMLAnchorElement>("a"));
		for (const anchor of anchors) {
			anchor.addEventListener("click", (event: Event) => {
				event.preventDefault();
				const href = anchor.getAttribute("href");
				navigate(href);
			});
		}
	}

	#renderLinks() {
		const links = this.#links.map(
			(link) => html`<li>${renderAnchor(link.href, link.text)}</li>`,
		);
		return links.join("");
	}
}

customElements.define("app-header", Header);
