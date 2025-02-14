import type { Credentials } from "@client/domain/credentials.type";
import { login, register } from "./auth.repository";
import { LoginFormComponent } from "./login-form.component";
import { RegisterFormComponent } from "./register-form.component";

interface FormComponent extends HTMLElement {
	showError(message: string): void;
	clearError(): void;
}

const template = document.createElement("template");
template.innerHTML = `
  <style>
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 2rem;
      gap: 2rem;
    }

    .tabs {
      display: flex;
      gap: 1rem;
    }

    .tab {
      padding: 0.5rem 1rem;
      border: none;
      background: none;
      font-size: 1rem;
      cursor: pointer;
      border-bottom: 2px solid transparent;
      transition: border-color 0.2s;
    }

    .tab.active {
      border-bottom-color: var(--primary-color);
      color: var(--primary-color);
    }

    .forms {
      width: 100%;
      max-width: 400px;
    }

    login-form,
    register-form {
      display: none;
    }

    login-form.active,
    register-form.active {
      display: flex;
    }
  </style>

  <div class="tabs">
    <button class="tab active" data-tab="login">Login</button>
    <button class="tab" data-tab="register">Register</button>
  </div>
  <div class="forms">
    <login-form class="active"></login-form>
    <register-form></register-form>
  </div>
`;

export class AuthPage extends HTMLElement {
	#loginForm: FormComponent;
	#registerForm: FormComponent;
	#loginTab: HTMLButtonElement;
	#registerTab: HTMLButtonElement;

	constructor() {
		super();
		const shadow = this.attachShadow({ mode: "open" });
		shadow.appendChild(template.content.cloneNode(true));

		const loginForm = shadow.querySelector("login-form");
		const registerForm = shadow.querySelector("register-form");
		const loginTab = shadow.querySelector('[data-tab="login"]');
		const registerTab = shadow.querySelector('[data-tab="register"]');

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

	#showTab(tab: "login" | "register") {
		if (tab === "login") {
			this.#loginTab.classList.add("active");
			this.#registerTab.classList.remove("active");
			this.#loginForm.classList.add("active");
			this.#registerForm.classList.remove("active");
		} else {
			this.#loginTab.classList.remove("active");
			this.#registerTab.classList.add("active");
			this.#loginForm.classList.remove("active");
			this.#registerForm.classList.add("active");
		}
	}

	async #handleLogin(credentials: Credentials) {
		try {
			const userToken = await login(credentials);
			// Store token and redirect
			localStorage.setItem("token", userToken.token);
			window.location.href = "/";
		} catch (error) {
			this.#loginForm.showError("Invalid credentials");
		}
	}

	async #handleRegister(credentials: Credentials) {
		try {
			const userToken = await register(credentials);
			// Store token and redirect
			localStorage.setItem("token", userToken.token);
			window.location.href = "/";
		} catch (error) {
			this.#registerForm.showError("Registration failed. Please try again.");
		}
	}
}

customElements.define("auth-page", AuthPage);
