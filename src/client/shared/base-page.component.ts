/**
 * Base page component that implements the improved Page-Presenter-Repository pattern
 *
 * This base class provides:
 * 1. Consistent state management
 * 2. Standardized rendering approach
 * 3. Lifecycle management
 * 4. Error handling
 */
export abstract class BasePageComponent extends HTMLElement {
	/**
	 * Component state with standard properties
	 * Override in subclass to add additional state properties
	 */
	protected state = {
		loading: false,
		error: null as string | null,
		data: null as unknown,
	};

	/**
	 * References to presenter components
	 * Override in subclass to add specific presenter references
	 */
	protected presenterComponents: Record<string, HTMLElement | null> = {};

	/**
	 * Abstract template method that must be implemented by subclasses
	 * Should return an HTML string template based on current state
	 */
	protected abstract template(): string;

	/**
	 * Constructor - initializes the component and performs first render
	 */
	constructor() {
		super();
		this.render();
	}

	/**
	 * Setup event listeners when component is connected to DOM
	 */
	connectedCallback() {
		this.setupEventListeners();
		this.loadData();
	}

	/**
	 * Remove event listeners when component is disconnected from DOM
	 */
	disconnectedCallback() {
		this.removeEventListeners();
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
	 * Load data from repository - override in subclass
	 */
	protected async loadData(): Promise<void> {}

	/**
	 * Render the component based on current state
	 */
	protected render(): void {
		this.innerHTML = this.template();
		this.initializePresenters();
		this.updatePresenters();
	}

	/**
	 * Initialize presenter components after render
	 * Override in subclass to select specific presenters
	 */
	protected initializePresenters(): void {}

	/**
	 * Update presenter components with current state
	 * Override in subclass to update specific presenters
	 */
	protected updatePresenters(): void {}

	/**
	 * Set loading state and re-render
	 */
	protected setLoading(loading: boolean): void {
		this.state.loading = loading;
		this.render();
	}

	/**
	 * Set error state and re-render
	 */
	protected setError(error: string | null): void {
		this.state.error = error;
		this.render();
	}

	/**
	 * Set data state and re-render
	 */
	protected setData(data: unknown): void {
		this.state.data = data;
		this.render();
	}

	/**
	 * Handle API request with proper error handling and loading states
	 */
	protected async handleApiRequest<T>(
		apiCall: () => Promise<T>,
		onSuccess?: (data: T) => void,
	): Promise<T | null> {
		try {
			this.setLoading(true);
			const result = await apiCall();
			this.setLoading(false);

			if (onSuccess && result) {
				onSuccess(result);
			}

			return result;
		} catch (error) {
			this.setLoading(false);
			this.setError(
				error instanceof Error ? error.message : "An error occurred",
			);
			return null;
		}
	}
}
