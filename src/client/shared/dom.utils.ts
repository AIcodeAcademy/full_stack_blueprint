/** Template literal tag for HTML strings */
export const html = String.raw;

/**
 * Selects a DOM element using a CSS selector
 * @param selector - CSS selector string
 * @returns The first matching HTMLElement or null if not found
 */
export function select(selector: string): HTMLElement | null {
	return document.querySelector(selector);
}

/**
 * Gets the value of an input element
 * @param selector - CSS selector string for the input element
 * @returns The value of the input element
 */
export function getValue(selector: string): string {
	return (select(selector) as HTMLInputElement)?.value;
}

export function setValue(selector: string, value: string) {
	(select(selector) as HTMLInputElement).value = value;
}

/**
 * Adds an event listener to a DOM element
 * @param selector - CSS selector string or HTMLElement
 * @param event - Name of the event to listen for
 * @param callback - Event handler function
 */
export function addListener(
	selector: string | HTMLElement,
	event: string,
	callback: (e: unknown) => void,
) {
	if (typeof selector === "string") {
		select(selector)?.addEventListener(event, callback);
	} else {
		selector.addEventListener(event, callback);
	}
}

/**
 * Removes an event listener from a DOM element
 * @param selector - CSS selector string
 * @param event - Name of the event to remove
 * @param callback - Event handler function to remove
 */
export function removeListener(
	selector: string,
	event: string,
	callback: (e: unknown) => void,
) {
	select(selector)?.removeEventListener(event, callback);
}

/**
 * Creates an HTML anchor element string
 * @param url - The href URL
 * @param text - The anchor text content
 * @returns HTML string for the anchor element
 */
export function renderAnchor(url: string, text: string): string {
	return html`<a href="${url}" target="_blank">${text}</a>`;
}
