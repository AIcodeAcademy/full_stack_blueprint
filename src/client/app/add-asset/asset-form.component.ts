import { type Asset, NULL_ASSET, validateAsset } from "../../domain/asset.type";
import type { Category } from "../../domain/category.type";

const html = String.raw;

export class AssetFormComponent extends HTMLElement {
	static get observedAttributes() {
		return ["categories"];
	}

	#categories: Category[] = [];
	#currentAsset = NULL_ASSET;
	#errors: Partial<Record<keyof Asset, string>> = {};

	#template = html`
    <form class="asset-form" @submit="${this.#handleSubmit}">
      <category-selector-component
        .categories="${this.#categories}"
        @change="${this.#handleCategoryChange}"
        error="${this.#errors.category_id}"
      ></category-selector-component>

      <value-input-component
        .value="${this.#currentAsset.value}"
        @change="${this.#handleValueChange}"
        error="${this.#errors.value}"
      ></value-input-component>

      <quantity-input-component
        .value="${this.#currentAsset.quantity}"
        @change="${this.#handleQuantityChange}"
        error="${this.#errors.quantity}"
      ></quantity-input-component>

      <date-picker-component
        .value="${this.#currentAsset.acquisition_date}"
        @change="${this.#handleDateChange}"
        error="${this.#errors.acquisition_date}"
      ></date-picker-component>

      <button type="submit" ?disabled="${!this.#isValid()}">Add Asset</button>
    </form>
  `;

	constructor() {
		super();
		this.innerHTML = this.#template;
	}

	attributeChangedCallback(name: string, _: string, newValue: string) {
		if (name === "categories") {
			this.#categories = JSON.parse(newValue);
			this.#render();
		}
	}

	#handleSubmit = (event: Event) => {
		event.preventDefault();
		if (this.#isValid()) {
			this.dispatchEvent(
				new CustomEvent("submit", {
					bubbles: true,
					composed: true,
					detail: this.#currentAsset,
				}),
			);
		}
	};

	#handleCategoryChange = (event: CustomEvent<string>) => {
		this.#currentAsset.category_id = event.detail;
		this.#render();
	};

	#handleValueChange = (event: CustomEvent<number>) => {
		this.#currentAsset.value = event.detail;
		this.#render();
	};

	#handleQuantityChange = (event: CustomEvent<number>) => {
		this.#currentAsset.quantity = event.detail;
		this.#render();
	};

	#handleDateChange = (event: CustomEvent<string>) => {
		this.#currentAsset.acquisition_date = event.detail;
		this.#render();
	};

	#isValid(): boolean {
		return validateAsset(this.#currentAsset);
	}

	#render() {
		this.innerHTML = this.#template;
	}
}
