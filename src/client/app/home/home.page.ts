import { navigate } from "@/client/shared/navigation.utils";

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
		// Add event listener to the add asset link
		this.querySelector("a")?.addEventListener("click", (event) => {
			event.preventDefault();
			const target = event.target as HTMLAnchorElement;
			const href = target.getAttribute("href");
			navigate(href);
		});
	}
}
