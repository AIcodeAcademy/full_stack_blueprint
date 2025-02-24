const html = String.raw;

export class DatePickerComponent extends HTMLElement {
	#value = "";
	#input: HTMLInputElement | null = null;

	static get observedAttributes() {
		return ["value"];
	}

	#template = () => html`
    <input 
      type="date" 
      name="acquisition_date" 
      required
      value="${this.#value}"
      max="${new Date().toISOString().split("T")[0]}"
    />
  `;

	constructor() {
		super();
		this.innerHTML = this.#template();
	}

	connectedCallback() {
		this.#input = this.querySelector("input");
		this.#input?.addEventListener("change", this.#handleChange);
	}

	disconnectedCallback() {
		this.#input?.removeEventListener("change", this.#handleChange);
	}

	attributeChangedCallback(name: string, _: string, newValue: string) {
		if (name === "value") {
			this.#value = newValue;
			this.#render();
		}
	}

	#handleChange = (event: Event) => {
		const input = event.target as HTMLInputElement;
		this.dispatchEvent(
			new CustomEvent("date-change", {
				detail: input.value,
				bubbles: true,
			}),
		);
	};

	#render() {
		this.innerHTML = this.#template();
		// Reattach event listener after render
		this.#input = this.querySelector("input");
		this.#input?.addEventListener("change", this.#handleChange);
	}
}
