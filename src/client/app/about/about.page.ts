const html = String.raw;

class AboutPage extends HTMLElement {
	#template = html`
    <h1>About</h1>
  `;
	constructor() {
		super();
		this.innerHTML = this.#template;
	}
}

customElements.define("app-about-page", AboutPage);
