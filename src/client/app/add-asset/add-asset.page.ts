import type { Asset } from "../../domain/asset.type";
import type { Category } from "../../domain/category.type";
import { AssetFormComponent } from "./asset-form.component";
import { getCategories, postAsset } from "./asset.repository";
import { CategorySelectorComponent } from "./category-selector.component";
import { DatePickerComponent } from "./date-picker.component";

const html = String.raw;

// Define custom elements
customElements.define("category-selector-component", CategorySelectorComponent);
customElements.define("date-picker-component", DatePickerComponent);
customElements.define("asset-form-component", AssetFormComponent);

export class AddAssetPage extends HTMLElement {
	// Route: #/assets/add
	#route = "/assets/add";
	#assetForm: AssetFormComponent | null = null;

	#state = {
		categories: [] as Category[],
		error: null as string | null,
		loading: false,
	};

	#template = () => html`
    <article class="add-asset-page">
      <header>
        <h1>Add New Asset</h1>
      </header>

      <main>
        ${
					this.#state.loading
						? html`<div class="loading">Loading...</div>`
						: html`<asset-form-component></asset-form-component>`
				}
      </main>
    </article>
  `;

	constructor() {
		super();
		this.innerHTML = this.#template();
		this.#assetForm = this.querySelector("asset-form-component");
	}

	async connectedCallback() {
		this.addEventListener("asset-submit", ((e: Event) =>
			this.#handleSubmit(e as CustomEvent<Asset>)) as EventListener);
		await this.#loadCategories();
	}

	disconnectedCallback() {
		this.removeEventListener("asset-submit", ((e: Event) =>
			this.#handleSubmit(e as CustomEvent<Asset>)) as EventListener);
	}

	async #loadCategories() {
		this.#state.loading = true;
		this.#render();

		const categories = await getCategories();
		this.#state = {
			...this.#state,
			categories,
			loading: false,
		};
		this.#render();

		// Update form after render
		if (this.#assetForm) {
			this.#assetForm.categories = categories;
		}
	}

	#handleSubmit = async (event: CustomEvent<Asset>) => {
		this.#state.loading = true;
		this.#render();

		const asset = await postAsset(event.detail);

		if (asset) {
			// Navigate to assets list on success
			window.location.hash = "#/assets";
		} else {
			this.#state.error = "Failed to create asset. Please try again.";
			this.#state.loading = false;
			this.#render();

			// Update form after render
			if (this.#assetForm) {
				this.#assetForm.error = this.#state.error;
			}
		}
	};

	#render() {
		this.innerHTML = this.#template();
		this.#assetForm = this.querySelector("asset-form-component");

		// Restore form state after render
		if (this.#assetForm && !this.#state.loading) {
			this.#assetForm.categories = this.#state.categories;
			this.#assetForm.error = this.#state.error;
		}
	}
}
