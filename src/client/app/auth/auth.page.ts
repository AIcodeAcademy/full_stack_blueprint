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
		return html`
		<main class="container">
			<nav>
				<ul>
					<li>
						<button 
							class="outline" 
							data-tab="login" 
							aria-current="${this.state.mode === "login"}"
						>
							Login
						</button>
					</li>
					<li>
						<button 
							class="outline" 
							data-tab="register" 
							aria-current="${this.state.mode === "register"}"
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
	}

	// Setup event listeners
	protected override setupEventListeners(): void {
		// Add managed event listeners to tab buttons
		const loginButton = this.querySelector('button[data-tab="login"]');
		const registerButton = this.querySelector('button[data-tab="register"]');

		this.addManagedEventListener(loginButton, "click", () => {
			this.state.mode = "login";
			this.render();
		});

		this.addManagedEventListener(registerButton, "click", () => {
			this.state.mode = "register";
			this.render();
		});

		// Using bound event listener property for authenticate event
		this.addEventListener("authenticate", this.#authenticateListener);
	}

	// Remove event listeners - only need to handle non-managed listeners
	protected override removeEventListeners(): void {
		this.removeEventListener("authenticate", this.#authenticateListener);
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
