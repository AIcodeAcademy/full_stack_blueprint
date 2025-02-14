import { navigate } from "./navigation.utils";
import "./toggle-theme.component";
const html = String.raw;
/**
 * A semantic header web component with navigation
 */
export class Header extends HTMLElement {
	#appName = "Full stack Blueprint";
	#template = html`
    <header id="main-header">
      <nav>
        <ul>
          <li>
            <a href="#home"><strong>${this.#appName}</strong></a>
          </li>
        </ul>
        <ul>
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
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
		const links = Array.from(this.querySelectorAll<HTMLAnchorElement>("a"));
		for (const link of links) {
			link.addEventListener("click", (event: Event) => {
				event.preventDefault();
				const href = link.getAttribute("href");
				navigate(href);
			});
		}
		navigate(window.location.hash);
	}
}

customElements.define("app-header", Header);
