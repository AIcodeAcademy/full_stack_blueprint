import type { Tool } from "../../../server/domain/tool.type";
import "../tools-table.component";
import { getTools } from "./tools.repository";

const html = String.raw;

class AboutPage extends HTMLElement {
	#template = html`
    <h1>About</h1>
    <app-tools-table></app-tools-table>
  `;
	tools: Tool[] = [];
	constructor() {
		super();
		this.innerHTML = this.#template;
	}

	async connectedCallback() {
		this.tools = await getTools();
		const tableElement = this.querySelector(
			"app-tools-table",
		) as HTMLElement & { tools: Tool[] };
		if (tableElement) {
			tableElement.tools = this.tools;
		}
	}
}

customElements.define("app-about-page", AboutPage);
