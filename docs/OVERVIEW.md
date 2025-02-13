# Project overview

## Tech stack

- **Minimalistic**: No libraries nor frameworks at all.
- **Bun**: for server and client
- **TypeScript**: for client and server
- **PicoCSS**: for client
- **Biome**: for linting and formatting

## Project folder structure

```
root # Project root folder
├── .ai/ # AI agent configuration
├── .cursor/ # cursor specific rules
├── .vscode/ # VSCode settings, extensions and instructions
├── .windsurfrules # Windsurf rules file
├── dist/ # Build output
├── docs/ # Project documentation
├── src/ # Source code goes here (SEE BELOW)
├── tests/ # E2E tests go here
├── .env # Environment variables
├── .gitignore # Git ignore rules
├── package.json # Project configuration
└── README.md # Project overview
```

## Folder structure for source code

```
src # Source code goes here
├── client # Client-side code
│   ├── app # Client-side application routes
│   │   ├── route_1 # Pages and services for route 1
│   │   └── route_n # Pages and services for route n  
│   ├── domain # Client-side domain models (types, interfaces, enums, etc.)
│   └── shared # Components and utilities (http client, selectors, etc.)
└── server # Server-side code
    ├── api # Server-side API routes
    │   ├── resource_1 # Controllers and repositories for resource 1
    │   └── resource_n # Controllers and repositories for resource n
    ├── domain # Server-side domain models (types, interfaces, enums, etc.)
    └── shared # Middleware utilities (hash, logger, etc.)
```




