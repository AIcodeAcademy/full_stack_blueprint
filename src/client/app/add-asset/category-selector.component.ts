import type { Category } from "../../domain/category.type";

const html = String.raw;

export class CategorySelectorComponent extends HTMLElement {
	static get observedAttributes() {
		return ["categories", "error"];
	}

	#categories: Category[] = [];
	#error = "";

	#template = html`
    <div class="category-selector">
      <label for="category">Category</label>
      <select id="category" name="category" @change="${this.#handleChange}">
        <option value="">Select a category</option>
        ${this.#categories
					.map(
						(category) => html`
          <option value="${category.id}">
            ${category.name} (Risk: ${category.risk_level}, Liquidity: ${category.liquidity})
          </option>
        `,
					)
					.join("")}
      </select>
      ${this.#error ? html`<div class="error">${this.#error}</div>` : ""}
    </div>
  `;

	constructor() {
		super();
		this.innerHTML = this.#template;
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

	#handleChange = (event: Event) => {
		const select = event.target as HTMLSelectElement;
		this.dispatchEvent(
			new CustomEvent("change", {
				bubbles: true,
				composed: true,
				detail: select.value,
			}),
		);
	};

	#render() {
		this.innerHTML = this.#template;
	}
}
