import type { Credentials } from "../../domain/credentials.type";
import { BasePresenterComponent } from "../../shared/base-presenter.component";

export type Mode = "login" | "register";

export type AuthenticateEventDetail = {
	credentials: Credentials;
};

const html = String.raw;

/**
 * Auth form component
 * It displays a login or register form depending on the mode attribute
 * @fires authenticate - Dispatched when the form is submitted
 */
export class AuthFormComponent extends BasePresenterComponent {
	// Private properties
	#form: HTMLFormElement | null = null;
	#error: HTMLElement | null = null;
	#submitHandler: (e: SubmitEvent) => void = () => {};

	// Getters/setters to expose mode as a property
	get mode(): Mode {
		return this.getAttributeOrDefault("mode", "login") as Mode;
	}

	set mode(value: Mode) {
		this.setAttribute("mode", value);
	}

	// Override observed attributes to react to mode changes
	static override get observedAttributes() {
		return ["mode"];
	}

	// Template method implementation
	protected override template(): string {
		if (this.mode === "register") {
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

	// Override render to update element references
	protected override render(): void {
		super.render();
		this.#form = this.selectElement<HTMLFormElement>("form");
		this.#error = this.selectElement<HTMLElement>("[role='alert']");
	}

	// Override setup event listeners
	protected override setupEventListeners(): void {
		if (this.#form) {
			// Create form submit handler using the helper method
			this.#submitHandler = this.handleFormSubmit(
				this.#form,
				this.#processFormData.bind(this),
			);
			this.#form.addEventListener("submit", this.#submitHandler);
		}
	}

	// Override remove event listeners
	protected override removeEventListeners(): void {
		if (this.#form) {
			this.#form.removeEventListener("submit", this.#submitHandler);
		}
	}

	// Process form data and dispatch event
	#processFormData(formData: FormData): void {
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;

		if (this.mode === "register") {
			const confirmPassword = formData.get("confirm-password") as string;
			if (password !== confirmPassword) {
				this.showError("Passwords do not match");
				return;
			}
		}

		this.clearError();
		const credentials: Credentials = { email, password };
		this.dispatchCustomEvent<AuthenticateEventDetail>("authenticate", {
			credentials,
		});
	}

	// Public methods
	showError(message: string): void {
		if (this.#error) {
			this.#error.textContent = message;
		}
	}

	clearError(): void {
		if (this.#error) {
			this.#error.textContent = "";
		}
	}
}
