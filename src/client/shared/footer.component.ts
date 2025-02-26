import { renderAnchor } from "./dom.utils";

const html = String.raw;
/**
 * A semantic footer web component
 */
export class Footer extends HTMLElement {
	#currentYear = new Date().getFullYear();
	#author = {
		name: "Alberto Basalo",
		url: "https://albertobasalo.dev",
	};
	#company = {
		name: "AI Code Academy",
		url: "https://aicode.academy",
	};
	#template = html` 
        <span>&copy; ${this.#currentYear}</span>
        <span>By ${renderAnchor(this.#author.url, this.#author.name)}</span>
        <span>for ${renderAnchor(this.#company.url, this.#company.name)}</span>
      </p>
    </footer>
  `;
	constructor() {
		super();
		this.innerHTML = this.#template;
	}
}
