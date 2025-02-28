import { login, register } from "./auth.repository";

import type { Credentials } from "../../domain/credentials.type";
import { navigate } from "../../shared/navigation.utils";
import {
	AuthFormComponent,
	type AuthenticateEventDetail,
	type Mode,
} from "./auth-form.component";
customElements.define("auth-form", AuthFormComponent);

const html = String.raw;

/**
 * Auth page component
 * It displays an auth form and a navigation tab to switch between login and register
 * Calls the auth repository to login or register the user
 */
export class AuthPage extends HTMLElement {
	#authForm: AuthFormComponent;
	#loginTab: HTMLButtonElement;
	#registerTab: HTMLButtonElement;
	#mode: Mode = "login";
	#template = html`
		<main class="container">
			<nav>
				<ul>
					<li>
						<button class="outline" data-tab="login" aria-current="true">Login</button>
					</li>
					<li>
						<button class="outline" data-tab="register" aria-current="false">Register</button>
					</li>
				</ul>
			</nav>
			<section>
				<auth-form mode="login"></auth-form>
			</section>
		</main>
	`;

	constructor() {
		super();
		this.innerHTML = this.#template;
		this.#authForm = this.#selectAuthForm();
		this.#loginTab = this.#selectTab("login");
		this.#registerTab = this.#selectTab("register");
		this.#mode = "login";
	}

	connectedCallback() {
		this.#loginTab.addEventListener("click", () => this.#showLogin());
		this.#registerTab.addEventListener("click", () => this.#showRegister());
		this.addEventListener("authenticate", this.#authenticateListener);
	}

	disconnectedCallback() {
		this.#loginTab.removeEventListener("click", () => this.#showLogin());
		this.#registerTab.removeEventListener("click", () => this.#showRegister());
		this.removeEventListener("authenticate", this.#authenticateListener);
	}

	#selectAuthForm(): AuthFormComponent {
		return this.querySelector("auth-form") as AuthFormComponent;
	}

	#selectTab(tab: string): HTMLButtonElement {
		return this.querySelector(`button[data-tab="${tab}"]`) as HTMLButtonElement;
	}

	#showLogin() {
		this.#showTab("login");
	}

	#showRegister() {
		this.#showTab("register");
	}

	#showTab(tab: Mode) {
		this.#mode = tab;
		if (tab === "login") {
			this.#loginTab.setAttribute("aria-current", "true");
			this.#registerTab.setAttribute("aria-current", "false");
		} else {
			this.#loginTab.setAttribute("aria-current", "false");
			this.#registerTab.setAttribute("aria-current", "true");
		}
		this.#authForm.setAttribute("mode", tab);
	}

	#authenticateListener = ((e: CustomEvent<AuthenticateEventDetail>) => {
		this.#handleAuth(e.detail.credentials);
	}) as EventListener;

	async #handleAuth(credentials: Credentials) {
		const result =
			this.#mode === "login"
				? await login(credentials)
				: await register(credentials);
		if (result.error) {
			this.#authForm.showError("Invalid credentials.");
		} else {
			navigate("#home");
		}
	}
}
