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
│   │   ├── about # About page feature (components and repository)
│   │   ├── auth # Auth page feature (components and repository)
│   │   └── home # Home page feature (components and repository)
│   ├── domain # Client-side domain models (types, interfaces, enums, etc.)
│   └── shared # Components and utilities (http client, selectors, etc.)
└── server # Server-side code
    ├── api # Server-side API routes
    │   ├── auth # Auth API routes (controllers and repository)
    │   └── tools # Tools API routes (controllers and repository)
    ├── domain # Server-side domain models (types, interfaces, enums, etc.)
    └── shared # Middleware utilities (hash, logger, etc.)
```

## Key Components and Functionality

### Client-side (`src/client`)

- **`app.component.ts`**:  The root component for the client-side application. It sets up the basic layout with `<app-header>`, `<main id="router-outlet">` for page content, and `<app-footer>`.
- **`app/`**: Contains feature-specific modules (e.g., `about`, `home`, `auth`). Each feature folder typically includes:
    - `{{feature}}.page.ts`:  The main page component for the feature.
    - `{{feature}}-components`: Reusable components specific to the feature (e.g., `tools-table.component.ts`, `auth-form.component.ts`).
    - `{{feature}}.repository.ts`:  Handles data fetching and interaction with the server API for the feature (e.g., `tools.repository.ts`, `auth.repository.ts`).
- **`app/auth/`**: Implements the authentication feature:
    - **`auth.page.ts`**: Manages the authentication page, providing tabs for login and registration and handling the overall authentication flow.
    - **`auth-form.component.ts`**: A reusable form component for both login and registration. It handles user input, form submission, and dispatches an `authenticate` event with user credentials.
    - **`auth.repository.ts`**: Handles communication with the server API for user login and registration, using `fetch.utils.ts` to make HTTP requests to `/api/auth/login` and `/api/auth/register`.
- **`app/about/`**: Contains components and services for the "About" page:
    - **`about.page.ts`**:  The main page component for the "About" feature, displaying a title and the `ToolsTableComponent`.
    - **`tools-table.component.ts`**:  A component to display a table of tools, receiving tool data as input and rendering rows with tool names and descriptions.
    - **`tools.repository.ts`**:  Handles fetching tool data from the server API endpoint `/api/tools` using `fetch.utils.ts`.
- **`app/home/`**: Contains components for the "Home" page:
    - **`home.page.ts`**:  The main page component for the "Home" feature, displaying a welcome message.
- **`shared/`**:  Contains reusable components and utilities:
    - **`header.component.ts` and `footer.component.ts`**:  Standard header and footer components with navigation and copyright information.
    - **`navigation.utils.ts`**:  Handles client-side routing by dynamically loading page components into the `<main id="router-outlet">` based on URL hashes.
    - **`fetch.utils.ts`**:  Provides utility functions (`get`, `post`) for making HTTP requests to the server API, simplifying API calls.
    - **`dom.utils.ts`**:  Offers helper functions for DOM manipulation like `select`, `getValue`, `setValue`, and event listener management.
    - **`toggle-theme.component.ts`**:  A component to toggle between light and dark themes, storing the theme preference in the `data-theme` attribute of the `<html>` element.
- **`domain/`**: Defines TypeScript types and interfaces used in the client-side, promoting type safety (e.g., `tool.type.ts`, `credentials.type.ts`, `user-token.type.ts`).
- **`index.html`**: The entry point for the client-side application. It includes:
    - Meta tags for SEO and PWA.
    - Links to PicoCSS and custom styles (`styles.css`).
    - Loading the root component `app.component.ts` as a module.
- **`styles.css`**:  Contains global styles and customizations, including font settings and minimal CSS reset.
- **`manifest.json`**:  PWA manifest file defining metadata for Progressive Web App installation.

### Server-side (`src/server`)

- **`server.bootstrap.ts`**:  Handles server initialization and request processing:
    - `initialize()`:  Called on server startup to initialize resources, currently initializes the `tools` and `users` tables using `initializeToolsTable()` and `initializeUsersTable()`.
    - `processRequest(request, server)`:  The main request handler function. It acts as a router, directing requests to the appropriate controller based on the URL path. For `/api` paths, it delegates to `api(request)`. For other paths, it returns a 404 Not Found response.
- **`api/`**:  Contains API route handlers (controllers) organized by resource:
    - **`api.controller.ts`**:  The main API router. It examines the URL path and dispatches requests to specific resource controllers (e.g., `/api/tools` to `tools(request)`, `/api/auth` to `auth(request)`). It also handles errors and 404s for API routes.
    - **`tools/`**:  Handles API endpoints related to "tools":
        - **`tools.controller.ts`**:  Controller for `/api/tools` endpoint. Currently, it only handles `GET` requests to retrieve all tools using `getTools()`. It uses `tools.repository.ts` to fetch data and `response.utils.ts` to create HTTP responses.
        - **`tools.repository.ts`**:  Data access layer for "tools". It interacts with the SQLite database using `sql.utils.ts` to perform operations like:
            - `initializeToolsTable()`:  Drops and recreates the `tools` table and seeds it with initial data.
            - `selectAllTools()`:  Retrieves all tools from the database.
            - `selectToolById(id)`: Retrieves a tool by its ID.
            - `seedTools()`: Inserts initial tool data into the database.
    - **`auth/`**: Handles API endpoints related to authentication:
        - **`auth.controller.ts`**: Controller for `/api/auth` endpoints (`/api/auth/login`, `/api/auth/register`). It handles user login and registration using `auth.repository.ts` and manages password hashing and JWT token generation.
        - **`auth.repository.ts`**: Data access layer for user authentication. It interacts with the SQLite database to perform operations like:
            - `initializeUsersTable()`: Drops and recreates the `users` table.
            - `findUserByEmail(email)`: Retrieves a user by their email address.
            - `createUser(email, password)`: Creates a new user in the database.
- **`shared/`**:  Contains reusable server-side utilities:
    - **`response.utils.ts`**:  Provides utility functions for creating standardized HTTP responses (e.g., `ok`, `badRequest`, `notFound`, `internalServerError`). It also includes `handleInternalError` for logging and handling errors.
    - **`request.utils.ts`**:  Offers utility functions for working with `Request` objects, such as extracting URL, path, parameters, and request body.
    - **`sql.utils.ts`**:  Provides an abstraction layer for interacting with the in-memory SQLite database using `bun:sqlite`. It includes functions for `selectAll`, `selectById`, `insert`, `update`, `create`, and `drop` operations.
    - **`hash.utils.ts`**: Provides utility functions for password hashing and verification using `bcrypt`.
    - **`jwt.utils.ts`**: Provides utility functions for generating and verifying JWT (JSON Web Tokens) for authentication.
- **`domain/`**:  Defines server-side domain models (types), mirroring the client-side domain models for data consistency (e.g., `tool.type.ts`, `credentials.type.ts`, `user.type.ts`, `user-token.type.ts`, `jwt-data.type.ts`).
- **`main.ts`**:  The server entry point. It:
    - Imports the client-side `index.html` to serve as the static homepage.
    - Imports `initialize` and `processRequest` from `server.bootstrap.ts`.
    - Defines `serverOptions` for `Bun.serve`, including:
        - `development: true` for development mode.
        - `static: { "/": homepage }` to serve `index.html` for the root path.
        - `fetch: processRequest` to use the `processRequest` function to handle incoming requests.
    - Calls `initialize()` to set up the server.
    - Starts the Bun server using `Bun.serve(serverOptions)`.
    - Logs the server URL to the console.

### Authentication Flow

1. **Login/Registration Request**: The user interacts with the `AuthPage` in the client, choosing to either log in or register. The `AuthFormComponent` captures user credentials (email and password).
2. **Form Submission and Event Dispatch**: Upon form submission in `AuthFormComponent`, an `authenticate` custom event is dispatched, containing the authentication mode (login or register) and user credentials.
3. **Event Handling in AuthPage**: The `AuthPage` component listens for the `authenticate` event. Upon receiving it, it extracts the mode and credentials.
4. **API Call**: Based on the authentication mode, `AuthPage` calls either the `login` or `register` function from `auth.repository.ts`. These functions use `fetch.utils.ts` to send a POST request to the server:
    - **Login**: POST request to `/api/auth/login`
    - **Register**: POST request to `/api/auth/register`
5. **Server-side Routing**: The server receives the API request. `server.bootstrap.ts` routes it to `api/api.controller.ts`, which in turn directs authentication requests to `api/auth/auth.controller.ts`.
6. **Authentication Controller Logic**: `auth.controller.ts` handles the login and register requests:
    - **Login**:
        - Retrieves user credentials from the request body.
        - Uses `auth.repository.ts` to find the user by email in the database.
        - Verifies the provided password against the stored hashed password using `hash.utils.ts` (bcrypt).
        - If authentication is successful, generates a JWT using `jwt.utils.ts`, embedding the user ID.
        - Returns a success response with the `UserToken` (containing userId and JWT).
    - **Register**:
        - Retrieves user credentials from the request body.
        - Checks if a user with the provided email already exists using `auth.repository.ts`.
        - Hashes the provided password using `hash.utils.ts` (bcrypt).
        - Creates a new user in the database using `auth.repository.ts`, storing the hashed password.
        - Generates a JWT using `jwt.utils.ts` for the newly registered user.
        - Returns a success response with the `UserToken`.
7. **Database Interaction**: `auth.repository.ts` uses `sql.utils.ts` to interact with the in-memory SQLite database for user data operations (finding user by email, creating user).
8. **Token Storage and Client Navigation**: Upon successful authentication, the server responds with a `UserToken`. The client-side `auth.repository.ts` receives this token and stores it in `localStorage`. Finally, `AuthPage` uses `navigation.utils.ts` to navigate the user to the home page.

### Data Flow

1. **Client Request**: A user interacts with the client-side application in the browser.
2. **Navigation**: Client-side navigation (handled by `navigation.utils.ts`) updates the displayed page component.
3. **Data Fetching (Optional)**: If a page component needs data (e.g., `AboutPage` fetching tools), it uses `fetch.utils.ts` to make an API request to the server (e.g., `/api/tools`).
4. **Server Routing**: The server receives the API request. `server.bootstrap.ts`'s `processRequest` function routes the request to `api/api.controller.ts`.
5. **API Controller**: `api/api.controller.ts` further routes the request to the appropriate resource controller (e.g., `api/tools/tools.controller.ts` for `/api/tools`, `api/auth/auth.controller.ts` for `/api/auth`).
6. **Controller Logic**: The controller (e.g., `tools.controller.ts`, `auth.controller.ts`) processes the request, often interacting with a repository to fetch or manipulate data.
7. **Data Repository**: The repository (e.g., `tools.repository.ts`, `auth.repository.ts`) uses `sql.utils.ts` to interact with the in-memory SQLite database.
8. **Database Query**: `sql.utils.ts` executes SQL queries against the SQLite database.
9. **Response**: The repository returns data to the controller. The controller uses `response.utils.ts` to create a JSON response and send it back to the client.
10. **Client Update**: The client-side `fetch.utils.ts` receives the response, parses the JSON data, and updates the client-side component (e.g., `ToolsTableComponent` in `AboutPage`, stores `UserToken` in `localStorage` after authentication).

This project provides a solid foundation for building fullstack web applications with a focus on simplicity and modern tools like Bun and TypeScript, while adhering to clean architecture principles and separation of concerns. It includes basic authentication functionality to manage user registration and login, enhancing the application's security and user management capabilities.




