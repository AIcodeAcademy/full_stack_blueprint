import { BasePageComponent } from "../../shared/base-page.component";
import { navigate } from "../../shared/navigation.utils";
import { FeatureListComponent } from "./feature-list.component";
import { type AppInfo, homeRepository } from "./home.repository";

// Define custom elements
customElements.define("feature-list", FeatureListComponent);

const html = String.raw;

/**
 * Home page component
 */
export class HomePage extends BasePageComponent {
	// Extend state to include app info
	protected override state = {
		loading: false,
		error: null as string | null,
		data: null as unknown,
		appInfo: null as AppInfo | null,
	};

	// Typed presenter components
	protected override presenterComponents: {
		featureList: FeatureListComponent | null;
	} = {
		featureList: null,
	};

	// Template method implementation
	protected override template(): string {
		return html`
      <main class="container">
        <h1>Welcome</h1>
        <p>This is the home page of the ${this.state.appInfo?.name || "Application"}</p>
        
        ${
					this.state.loading
						? html`<div class="loading">Loading application info...</div>`
						: html`
              <feature-list></feature-list>
              <div class="actions">
                <a href="#assets/add" class="button">Add Asset</a>
              </div>
            `
				}
        
        ${
					this.state.error
						? html`<div class="error">${this.state.error}</div>`
						: ""
				}
          
        <footer>
          <small>Version: ${this.state.appInfo?.version || "0.0.0"}</small>
        </footer>
      </main>
    `;
	}

	// Initialize presenters after render
	protected override initializePresenters(): void {
		this.presenterComponents.featureList = this.querySelector(
			"feature-list",
		) as FeatureListComponent;
	}

	// Update presenters with current state
	protected override updatePresenters(): void {
		if (this.presenterComponents.featureList && this.state.appInfo) {
			this.presenterComponents.featureList.features =
				this.state.appInfo.features;
		}
	}

	// Setup event listeners
	protected override setupEventListeners(): void {
		// Add managed event listener for the Add Asset link
		const addAssetLink = this.querySelector('a[href="#assets/add"]');

		this.addManagedEventListener(addAssetLink, "click", (event) => {
			event.preventDefault();
			const target = event.target as HTMLAnchorElement;
			const href = target.getAttribute("href");
			if (href) {
				navigate(href);
			}
		});
	}

	// Load data from repository
	protected override async loadData(): Promise<void> {
		await this.handleApiRequest(async () => {
			const appInfo = await homeRepository.getAppInfo();
			this.state.appInfo = appInfo;
			return appInfo;
		});
	}
}
