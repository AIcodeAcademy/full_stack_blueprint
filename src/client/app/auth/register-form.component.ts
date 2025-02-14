import type { Credentials } from "@client/domain/credentials.type";

const html = String.raw;

export class RegisterFormComponent extends HTMLElement {
	#form: HTMLFormElement;
	#error: HTMLElement;
	#template = html`
		<article>
			<header>
				<h2>Register</h2>
			</header>
			<form>
				<label for="email">
					Email
					<input type="email" id="email" name="email" required value="test@test.com" />
				</label>
				<label for="password">
					Password
					<input type="password" id="password" name="password" required value="123456" />
				</label>
				<label for="confirm-password">
					Confirm Password
					<input type="password" id="confirm-password" name="confirm-password" required value="123456" />
				</label>
				<small role="alert" aria-live="polite"></small>
				<button type="submit">Register</button>
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
		const password = formData.get("password") as string;
		const confirmPassword = formData.get("confirm-password") as string;

		if (password !== confirmPassword) {
			this.showError("Passwords do not match");
			return;
		}

		const credentials: Credentials = {
			email: formData.get("email") as string,
			password,
		};

		const registerEvent = new CustomEvent("register", {
			detail: credentials,
			bubbles: true,
			composed: true,
		});
		this.dispatchEvent(registerEvent);
	}

	showError(message: string) {
		this.#error.textContent = message;
	}

	clearError() {
		this.#error.textContent = "";
	}
}
