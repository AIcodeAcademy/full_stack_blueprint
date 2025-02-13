import "./shared/footer.component";
import "./shared/header.component";

const html = String.raw;

/**
 * App web component attached to main body element
 */
class App extends HTMLElement {
	#mainTitle = "Fullstack Blueprint";
	#template = html`
    <app-header></app-header>
    <h1>${this.#mainTitle}</h1>
    <app-footer></app-footer>
  `;
	constructor() {
		super();
		this.innerHTML = this.#template;
	}
}

customElements.define("app-component", App);
