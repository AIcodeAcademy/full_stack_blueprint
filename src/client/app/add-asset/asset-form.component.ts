import { type Asset, NULL_ASSET, validateAsset } from "../../domain/asset.type";
import type { Category } from "../../domain/category.type";

const html = String.raw;

export class AssetFormComponent extends HTMLElement {
	#asset: Asset = NULL_ASSET;
	#categories: Category[] = [];
	#error: string | null = null;
	#form: HTMLFormElement | null = null;
	#valueInput: HTMLInputElement | null = null;
	#quantityInput: HTMLInputElement | null = null;

	static get observedAttributes() {
		return ["categories", "error"];
	}

	#template = () => html`
    <form>
      <div class="form-group">
        <label for="category">Category</label>
        <category-selector-component
          categories="${JSON.stringify(this.#categories)}"
          selected="${this.#asset.category_id}"
        ></category-selector-component>
      </div>

      <div class="form-group">
        <label for="value">Value</label>
        <input 
          type="number" 
          name="value" 
          required 
          min="0.01" 
          step="0.01"
          value="${this.#asset.value}"
        />
      </div>

      <div class="form-group">
        <label for="quantity">Quantity</label>
        <input 
          type="number" 
          name="quantity" 
          required 
          min="1" 
          step="1"
          value="${this.#asset.quantity}"
        />
      </div>

      <div class="form-group">
        <label for="acquisition_date">Acquisition Date</label>
        <date-picker-component
          value="${this.#asset.acquisition_date}"
        ></date-picker-component>
      </div>

      ${this.#error ? html`<div class="error">${this.#error}</div>` : ""}

      <button type="submit">Add Asset</button>
    </form>
  `;

	constructor() {
		super();
		this.innerHTML = this.#template();
	}

	connectedCallback() {
		this.#form = this.querySelector("form");
		this.#valueInput = this.querySelector('input[name="value"]');
		this.#quantityInput = this.querySelector('input[name="quantity"]');

		this.#form?.addEventListener("submit", this.#handleSubmit);
		this.#valueInput?.addEventListener("change", this.#handleValueChange);
		this.#quantityInput?.addEventListener("change", this.#handleQuantityChange);
		this.addEventListener("category-change", this.#handleCategoryChange);
		this.addEventListener("date-change", this.#handleDateChange);
	}

	disconnectedCallback() {
		this.#form?.removeEventListener("submit", this.#handleSubmit);
		this.#valueInput?.removeEventListener("change", this.#handleValueChange);
		this.#quantityInput?.removeEventListener(
			"change",
			this.#handleQuantityChange,
		);
		this.removeEventListener("category-change", this.#handleCategoryChange);
		this.removeEventListener("date-change", this.#handleDateChange);
	}

	attributeChangedCallback(name: string, _: string, newValue: string) {
		if (name === "categories") {
			this.#categories = JSON.parse(newValue);
			this.#render();
		} else if (name === "error") {
			this.#error = newValue;
			this.#render();
		}
	}

	#handleCategoryChange = (event: CustomEvent<string>) => {
		this.#asset = { ...this.#asset, category_id: event.detail };
	};

	#handleValueChange = (event: Event) => {
		const input = event.target as HTMLInputElement;
		this.#asset = { ...this.#asset, value: Number(input.value) };
	};

	#handleQuantityChange = (event: Event) => {
		const input = event.target as HTMLInputElement;
		this.#asset = { ...this.#asset, quantity: Number(input.value) };
	};

	#handleDateChange = (event: CustomEvent<string>) => {
		this.#asset = { ...this.#asset, acquisition_date: event.detail };
	};

	#handleSubmit = (event: Event) => {
		event.preventDefault();
		if (validateAsset(this.#asset)) {
			this.dispatchEvent(
				new CustomEvent("asset-submit", {
					detail: this.#asset,
					bubbles: true,
				}),
			);
		}
	};

	#render() {
		this.innerHTML = this.#template();
		// Reattach event listeners after render
		this.#form = this.querySelector("form");
		this.#valueInput = this.querySelector('input[name="value"]');
		this.#quantityInput = this.querySelector('input[name="quantity"]');

		this.#form?.addEventListener("submit", this.#handleSubmit);
		this.#valueInput?.addEventListener("change", this.#handleValueChange);
		this.#quantityInput?.addEventListener("change", this.#handleQuantityChange);
		this.addEventListener("category-change", this.#handleCategoryChange);
		this.addEventListener("date-change", this.#handleDateChange);
	}
}
