import type { Tool } from "../../../server/domain/tool.type";

const html = String.raw;
/**
 * A Table component that displays a list of tools.
 */
class ToolsTableComponent extends HTMLElement {
	#template = html`
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        
      </tbody>
    </table>
  `;

	#tools: Tool[] = [];

	get tools(): Tool[] {
		return this.#tools;
	}

	set tools(value: Tool[]) {
		this.#tools = value;
		this.renderTools();
	}

	constructor() {
		super();
		this.innerHTML = this.#template;
	}

	private renderTools(): void {
		const tbody = this.querySelector("tbody");
		if (tbody) {
			tbody.innerHTML = "";
			for (const tool of this.#tools) {
				tbody.insertAdjacentHTML(
					"beforeend",
					`<tr><td>${tool.name}</td><td>${tool.description}</td></tr>`,
				);
			}
		}
	}
}

customElements.define("app-tools-table", ToolsTableComponent);
