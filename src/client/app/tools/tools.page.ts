import type { Tool } from "../../domain/tool.type";
import { ToolsTableComponent } from "./tools-table.component";
import { getTools } from "./tools.repository";

const html = String.raw;
customElements.define("app-tools-table", ToolsTableComponent);

/**
 * Tools page component
 */
export class ToolsPage extends HTMLElement {
	#template = html`
    <h1>Tools</h1>
    <app-tools-table></app-tools-table>
  `;
	#tools: Tool[] = [];
	#toolsTable: ToolsTableComponent | null = null;

	constructor() {
		super();
		this.innerHTML = this.#template;
	}

	async connectedCallback() {
		this.#tools = await getTools();
		this.#toolsTable = this.querySelector("app-tools-table");
		if (this.#toolsTable) {
			this.#toolsTable.tools = this.#tools;
		}
	}
}
