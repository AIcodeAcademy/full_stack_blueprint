import type { Tool } from "@/client/domain/tool.type";

const html = String.raw;
/**
 * A Table component that displays a list of tools.
 */
export class ToolsTableComponent extends HTMLElement {
	#template = html`
    <table>
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Description</th>
        </tr>
      </thead>
      <tbody> 
      </tbody>
    </table>
  `;

	#tools: Tool[] = [];

	/**
	 * Set the tools and render them
	 */
	set tools(value: Tool[]) {
		this.#tools = value;
		this.#renderTools();
	}

	constructor() {
		super();
		this.innerHTML = this.#template;
	}

	#renderTools(): void {
		const tbody = this.querySelector("tbody");
		if (!tbody) return;
		tbody.innerHTML = "";
		for (const tool of this.#tools) {
			const toolLink = html`<a href="${tool.url}" target="_blank">${tool.name}</a>`;
			const toolRow = html`<tr><td>${toolLink}</td><td>${tool.description}</td></tr>`;
			tbody.insertAdjacentHTML("beforeend", toolRow);
		}
	}
}
