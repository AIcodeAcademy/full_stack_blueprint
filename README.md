# Full Stack Blueprint

Blueprint for simple full stack apps with minimal dependencies to be generated with **AI agents**.

## AI Driven Development

The project is meant to use AI to generate code and documentation.

```bash
git clone https://github.com/AIcodeAcademy/full_stack_blueprint.git my-project
cd my-project
## Start prompting with AI
```

### AI Agents

At the `./ai` folder you can find the instructions for the AI agents.

There are three main agents you should use:

- `architect.instructions.md`: To analyze requirements and define the tech stack.
- `builder.instructions.md`: To generate the project implementation plan.
- `craftsman.instructions.md`: To generate the project improvement plan.

Those agents generate markdown documents at the `./docs` folder with instructions to be used by the AI Code Editor.

Look for inspiration in the [.ai folder](./ai/) and adapt them to your project and agents.

Other agents works as aides to the main agents.

### AI Code Editor

You can use **Cursor Composer**, **GitHub Copilot** or **Windsurf** to generate code and documentation.

Both have rules or instructions to be used as context for the AI.

- `.cursor/rules/`: Rules for Cursor Composer.
- `.vscode/instructions/`: Instructions for GitHub Copilot.
- `.windsurfrules`: Rules for Windsurf.

#### AI Models

Works with any LLM model. Recommended models: Claude 3.7 Sonnet, GPT-o3, or Gemini 2 Pro.

---

## Tech Stack

- [Bun](https://bun.sh/)
- [TypeScript](https://www.typescriptlang.org/)
- [Pico CSS](https://picocss.com/)
- [Biome](https://biomejs.dev/)
- [Playwright](https://playwright.dev/)

### Bun installation

This project was created using `bun init` in bun v1.2.0.
[Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

To install **bun**:

```bash
# With npm (if you have node installed)
npm install -g bun

# Linux or MacOS
curl -fsSL https://bun.sh/install | bash

# Windows
powershell -c "irm https://bun.sh/install.ps1 | iex"
```

### Development Workflow:

To install dependencies:

```bash
bun i 
```

To run the client and server in parallel:

```bash
bun start
```

To run only the client:

```bash
bun client
```

To run only the server:

```bash
bun server
```

## License

MIT Made with ❤️ by [Alberto Basalo](https://albertobasalo.dev) for [AI Code Academy](https://aicode.academy)
