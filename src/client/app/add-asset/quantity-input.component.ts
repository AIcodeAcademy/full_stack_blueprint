const html = String.raw;

export class QuantityInputComponent extends HTMLElement {
	static get observedAttributes() {
		return ["value", "error"];
	}

	#value = 1;
	#error = "";

	#template = html`
    <div class="quantity-input">
      <label for="quantity">Quantity</label>
      <div class="quantity-controls">
        <button type="button" @click="${this.#handleDecrement}">-</button>
        <input
          type="number"
          id="quantity"
          name="quantity"
          min="1"
          step="1"
          value="${this.#value}"
          @input="${this.#handleInput}"
        />
        <button type="button" @click="${this.#handleIncrement}">+</button>
      </div>
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
		if (!Number.isNaN(value) && Number.isInteger(value) && value >= 1) {
			this.#emitChange(value);
		}
	};

	#handleIncrement = () => {
		this.#emitChange(this.#value + 1);
	};

	#handleDecrement = () => {
		if (this.#value > 1) {
			this.#emitChange(this.#value - 1);
		}
	};

	#emitChange(value: number) {
		this.dispatchEvent(
			new CustomEvent("change", {
				bubbles: true,
				composed: true,
				detail: value,
			}),
		);
	}

	#render() {
		this.innerHTML = this.#template;
	}
}
