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
            <app-theme-toggle></app-theme-toggle>
          </li>
        </ul>
      </nav>
    </header>
  `;
	constructor() {
		super();
		this.innerHTML = this.#template;
	}
}

customElements.define("app-header", Header);
