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
						: html`
            <asset-form-component
              categories="${JSON.stringify(this.#state.categories)}"
              error="${this.#state.error}"
            ></asset-form-component>
          `
				}
      </main>
    </article>
  `;

	constructor() {
		super();
		this.innerHTML = this.#template();
	}

	async connectedCallback() {
		this.addEventListener("asset-submit", this.#handleSubmit as EventListener);
		await this.#loadCategories();
	}

	disconnectedCallback() {
		this.removeEventListener(
			"asset-submit",
			this.#handleSubmit as EventListener,
		);
	}

	async #loadCategories() {
		this.#state.loading = true;
		this.#render();

		const categories = await getCategories();
		this.#state.categories = categories;
		this.#state.loading = false;
		this.#render();
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
		}
	};

	#render() {
		this.innerHTML = this.#template();
	}
}
