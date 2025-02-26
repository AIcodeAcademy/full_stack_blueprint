import { Footer } from "@/client/app/layout/footer.component";
import { Header } from "@/client/app/layout/header.component";

const html = String.raw;
customElements.define("app-header", Header);
customElements.define("app-footer", Footer);

/**
 * App web component attached to main body element
 */
class App extends HTMLElement {
	#template = html`
    <app-header></app-header>
    <main id="router-outlet"></main>
    <app-footer></app-footer>
  `;
	constructor() {
		super();
		this.innerHTML = this.#template;
	}
}

customElements.define("app-component", App);
