import type { Credentials } from "@client/domain/credentials.type";

const html = String.raw;

export class LoginFormComponent extends HTMLElement {
	#form: HTMLFormElement;
	#error: HTMLElement;
	#template = html`
		<article>
			<header>
				<h2>Login</h2>
			</header>
			<form>
				<label for="email">
					Email
					<input type="email" id="email" name="email" required />
				</label>
				<label for="password">
					Password
					<input type="password" id="password" name="password" required />
				</label>
				<small role="alert" aria-live="polite"></small>
				<button type="submit">Login</button>
			</form>
		</article>
	`;

	constructor() {
		super();
		this.innerHTML = this.#template;
		const form = this.querySelector("form");
		const error = this.querySelector("[role='alert']");

		if (!(form instanceof HTMLFormElement)) {
			throw new Error("Form element not found");
		}
		if (!(error instanceof HTMLElement)) {
			throw new Error("Error element not found");
		}

		this.#form = form;
		this.#error = error;
	}

	connectedCallback() {
		this.#form.addEventListener("submit", this.#handleSubmit.bind(this));
	}

	disconnectedCallback() {
		this.#form.removeEventListener("submit", this.#handleSubmit.bind(this));
	}

	#handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		const formData = new FormData(this.#form);
		const credentials: Credentials = {
			email: formData.get("email") as string,
			password: formData.get("password") as string,
		};

		const loginEvent = new CustomEvent("login", {
			detail: credentials,
			bubbles: true,
			composed: true,
		});
		this.dispatchEvent(loginEvent);
	}

	showError(message: string) {
		this.#error.textContent = message;
	}

	clearError() {
		this.#error.textContent = "";
	}
}
