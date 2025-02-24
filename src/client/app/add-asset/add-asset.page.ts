import { type Asset, NULL_ASSET } from "../../domain/asset.type";
import type { Category } from "../../domain/category.type";
import { navigate } from "../../shared/navigation.utils";
import { AssetFormComponent } from "./asset-form.component";
import { createAsset } from "./asset.repository";
import { CategorySelectorComponent } from "./category-selector.component";
import { getCategories } from "./category.repository";
import { DatePickerComponent } from "./date-picker.component";
import { QuantityInputComponent } from "./quantity-input.component";
import { ValueInputComponent } from "./value-input.component";

const html = String.raw;

// Register custom elements
customElements.define("asset-form-component", AssetFormComponent);
customElements.define("category-selector-component", CategorySelectorComponent);
customElements.define("value-input-component", ValueInputComponent);
customElements.define("quantity-input-component", QuantityInputComponent);
customElements.define("date-picker-component", DatePickerComponent);

export class AddAssetPage extends HTMLElement {
	#state = {
		asset: { ...NULL_ASSET },
		categories: [] as Category[],
		loading: false,
		error: null as string | null,
	};

	#template = html`
    <div class="add-asset-page">
      <h1>Add New Asset</h1>
      ${
				this.#state.loading
					? html`<div class="loading">Loading...</div>`
					: html`
        <asset-form-component
          .categories="${JSON.stringify(this.#state.categories)}"
          @submit="${this.#handleSubmit}"
        ></asset-form-component>
        ${this.#state.error ? html`<div class="error">${this.#state.error}</div>` : ""}
      `
			}
    </div>
  `;

	constructor() {
		super();
		this.innerHTML = this.#template;
	}

	async connectedCallback() {
		this.#state.loading = true;
		this.#render();

		const result = await getCategories();
		if (result.ok) {
			this.#state.categories = result.data;
		} else {
			this.#state.error = result.error;
		}

		this.#state.loading = false;
		this.#render();
	}

	#handleSubmit = async (event: CustomEvent<Asset>) => {
		this.#state.loading = true;
		this.#render();

		const result = await createAsset(event.detail);
		if (result.ok) {
			navigate("/assets");
		} else {
			this.#state.error = result.error;
			this.#state.loading = false;
			this.#render();
		}
	};

	#render() {
		this.innerHTML = this.#template;
	}
}
