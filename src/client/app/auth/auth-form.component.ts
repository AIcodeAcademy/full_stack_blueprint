import type { Credentials } from "@client/domain/credentials.type";

const html = String.raw;

export class AuthFormComponent extends HTMLElement {
	#mode: "login" | "register";
	#form: HTMLFormElement | null = null;
	#error: HTMLElement | null = null;
	#handleSubmitBound = this.#handleSubmit.bind(this);

	constructor() {
		super();
		this.#mode = (this.getAttribute("mode") as "login" | "register") || "login";
		this.render();
	}

	static get observedAttributes() {
		return ["mode"];
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string) {
		if (name === "mode" && oldValue !== newValue) {
			this.#mode = newValue as "login" | "register";
			this.render();
		}
	}

	connectedCallback() {
		this.#attachListeners();
	}

	disconnectedCallback() {
		this.#detachListeners();
	}

	render() {
		this.innerHTML = this.template();
		// Update references to the form and error element
		this.#form = this.querySelector("form");
		this.#error = this.querySelector("[role='alert']");
		if (this.isConnected) {
			this.#attachListeners();
		}
	}

	template(): string {
		if (this.#mode === "register") {
			return html`
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
		}
		return html`
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
	}

	#handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (!this.#form) return;
		const formData = new FormData(this.#form);
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;
		if (this.#mode === "register") {
			const confirmPassword = formData.get("confirm-password") as string;
			if (password !== confirmPassword) {
				this.showError("Passwords do not match");
				return;
			}
		}
		this.clearError();
		const credentials: Credentials = { email, password };
		const eventName = this.#mode === "login" ? "login" : "register";
		const customEvent = new CustomEvent(eventName, {
			detail: credentials,
			bubbles: true,
			composed: true,
		});
		this.dispatchEvent(customEvent);
	}

	#attachListeners() {
		if (this.#form) {
			this.#form.addEventListener("submit", this.#handleSubmitBound);
		}
	}

	#detachListeners() {
		if (this.#form) {
			this.#form.removeEventListener("submit", this.#handleSubmitBound);
		}
	}

	showError(message: string) {
		if (this.#error) {
			this.#error.textContent = message;
		}
	}

	clearError() {
		if (this.#error) {
			this.#error.textContent = "";
		}
	}
}

customElements.define("auth-form", AuthFormComponent);
