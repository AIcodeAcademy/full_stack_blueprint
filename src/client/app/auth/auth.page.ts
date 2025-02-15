import { login, register } from "./auth.repository";

import { navigate } from "@/client/shared/navigation.utils";
import type { Credentials } from "@client/domain/credentials.type";
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

		const authForm = this.querySelector("auth-form");
		const loginTab = this.querySelector('[data-tab="login"]');
		const registerTab = this.querySelector('[data-tab="register"]');

		if (!(authForm instanceof AuthFormComponent)) {
			throw new Error("Auth form not found");
		}
		if (!(loginTab instanceof HTMLButtonElement)) {
			throw new Error("Login tab not found");
		}
		if (!(registerTab instanceof HTMLButtonElement)) {
			throw new Error("Register tab not found");
		}

		this.#authForm = authForm;
		this.#loginTab = loginTab;
		this.#registerTab = registerTab;
		this.#mode = "login";
	}

	connectedCallback() {
		this.#loginTab.addEventListener("click", () => this.#showTab("login"));
		this.#registerTab.addEventListener("click", () =>
			this.#showTab("register"),
		);
		this.addEventListener("authenticate", ((
			e: CustomEvent<AuthenticateEventDetail>,
		) => {
			this.#handleAuth(e.detail.credentials);
		}) as EventListener);
	}

	disconnectedCallback() {
		this.#loginTab.removeEventListener("click", () => this.#showTab("login"));
		this.#registerTab.removeEventListener("click", () =>
			this.#showTab("register"),
		);
		this.removeEventListener("authenticate", ((
			e: CustomEvent<AuthenticateEventDetail>,
		) => {
			this.#handleAuth(e.detail.credentials);
		}) as EventListener);
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

	async #handleAuth(credentials: Credentials) {
		try {
			const userToken =
				this.#mode === "login"
					? await login(credentials)
					: await register(credentials);
			localStorage.setItem("userToken", JSON.stringify(userToken));
			navigate("#home");
		} catch (error) {
			console.error(`${this.#mode} failed:`, error);
			this.#authForm.showError(
				this.#mode === "login"
					? "Invalid credentials"
					: "Registration failed. Please try again.",
			);
		}
	}
}
