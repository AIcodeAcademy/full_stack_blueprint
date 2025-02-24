const html = String.raw;

export class DatePickerComponent extends HTMLElement {
	static get observedAttributes() {
		return ["value", "error"];
	}

	#value = new Date().toISOString().split("T")[0];
	#error = "";

	#template = html`
    <div class="date-picker">
      <label for="date">Acquisition Date</label>
      <input
        type="date"
        id="date"
        name="date"
        value="${this.#value}"
        max="${new Date().toISOString().split("T")[0]}"
        @input="${this.#handleInput}"
      />
      ${this.#error ? html`<div class="error">${this.#error}</div>` : ""}
    </div>
  `;

	constructor() {
		super();
		this.innerHTML = this.#template;
	}

	attributeChangedCallback(name: string, _: string, newValue: string) {
		if (name === "value") {
			this.#value = new Date(newValue).toISOString().split("T")[0];
			this.#render();
		} else if (name === "error") {
			this.#error = newValue;
			this.#render();
		}
	}

	#handleInput = (event: Event) => {
		const input = event.target as HTMLInputElement;
		const date = new Date(input.value);
		if (!Number.isNaN(date.getTime())) {
			this.dispatchEvent(
				new CustomEvent("change", {
					bubbles: true,
					composed: true,
					detail: date.toISOString(),
				}),
			);
		}
	};

	#render() {
		this.innerHTML = this.#template;
	}
}
