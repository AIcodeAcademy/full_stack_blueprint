const html = String.raw;

export class ValueInputComponent extends HTMLElement {
	static get observedAttributes() {
		return ["value", "error"];
	}

	#value = 0;
	#error = "";

	#template = html`
    <div class="value-input">
      <label for="value">Value</label>
      <input
        type="number"
        id="value"
        name="value"
        min="0"
        step="0.01"
        value="${this.#value}"
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
			this.#value = Number(newValue);
			this.#render();
		} else if (name === "error") {
			this.#error = newValue;
			this.#render();
		}
	}

	#handleInput = (event: Event) => {
		const input = event.target as HTMLInputElement;
		const value = Number(input.value);
		if (!Number.isNaN(value)) {
			this.dispatchEvent(
				new CustomEvent("change", {
					bubbles: true,
					composed: true,
					detail: value,
				}),
			);
		}
	};

	#render() {
		this.innerHTML = this.#template;
	}
}
