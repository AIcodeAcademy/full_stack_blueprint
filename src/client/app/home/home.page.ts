const html = String.raw;

/**
 * Home page component
 */
export class HomePage extends HTMLElement {
	#appName = "Fullstack Blueprint";
	#template = html`
    <h1>Welcome</h1>
    <p>This is the home page of the ${this.#appName} application.</p>
  `;
	constructor() {
		super();
		this.innerHTML = this.#template;
	}
}
