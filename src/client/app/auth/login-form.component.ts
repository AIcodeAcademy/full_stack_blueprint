import type { Credentials } from "@client/domain/credentials.type";

const template = document.createElement("template");
template.innerHTML = `
  <style>
    :host {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 2rem;
      border-radius: 0.5rem;
      background-color: var(--surface-color);
      box-shadow: var(--shadow);
    }

    h2 {
      margin: 0;
      color: var(--primary-color);
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .field {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    label {
      font-weight: 500;
      color: var(--text-color);
    }

    input {
      padding: 0.5rem;
      border: 1px solid var(--border-color);
      border-radius: 0.25rem;
      font-size: 1rem;
    }

    button {
      padding: 0.75rem;
      background-color: var(--primary-color);
      color: white;
      border: none;
      border-radius: 0.25rem;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    button:hover {
      background-color: var(--primary-dark-color);
    }

    .error {
      color: var(--error-color);
      font-size: 0.875rem;
    }
  </style>

  <h2>Login</h2>
  <form>
    <div class="field">
      <label for="email">Email</label>
      <input type="email" id="email" name="email" required />
    </div>
    <div class="field">
      <label for="password">Password</label>
      <input type="password" id="password" name="password" required />
    </div>
    <div class="error"></div>
    <button type="submit">Login</button>
  </form>
`;

export class LoginFormComponent extends HTMLElement {
	#form: HTMLFormElement;
	#error: HTMLDivElement;

	constructor() {
		super();
		const shadow = this.attachShadow({ mode: "open" });
		shadow.appendChild(template.content.cloneNode(true));

		const form = shadow.querySelector("form");
		const error = shadow.querySelector(".error");

		if (!(form instanceof HTMLFormElement)) {
			throw new Error("Form element not found");
		}
		if (!(error instanceof HTMLDivElement)) {
			throw new Error("Error element not found");
		}

		this.#form = form;
		this.#error = error;
		this.#form.addEventListener("submit", this.#handleSubmit.bind(this));
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

customElements.define("login-form", LoginFormComponent);
