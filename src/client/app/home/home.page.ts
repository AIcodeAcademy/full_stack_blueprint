const html = String.raw;

class HomePage extends HTMLElement {
	#template = html`
    <h1>Home</h1>
  `;
	constructor() {
		super();
		this.innerHTML = this.#template;
	}
}

customElements.define("app-home-page", HomePage);
