/**
 * Base Presenter component that standardizes UI rendering and event handling
 *
 * This base class provides:
 * 1. Reactive property handling with attribute reflection
 * 2. Template rendering
 * 3. Event management
 * 4. Form handling
 */
export abstract class BasePresenterComponent extends HTMLElement {
	/**
	 * Abstract template method that must be implemented by subclasses
	 * Should return an HTML string template
	 */
	protected abstract template(): string;

	/**
	 * Constructor
	 */
	constructor() {
		super();
		this.render();
	}

	/**
	 * List of attributes to observe for changes
	 */
	static get observedAttributes(): string[] {
		return [];
	}

	/**
	 * Called when an observed attribute changes
	 */
	attributeChangedCallback(
		name: string,
		oldValue: string,
		newValue: string,
	): void {
		if (oldValue !== newValue) {
			this.render();
		}
	}

	/**
	 * Setup event listeners when component is connected to DOM
	 */
	connectedCallback(): void {
		this.setupEventListeners();
	}

	/**
	 * Remove event listeners when component is disconnected from DOM
	 */
	disconnectedCallback(): void {
		this.removeEventListeners();
	}

	/**
	 * Render the component based on current state
	 */
	protected render(): void {
		this.innerHTML = this.template();
	}

	/**
	 * Setup event listeners - override in subclass
	 */
	protected setupEventListeners(): void {}

	/**
	 * Remove event listeners - override in subclass
	 */
	protected removeEventListeners(): void {}

	/**
	 * Dispatch a custom event
	 */
	protected dispatchCustomEvent<T>(eventName: string, detail?: T): void {
		const event = new CustomEvent(eventName, {
			detail,
			bubbles: true,
			composed: true,
		});
		this.dispatchEvent(event);
	}

	/**
	 * Handle form submission with preventDefault
	 */
	protected handleFormSubmit(
		form: HTMLFormElement,
		handler: (formData: FormData) => void,
	): (e: SubmitEvent) => void {
		const boundHandler = (e: SubmitEvent) => {
			e.preventDefault();
			const formData = new FormData(form);
			handler(formData);
		};
		return boundHandler;
	}

	/**
	 * Select an element with proper typing
	 */
	protected selectElement<T extends HTMLElement>(selector: string): T | null {
		return this.querySelector<T>(selector);
	}

	/**
	 * Get an attribute with a default value if not set
	 */
	protected getAttributeOrDefault(name: string, defaultValue: string): string {
		const value = this.getAttribute(name);
		return value !== null ? value : defaultValue;
	}
}
