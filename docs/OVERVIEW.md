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
- **Web Components**: Native browser components without additional frameworks.
- **SQLite**: In-memory SQL database for data persistence.

## 2. Key Components

- **`src/client`**: Contains the frontend application code.
  - `src/client/app`: Holds page components and their related files (components, repositories).
  - `src/client/shared`: Contains shared utilities and components for the client-side.
  - `src/client/domain`: Defines client-side data types.
  - `src/client/index.html`: The main HTML entry point for the client application.
  - `src/client/app.component.ts`: The root component of the client application, acting as a router outlet.
- **`src/server`**: Contains the backend application code.
  - `src/server/api`: Defines API controllers and repositories for different resources.
  - `src/server/domain`: Defines server-side data types.
  - `src/server/shared`: Contains shared utilities for the server-side, including database and request/response handling.
  - `src/server/main.ts`: The main entry point for the server application.
- **`src/sql`**: Contains SQL definition files for the database tables and initial data.
- **`docs`**: Contains project documentation, including architecture blueprints, feature specifications, and the overview documentation itself.
- **`.ai`**: Contains instructions and prompts for AI agents used in the project.
- **`.cursor` & `.vscode`**: Configuration files for Cursor and VSCode editors, including rules and settings.

Core classes/functions:

- **`app.component.ts` (client)**: The main application component that handles routing and serves as the root of the client-side application.
- **`api.controller.ts` (server)**: The main API controller that routes incoming requests to the appropriate resource controllers.
- **`auth.controller.ts` (server) & `auth.repository.ts` (server)**: Implement authentication logic, handling user registration and login.
- **`tools`, `categories`, and `assets` controllers and repositories**: Handle CRUD operations for their respective resources.
- **SQL utilities**: Handle database operations for persisting and retrieving data.

## 3. Data Flow

The application follows a typical client-server architecture:

1. **Client Request**: The client-side application, built with web components, initiates requests triggered by user interactions.
2. **API Endpoint**: Client requests are sent to the server API endpoints defined in `src/server/api`.
3. **Controller Handling**: API requests are handled by the `api.controller.ts`, which routes them to specific resource controllers (e.g., `auth.controller.ts`, `tools.controller.ts`, `assets.controller.ts`).
4. **Repository Interaction**: Controllers interact with repositories to perform CRUD operations on the database.
5. **Database Queries**: SQL operations are executed against the SQLite database using SQL files defined in the `src/sql` directory.
6. **Response**: The server sends back responses in JSON format to the client, which are then processed and displayed by the client-side components.
7. **State Management**: Client-side state management relies on web component properties and local storage for persisting state between requests.

Authentication flow includes user registration, login, and verification using JWT tokens. Other resource flows include CRUD operations for tools, categories, and assets.

## 4. Dependencies

- **External Libraries/Services**:
  - **Pico CSS (CDN)**: For minimal CSS styling, included via CDN in `index.html`.
  - **Google Fonts (CDN)**: For custom fonts, also included via CDN in `index.html`.
  - **Bun Runtime**: Essential runtime environment.
  - **Biome**: For code formatting and linting.
  - **TypeScript**: For static typing and improved developer experience.

- **Infrastructure Requirements**:
  - Node.js/Bun environment to run the server and client development tools.
  - SQLite database (in-memory for the current setup).
  - Web browser for client-side application.

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
   - The project uses minimal environment variables defined in `.env` file.

## 6. Key Features

- Basic project setup for full-stack TypeScript application.
- Client-side application with web components and routing.
- Server-side API with controllers and repositories.
- SQLite in-memory database integration.
- Authentication endpoints for login and registration.
- Resource management APIs for tools, categories, and assets.
- Minimal styling with Pico CSS.
- Code formatting and linting with Biome.
- AI-driven development approach with instructions and prompts for code generation and documentation.

## 7. Directory Structure

### Root

```
full_stack_blueprint/
    ├── .ai/                # AI agent instructions and prompts
    ├── .cursor/            # Cursor editor rules
    ├── .vscode/            # VSCode editor configurations and instructions
    ├── docs/               # Project documentation
    │   ├── OVERVIEW.md     # Project overview documentation (this file)
    │   └── JOURNAL.md      # Project journal working notes (to be implemented)
    ├── src/                # Source code
    │   ├── client/         # Client-side code
    │   ├── server/         # Server-side code
    │   ├── sql/            # SQL definition files
    │   └── main.ts         # Main application entry point
    ├── .env                # Environment variables
    ├── .gitignore          # Git ignore file
    ├── bun.lock            # Bun lock file
    ├── CHANGELOG.md        # Changelog
    ├── LICENSE             # License file
    ├── package.json        # Project dependencies and scripts
    ├── README.md           # Project README file
    ├── tsconfig.json       # TypeScript configuration
    └── .windsurfrules      # Windsurf rules configuration
```

### Client Application

```  
src/client/
    ├── app/                # Client application components and pages
    │   ├── add-asset/      # Asset addition feature components
    │   ├── auth/           # Authentication feature components
    │   ├── home/           # Home page components
    │   └── tools/          # Tools management components
    ├── domain/             # Client-side data types
    ├── shared/             # Shared client-side utilities and components
    ├── app.component.ts    # Main client application component (router outlet)
    ├── index.html          # Client HTML entry point
    ├── logo.png            # Application logo
    ├── manifest.json       # Web app manifest
    └── styles.css          # Client-side styles
```  	

### Server Application

```
src/server/
    ├── api/                # API controllers and repositories
    │   ├── api.controller.ts  # Main API router
    │   ├── assets/         # Assets API resource
    │   ├── auth/           # Authentication API resource
    │   ├── categories/     # Categories API resource
    │   └── tools/          # Tools API resource
    ├── domain/             # Server-side data types
    ├── shared/             # Shared server-side utilities
    └── main.ts             # Server entry point
```

### SQL Structure

```
src/sql/
    ├── assets.sql.json     # Assets table definition and data
    ├── categories.sql.json # Categories table definition and data
    ├── roles.sql.json      # User roles definition and data
    ├── tools.sql.json      # Tools table definition and data
    └── users.sql.json      # Users table definition and data
```

[Full Stack Blueprint Repository](https://github.com/AIcodeAcademy/full_stack_blueprint)