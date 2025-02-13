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
        <span>By <a href="${this.#author.url}" target="_blank">${this.#author.name}</a></span>
        <span>for <a href="${this.#company.url}" target="_blank">${this.#company.name}</a></span>
      </p>
    </footer>
  `;
	constructor() {
		super();
		this.innerHTML = this.#template;
	}
}

customElements.define("app-footer", Footer);
