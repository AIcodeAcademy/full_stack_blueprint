## Table of Contents
- [Table of Contents](#table-of-contents)
- [1. Overview](#1-overview)
- [2. Key Components](#2-key-components)
- [3. Data Flow](#3-data-flow)
- [4. Dependencies](#4-dependencies)
- [5. How to Run](#5-how-to-run)
- [6. Key Features](#6-key-features)
- [7. Directory Structure](#7-directory-structure)
  - [Root](#root)
  - [Client Application](#client-application)

## 1. Overview

This project is a blueprint for building full-stack web applications with a focus on simplicity and minimal dependencies. It leverages AI agents for code generation and documentation, aiming to streamline the development process. The blueprint provides a basic structure and tech stack to quickly start new projects, emphasizing convention over configuration and the use of modern web technologies.

Key technologies and frameworks used include:

- **Bun**: A fast, all-in-one JavaScript runtime.
- **TypeScript**:  A strongly typed superset of JavaScript.
- **Pico CSS**: A minimal CSS framework for styling.
- **Biome**: A code formatter and linter.
- **Playwright**: An end-to-end testing framework.

## 2. Key Components

- **`src/client`**: Contains the frontend application code.
  - `src/client/app`:  Holds page components and their related files (components, repositories).
  - `src/client/shared`: Contains shared utilities and components for the client-side.
  - `src/client/domain`: Defines client-side data types.
  - `src/client/index.html`:  The main HTML entry point for the client application.
  - `src/client/app.component.ts`: The root component of the client application, acting as a router outlet.
- **`src/server`**: Contains the backend application code.
  - `src/server/api`:  Defines API controllers and repositories for different resources.
  - `src/server/domain`: Defines server-side data types.
  - `src/server/shared`: Contains shared utilities for the server-side, including database and request/response handling.
  - `src/server/main.ts`: The main entry point for the server application.
- **`docs`**: Contains project documentation, including architecture blueprints, feature specifications, and the overview documentation itself.
- **`tests`**:  Holds end-to-end tests written with Playwright.
- **`.ai`**: Contains instructions and prompts for AI agents used in the project.
- **`.cursor` & `.vscode`**:  Configuration files for Cursor and VSCode editors, including rules and settings.
- **`sql`**: Contains SQL files, potentially for database initialization or queries.

Core classes/functions:

- **`app.component.ts` (client)**:  The main application component that handles routing and serves as the root of the client-side application.
- **`api.controller.ts` (server)**:  The main API controller that routes incoming requests to the appropriate resource controllers.
- **`sql.utils.ts` (server)**: Provides utility functions for interacting with the SQLite database.
- **`fetch.utils.ts` (client)**:  Provides utility functions for making HTTP requests to the server API.
- **`auth.controller.ts` (server)` & `auth.repository.ts` (server)**: Implement authentication logic, handling user registration and login.

## 3. Data Flow

The application follows a typical client-server architecture.

1. **Client Request**: The client-side application, built with web components, initiates requests, often triggered by user interactions on page components.
2. **API Endpoint**: Client requests are sent to the server API endpoints defined in `src/server/api`.
3. **Controller Handling**: API requests are first handled by the `api.controller.ts`, which routes them to specific resource controllers (e.g., `auth.controller.ts`, `tools.controller.ts`).
4. **Repository Interaction**: Controllers interact with repositories (e.g., `auth.repository.ts`, `tools.repository.ts`) to fetch or manipulate data. Repositories use `sql.utils.ts` to interact with the SQLite database.
5. **Database Queries**: `sql.utils.ts` executes SQL queries against the SQLite database (in-memory in the current setup).
6. **Response**: The server sends back responses in JSON format to the client, which are then processed and displayed by the client-side components.
7. **State Management**: Client-side state management is currently minimal, potentially relying on web component properties and local storage for user tokens.

Authentication data flow involves:

- User login/registration requests sent to `/api/auth/login` or `/api/auth/register`.
- Server-side authentication logic in `auth.controller.ts` and `auth.repository.ts` verifies credentials, hashes passwords, and generates JWT tokens using `jwt.utils.ts`.
- JWT tokens are stored in the client's local storage and used for subsequent authenticated requests (though current code doesn't fully demonstrate this yet).

## 4. Dependencies

- **External Libraries/Services**:
  - **Pico CSS (CDN)**: For minimal CSS styling, included via CDN in `index.html`.
  - **Google Fonts (CDN)**: For custom fonts, also included via CDN in `index.html`.
  - **Bun Runtime**:  Essential runtime environment.
  - **Playwright**: For end-to-end testing.
  - **Biome**: For code formatting and linting.

- **Infrastructure Requirements**:
  - Node.js/Bun environment to run the server and client development tools.
  - SQLite database (in-memory for the current setup).

## 5. How to Run

1. **Installation**:
   - Ensure you have Bun installed. Follow the instructions in [README.md](README.md) for Bun installation on your operating system.
   - Clone the repository: `git clone https://github.com/AIcodeAcademy/full_stack_blueprint.git my-project`
   - Navigate to the project directory: `cd my-project`
   - Install dependencies: `bun i`

2. **Running the application**:
   - To start both the client and server in parallel in development mode: `bun start`
   - To run only the client development server: `bun client`
   - To run only the server: `bun server`

3. **Environment Configuration**:
   - The project uses environment variables (e.g., `SQL_FOLDER`), but currently, they are mostly defaults.
   - No specific environment variables are explicitly required to run the basic application.

## 6. Key Features

- Basic project setup for full-stack TypeScript application.
- Client-side application with web components and routing.
- Server-side API with controllers and repositories.
- SQLite in-memory database integration.
- Authentication endpoints for login and registration.
- Example `tools` API resource (though not fully implemented).
- Minimal styling with Pico CSS.
- End-to-end testing setup with Playwright.
- Code formatting and linting with Biome.
- AI-driven development approach with instructions and prompts for code generation and documentation.

## 7. Directory Structure

### Root

```
full_stack_blueprint/
    ├── .ai/ # AI agent instructions and prompts
    ├── .cursor/ # Cursor editor rules
    ├── .vscode/ # VSCode editor configurations and instructions
    ├── docs/ # Project documentation
    │   ├── OVERVIEW.md # Project overview documentation (this file)
    │   └── JOURNAL.md # Project journal working notes (to be implemented)
    ├── tests/ # End-to-end tests
    ├── .gitignore # Git ignore file
    ├── LICENSE # License file
    ├── package.json # Project dependencies and scripts
    ├── README.md # Project README file
    └── tsconfig.json # TypeScript configuration
```

### Client Application

```  
src/client/
    ├── app/ # Client application components and pages
    │   ├── auth/ # Authentication feature components and pages
    │   └── home/ # Home page components
    ├── domain/ # Client-side data types
    ├── shared/ # Shared client-side utilities and components
    ├── index.html # Client HTML entry point
    ├── app.component.ts # Main client application component (router outlet)
    └── styles.css # Client-side styles
```  	

### Server Application

```
src/server/
    ├── api/ # API controllers and repositories
    │   ├── auth/ # Authentication API resource
    │   └── tools/ # Tools API resource (example)
    ├── domain/ # Server-side data types
    ├── shared/ # Shared server-side utilities
    ├── main.ts # Server entry point
    └── index.ts # Placeholder index file
```  	
	
[Full Stack Blueprint Repository](https://github.com/AIcodeAcademy/full_stack_blueprint)