import { BasePresenterComponent } from "../../shared/base-presenter.component";

const html = String.raw;

/**
 * Feature list component to display application features
 */
export class FeatureListComponent extends BasePresenterComponent {
	_features: string[] = [];

	/**
	 * Set features to display
	 */
	set features(value: string[]) {
		this._features = value;
		this.render();
	}

	/**
	 * Get features
	 */
	get features(): string[] {
		return this._features;
	}

	protected override template(): string {
		if (!this._features?.length) {
			return html`<p>No features available</p>`;
		}

		return html`
      <div class="feature-list">
        <h3>Features</h3>
        <ul>
          ${this._features
						.map(
							(feature) => html`
            <li>${feature}</li>
          `,
						)
						.join("")}
        </ul>
      </div>
    `;
	}

	// Override render to directly set innerHTML without calling super
	protected override render(): void {
		this.innerHTML = this.template();
	}
}
