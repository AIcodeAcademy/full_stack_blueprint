import type { Tool } from "@/client/domain/tool.type";
import "./tools-table.component";
import type { ToolsTableComponent } from "./tools-table.component";
import { getTools } from "./tools.repository";

const html = String.raw;

class AboutPage extends HTMLElement {
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
		this.#tools = await getTools();
		this.#toolsTable = this.querySelector("app-tools-table");
		if (this.#toolsTable) {
			this.#toolsTable.tools = this.#tools;
		}
	}
}

customElements.define("app-about-page", AboutPage);
