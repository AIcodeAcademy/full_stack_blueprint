import type { Credentials } from "../../domain/credentials.type";
import { BasePageComponent } from "../../shared/base-page.component";
import { navigate } from "../../shared/navigation.utils";
import {
	AuthFormComponent,
	type AuthenticateEventDetail,
	type Mode,
} from "./auth-form.component";
import { authRepository } from "./auth.repository";

// Define custom elements
customElements.define("auth-form", AuthFormComponent);

const html = String.raw;

/**
 * Auth page component
 * It displays an auth form and a navigation tab to switch between login and register
 * Calls the auth repository to login or register the user
 */
export class AuthPage extends BasePageComponent {
	constructor() {
		super();
		console.log("AuthPage constructed");
	}

	// Extended state properties for this page
	protected override state = {
		loading: false,
		error: null as string | null,
		data: null as unknown,
		mode: "login" as Mode,
	};

	// References to child components
	protected override presenterComponents: {
		authForm: AuthFormComponent | null;
		loginTab: HTMLButtonElement | null;
		registerTab: HTMLButtonElement | null;
	} = {
		authForm: null,
		loginTab: null,
		registerTab: null,
	};

	// Auth page template using state for rendering
	protected override template(): string {
		console.log("Template rendering with mode:", this.state.mode);
		return html`
		<main class="container">
			<nav>
				<ul>
					<li>
						<button 
							class="outline" 
							data-tab="login" 
							aria-current="${this.state.mode === "login"}"
							onclick="console.log('Login button clicked via inline handler')"
						>
							Login
						</button>
					</li>
					<li>
						<button 
							class="outline" 
							data-tab="register" 
							aria-current="${this.state.mode === "register"}"
							onclick="console.log('Register button clicked via inline handler')"
						>
							Register
						</button>
					</li>
				</ul>
			</nav>
			<section>
				${
					this.state.loading
						? html`<div class="loading">Loading...</div>`
						: html`<auth-form mode="${this.state.mode}"></auth-form>`
				}
				${
					this.state.error
						? html`<div class="error">${this.state.error}</div>`
						: ""
				}
			</section>
		</main>
		`;
	}

	// Initialize presenter components after render
	protected override initializePresenters(): void {
		this.presenterComponents.authForm = this.querySelector(
			"auth-form",
		) as AuthFormComponent;
		this.presenterComponents.loginTab = this.querySelector(
			'button[data-tab="login"]',
		) as HTMLButtonElement;
		this.presenterComponents.registerTab = this.querySelector(
			'button[data-tab="register"]',
		) as HTMLButtonElement;

		console.log("Initialized presenters:", {
			authForm: !!this.presenterComponents.authForm,
			loginTab: !!this.presenterComponents.loginTab,
			registerTab: !!this.presenterComponents.registerTab,
		});
	}

	// Setup event listeners
	protected override setupEventListeners(): void {
		// Store bound handlers as properties to ensure same reference for removal
		this.#loginTabHandler = this.#showTab.bind(this, "login");
		this.#registerTabHandler = this.#showTab.bind(this, "register");

		this.presenterComponents.loginTab?.addEventListener(
			"click",
			this.#loginTabHandler,
		);
		this.presenterComponents.registerTab?.addEventListener(
			"click",
			this.#registerTabHandler,
		);
		this.addEventListener("authenticate", this.#authenticateListener);

		console.log("Event listeners set up for tabs");
	}

	// Remove event listeners
	protected override removeEventListeners(): void {
		this.presenterComponents.loginTab?.removeEventListener(
			"click",
			this.#loginTabHandler,
		);
		this.presenterComponents.registerTab?.removeEventListener(
			"click",
			this.#registerTabHandler,
		);
		this.removeEventListener("authenticate", this.#authenticateListener);
	}

	// Bound event handlers
	#loginTabHandler: EventListener = () => {};
	#registerTabHandler: EventListener = () => {};

	// Show login or register tab
	#showTab(tab: Mode): void {
		console.log("Tab clicked:", tab);
		this.state.mode = tab;
		console.log("State updated, new mode:", this.state.mode);
		this.render();
		console.log("Render called after tab change");
	}

	// Handle authentication event
	#authenticateListener = ((e: CustomEvent<AuthenticateEventDetail>) => {
		this.#handleAuth(e.detail.credentials);
	}) as EventListener;

	// Handle authentication with repository
	async #handleAuth(credentials: Credentials): Promise<void> {
		await this.handleApiRequest(async () => {
			const userToken =
				this.state.mode === "login"
					? await authRepository.login(credentials)
					: await authRepository.register(credentials);

			if (userToken.token) {
				localStorage.setItem("userToken", JSON.stringify(userToken));
				navigate("#home");
			} else {
				const errorMessage =
					this.state.mode === "login"
						? "Invalid credentials"
						: "Registration failed. Please try again.";

				this.presenterComponents.authForm?.showError(errorMessage);
				throw new Error(errorMessage);
			}

			return userToken;
		});
	}
}
