import type { Tool } from "@/client/domain/tool.type";
import { ToolsTableComponent } from "./tools-table.component";
import { getTools } from "./tools.repository";

const html = String.raw;
customElements.define("app-tools-table", ToolsTableComponent);

/**
 * About page component
 */
export class AboutPage extends HTMLElement {
	#template = html`
    <h1>About</h1>
    <app-tools-table></app-tools-table>
  `;
	#tools: Tool[] = [];
	#toolsTable: ToolsTableComponent | null = null;

	constructor() {
		super();
		this.innerHTML = this.#template;
	}

	async connectedCallback() {
		try {
			this.#tools = await getTools();
			this.#toolsTable = this.querySelector("app-tools-table");
			if (this.#toolsTable) {
				this.#toolsTable.tools = this.#tools;
			}
		} catch (error) {
			console.error(error);
		}
	}
}
