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

export class AuthPage extends HTMLElement {
	#authForm: AuthFormComponent;
	#loginTab: HTMLButtonElement;
	#registerTab: HTMLButtonElement;
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
	}

	connectedCallback() {
		this.#loginTab.addEventListener("click", () =>
			this.#showTab("login" as Mode),
		);
		this.#registerTab.addEventListener("click", () =>
			this.#showTab("register" as Mode),
		);
		this.addEventListener("authenticate", ((
			e: CustomEvent<AuthenticateEventDetail>,
		) => {
			const { mode, credentials } = e.detail;
			this.#handleAuth(mode, credentials);
		}) as EventListener);
	}

	disconnectedCallback() {
		this.#loginTab.removeEventListener("click", () =>
			this.#showTab("login" as Mode),
		);
		this.#registerTab.removeEventListener("click", () =>
			this.#showTab("register" as Mode),
		);
		this.removeEventListener("authenticate", ((
			e: CustomEvent<AuthenticateEventDetail>,
		) => {
			const { mode, credentials } = e.detail;
			this.#handleAuth(mode, credentials);
		}) as EventListener);
	}

	#showTab(tab: Mode) {
		if (tab === "login") {
			this.#loginTab.setAttribute("aria-current", "true");
			this.#registerTab.setAttribute("aria-current", "false");
		} else {
			this.#loginTab.setAttribute("aria-current", "false");
			this.#registerTab.setAttribute("aria-current", "true");
		}
		this.#authForm.setAttribute("mode", tab);
	}

	async #handleAuth(mode: Mode, credentials: Credentials) {
		try {
			const userToken =
				mode === "login"
					? await login(credentials)
					: await register(credentials);
			localStorage.setItem("userToken", JSON.stringify(userToken));
			navigate("#home");
		} catch (error) {
			console.error(`${mode} failed:`, error);
			this.#authForm.showError(
				mode === "login"
					? "Invalid credentials"
					: "Registration failed. Please try again.",
			);
		}
	}
}
