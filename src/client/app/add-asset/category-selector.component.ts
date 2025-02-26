import type { Category } from "../../domain/category.type";

const html = String.raw;

export class CategorySelectorComponent extends HTMLElement {
	#categories: Category[] = [];
	#selected = "";
	#select: HTMLSelectElement | null = null;

	set categories(value: Category[]) {
		this.#categories = value;
		this.#render();
	}

	set selected(value: string) {
		this.#selected = value;
		this.#render();
	}

	#template = () => html`
    <select name="category" required>
      <option value="">Select a category</option>
      ${this.#categories
				.map(
					(category) => html`
        <option value="${category.id}" ${category.id === this.#selected ? "selected" : ""}>
          ${category.name} (Risk: ${category.risk_level}, Liquidity: ${category.liquidity_level})
        </option>
      `,
				)
				.join("")}
    </select>
  `;

	constructor() {
		super();
		this.innerHTML = this.#template();
	}

	connectedCallback() {
		this.#select = this.querySelector("select");
		this.#select?.addEventListener("change", this.#handleChange);
	}

	disconnectedCallback() {
		this.#select?.removeEventListener("change", this.#handleChange);
	}

	#handleChange = (event: Event) => {
		const select = event.target as HTMLSelectElement;
		this.dispatchEvent(
			new CustomEvent("category-change", {
				detail: select.value,
				bubbles: true,
			}),
		);
	};

	#render() {
		this.innerHTML = this.#template();
		// Reattach event listener after render
		this.#select = this.querySelector("select");
		this.#select?.addEventListener("change", this.#handleChange);
	}
}
