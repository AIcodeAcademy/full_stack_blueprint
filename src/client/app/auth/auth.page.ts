import type { Credentials } from "@client/domain/credentials.type";
import { login, register } from "./auth.repository";

import { navigate } from "@/client/shared/navigation.utils";
import { LoginFormComponent } from "./login-form.component";
import { RegisterFormComponent } from "./register-form.component";

customElements.define("login-form", LoginFormComponent);
customElements.define("register-form", RegisterFormComponent);

interface FormComponent extends HTMLElement {
	showError(message: string): void;
	clearError(): void;
}

const html = String.raw;

export class AuthPage extends HTMLElement {
	#loginForm: FormComponent;
	#registerForm: FormComponent;
	#loginTab: HTMLButtonElement;
	#registerTab: HTMLButtonElement;
	#template = html`
		<main class="container">
			<nav>
				<ul>
					<li>
						<button class="outline" data-tab="login" aria-pressed="true">Login</button>
					</li>
					<li>
						<button class="outline" data-tab="register" aria-pressed="false">Register</button>
					</li>
				</ul>
			</nav>
			<section>
				<login-form></login-form>
				<register-form hidden></register-form>
			</section>
		</main>
	`;

	constructor() {
		super();
		this.innerHTML = this.#template;

		const loginForm = this.querySelector("login-form");
		const registerForm = this.querySelector("register-form");
		const loginTab = this.querySelector('[data-tab="login"]');
		const registerTab = this.querySelector('[data-tab="register"]');

		if (!(loginForm instanceof LoginFormComponent)) {
			throw new Error("Login form not found");
		}
		if (!(registerForm instanceof RegisterFormComponent)) {
			throw new Error("Register form not found");
		}
		if (!(loginTab instanceof HTMLButtonElement)) {
			throw new Error("Login tab not found");
		}
		if (!(registerTab instanceof HTMLButtonElement)) {
			throw new Error("Register tab not found");
		}

		this.#loginForm = loginForm;
		this.#registerForm = registerForm;
		this.#loginTab = loginTab;
		this.#registerTab = registerTab;
	}

	connectedCallback() {
		this.#loginTab.addEventListener("click", () => this.#showTab("login"));
		this.#registerTab.addEventListener("click", () =>
			this.#showTab("register"),
		);
		this.addEventListener("login", ((e: CustomEvent<Credentials>) => {
			this.#handleLogin(e.detail);
		}) as EventListener);
		this.addEventListener("register", ((e: CustomEvent<Credentials>) => {
			this.#handleRegister(e.detail);
		}) as EventListener);
	}

	disconnectedCallback() {
		this.#loginTab.removeEventListener("click", () => this.#showTab("login"));
		this.#registerTab.removeEventListener("click", () =>
			this.#showTab("register"),
		);
		this.removeEventListener("login", ((e: CustomEvent<Credentials>) => {
			this.#handleLogin(e.detail);
		}) as EventListener);
		this.removeEventListener("register", ((e: CustomEvent<Credentials>) => {
			this.#handleRegister(e.detail);
		}) as EventListener);
	}

	#showTab(tab: "login" | "register") {
		if (tab === "login") {
			this.#loginTab.setAttribute("aria-pressed", "true");
			this.#registerTab.setAttribute("aria-pressed", "false");
			this.#loginForm.removeAttribute("hidden");
			this.#registerForm.setAttribute("hidden", "");
		} else {
			this.#loginTab.setAttribute("aria-pressed", "false");
			this.#registerTab.setAttribute("aria-pressed", "true");
			this.#loginForm.setAttribute("hidden", "");
			this.#registerForm.removeAttribute("hidden");
		}
	}

	async #handleLogin(credentials: Credentials) {
		try {
			const userToken = await login(credentials);
			localStorage.setItem("token", userToken.token);
			window.location.href = "/";
		} catch (error) {
			console.error("Login failed:", error);
			this.#loginForm.showError("Invalid credentials");
		}
	}

	async #handleRegister(credentials: Credentials) {
		try {
			const userToken = await register(credentials);
			localStorage.setItem("userToken", JSON.stringify(userToken));
			navigate("#home");
		} catch (error) {
			console.error("Registration failed:", error);
			this.#registerForm.showError("Registration failed. Please try again.");
		}
	}
}
