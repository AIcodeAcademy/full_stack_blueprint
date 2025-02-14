const html = String.raw;
export function select(selector: string): HTMLElement | null {
	return document.querySelector(selector);
}
export function getValue(selector: string): string {
	return (select(selector) as HTMLInputElement)?.value;
}

export function setValue(selector: string, value: string) {
	(select(selector) as HTMLInputElement).value = value;
}
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

export function removeListener(
	selector: string,
	event: string,
	callback: (e: unknown) => void,
) {
	select(selector)?.removeEventListener(event, callback);
}

export function renderAnchor(url: string, text: string): string {
	return html`<a href="${url}" target="_blank">${text}</a>`;
}
