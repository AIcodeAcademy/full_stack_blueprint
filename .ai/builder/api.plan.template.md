---
information: Generate a markdown file documenting the implementation plan of the api tier for a feature.
important: This is a template for one and only one feature.
file_name: {{featureNumber}}-{{feature_short_name}}.api.plan.md
---

# API Plan for **{{featureNumber}} - {{feature_short_name}}**

## Description

Ensures API structure, endpoints, and types for the `{{featureNumber}} - {{feature_short_name}}` feature.

### Prompt after plan

Recommended prompt to use this plan:

```text
Follow the `.ai\builder\builder-implement.instructions.md` instructions to implement the api tier plan `{{featureNumber}}-{{feature_short_name}}.api.plan.md`
Read the reference documentation to understand the project and the feature.
Add the @rules to the prompt to be applied during the implementation.
```

## Preconditions

### Reference documentation

Reference documentation to be used during implementation:

- [Project System Architecture](/docs/systems.blueprint.md)
- [Project Data model](/docs/data-model.blueprint.md)
- [Feature](/docs/{{featureNumber}}-{{feature_short_name}}/{{featureNumber}}-{{feature_short_name}}.blueprint.md)
- [Request Utils to get params, body and UserIdt](/src/server/shared/request.utils.ts)
- [SQL Utils to interact with the database](/src/server/shared/sql.utils.ts)
- [Response Utils to send responses](/src/server/shared/response.utils.ts)
- [API Error Types](/src/server/shared/api-error.type.ts)
- [TS Rules](/.cursor/rules/type-script.mdc)
- [Server Resource Rules](/.cursor/rules/server-resource.mdc)

### Resources

<!--
Think about the resources needed to implement the feature.
List them in kebab-case, with a brief description.
-->

@for(resource of resources) {
- `{{resource.name}}`: {{resource.description}}
}

### DTOs

<!--
Think about the Data Transfer Objects needed.
List them in PascalCase, with a brief description.
Follow the pattern: request-name-request.type.ts and response-name-response.type.ts
-->

@for(resource of resources) {
For {{resource.name}}:
@for(dto of resource.dtos) {
- `{{dto.name}}`: {{dto.description}}
  @for(field of dto.fields) {
  - `{{field.name}}: {{field.type}}` - {{field.description}}
  }
}
}

### Endpoints

<!--
For each resource, think about the endpoints needed.
List them with their HTTP method, path, and description.
Include request/response types and error cases.
-->

@for(resource of resources) {
For {{resource.name}}:
@for(endpoint of resource.endpoints) {
- `{{endpoint.method}} {{endpoint.path}}`: {{endpoint.description}}
  - Request: `{{endpoint.request}}`
  - Response: `{{endpoint.response}}`
  - Errors: {{endpoint.errors}}
}
}

## Implementation plan

### API Resources

Go to the `/src/server/api` folder

1.  Each resource must follow the structure:

    ```
    /src/server/api/resource-name/
      ├── resource-name.controller.ts     # Request handlers
      ├── resource-name.repository.ts     # Data access
      ├── request-name-request.type.ts    # Input DTOs (one or more)
      └── response-name-response.type.ts  # Output DTOs (one or more)
    ```

2.  **Controllers** must:

    *   Export a `resourceRoutes` object with HTTP methods (GET, POST, PUT, DELETE, OPTIONS) as keys and handler functions as values.
    *   Use `request.utils.ts` functions:
        *   `getParams`, `getSearchParam`, `getBody` to extract data from the request.
        *   `validateUserId` to authenticate and authorize requests (where applicable).  Explicitly state when this is needed.
        *   `validatePostRequest` to validate the request method.
    *   Use `response.utils.ts` functions:
        *   `ok` for successful responses (status 200).
        *   `badRequest`, `unauthorized`, `forbidden`, `notFound`, `internalServerError` for error responses.
        *   `handleInternalError` for unexpected errors.
    *   Handle errors by throwing specific `api-error.type.ts` errors (e.g., `UNAUTHORIZED_ERROR`, `BAD_REQUEST_ERROR`).
    *   Validate input data using validation functions from `src/server/domain/validations.utils.ts`.  *Explicitly call out which validation function to use for each endpoint.*
    *   Return typed responses using the DTOs defined in the plan.
    *   Follow REST conventions.
    * **Explicitly define the expected request body structure for POST/PUT requests.**

    Example controller structure:

    ```typescript
    import { /* ... */ } from "../../shared/response.utils";
    import { /* ... */ } from "./resource-name.repository";
    import type { /* ... */ } from "./request-name-request.type";
    import type { /* ... */ } from "./response-name-response.type";
    import { validateUserId } from "@server/shared/request.utils"; // If authentication is needed
    import { validateResource } from "@/server/domain/validations.utils"; // Import validation function

    export const resourceRoutes = {
      GET: (request: Request): Promise<Response> => await getResource(request),
      POST: (request: Request): Promise<Response> => await postResource(request),
    };

    async getResource(request: Request): Promise<Response> {
        // If authentication is needed:
        const userId = validateUserId(request);
        // ... get data from repository, using userId if needed
        const resource = await getResourceFromRepository(userId);
        return ok(resource);
    }
    async postResource(request: Request): Promise<Response> {
        // If authentication is needed:
        const userId = validateUserId(request);

        const body = await getBody<RequestType>(request); // Use the correct request DTO
        validateResource(body); // Validate the request body

        // ... call repository to insert/update data, using userId if needed
        const resource = insertResource(body);
        return ok(resource); // Return appropriate response DTO
    }
    ```

3.  **Repositories** must:

    *   Use `sql.utils.ts` functions (`readCommands`, `selectAll`, `selectById`, `selectByUserId`, `insert`, `update`, `create`, `drop`) to interact with the database.
    *   Use `await readCommands("resource-name")` to load SQL commands from `sql/resource-name.sql.json`.
    *   Define functions for each database operation (e.g., `selectAllResources`, `selectResourceById`, `insertResource`, `updateResource`, `deleteResource`).  *Be very specific about the function names.*
    *   Receive DTOs as parameters (where appropriate).
    *   Return domain types (defined in `/src/server/domain`).
    *   Handle data transformations between DTOs and domain types.
    * **Explicitly define the SQL queries needed for each operation, and include them in the plan.**

    Example repository structure:

    ```typescript
    import type { Resource } from "../../domain/resource.type"; // Import domain type
    import { readCommands, selectAll, selectByUserId, insert } from "../../shared/sql.utils";
    import type { CreateResourceRequest } from "./create-resource-request.type"; // Import DTO

    const resourceSql = await readCommands("resource-name");

    export const selectAllResources = (): Resource[] => {
      const results = selectAll<Resource>(resourceSql.SELECT_ALL);
      return results || []; // Return empty array if null
    };

    export const selectResourcesByUserId = (userId: number): Resource[] => {
      const results = selectByUserId<Resource>(resourceSql.SELECT_BY_USER_ID, userId);
      return results || []; // Return empty array if null
    };

    export const insertResource = (resource: CreateResourceRequest & {user_id: number}): Resource => { // Example with user_id
        const id = insert<CreateResourceRequest & {user_id: number}>(resourceSql.INSERT, resource);
        return {...resource, id}
    };

    // ... other functions
    ```

@for(resource of resources) {
For {{resource.name}}:

- [ ] Create resource folder at `src/server/api/{{resource.name}}`
- [ ] Create controller (`{{resource.name}}.controller.ts`) with endpoints, following the guidelines above.  *Specify which endpoints, which validation functions, and which repository functions to use.*
- [ ] Create repository (`{{resource.name}}.repository.ts`) with data access functions, following the guidelines above. *Specify the function names and the SQL queries.*
- [ ] Create request/response types (`request-name-request.type.ts`, `response-name-response.type.ts`) in the resource folder.
- [ ] Create SQL file (`sql/{{resource.name}}.sql.json`) with the necessary SQL queries. *List the required queries in the plan.*
}

### API Configuration

Go to the `/src/server/api/api.controller.ts` file

1.  Add routes following the pattern (prefer plural for the resource name and route):

    ```typescript
    export const apiRoutes = {
      "/api/*": {
        OPTIONS: (request: Request) => corsPreflight(request),
      },
      "/api/resources": resourcesRoutes, // For non-parameterized routes
      "/api/resources/:param": resourcesWithParamRoutes, // For parameterized routes
    };
    ```

2.  Import and configure:

    *   New controllers.
    *   Error handlers (if needed).
    *   Authentication (if needed).  *Be explicit about where authentication is required.*

- [ ] Add routes for new resources in `apiRoutes`.
- [ ] Update error handling if needed.
- [ ] Configure authentication if required.

### Domain Types

Go to the `/src/server/domain` folder

1.  Each type must have:

    ```typescript
    export type EntityType = {
      id: number;
      // ... other fields
    };

    export const NULL_ENTITY: EntityType = {
      id: 0,
      // ... default values for ALL fields.  Be EXPLICIT.
    };
    ```

2.  Add validation functions to `validations.utils.ts`:

    ```typescript
    import { BAD_REQUEST_ERROR } from "@/server/shared/api-error.type"; // Import error types

    export const validateEntity = (entity: Partial<EntityType>): void => {
      if (!entity.requiredField) { // Example validation
        throw BAD_REQUEST_ERROR;
      }
      // ... other validations
    };
    ```
     *Be specific about the validations needed for each field.*

@for(type of types) {
- [ ] Create if not exists `{{type.name}}.type.ts`
- [ ] Add `NULL_{{type.name}}` constant, initializing *all* fields to appropriate default values (e.g., 0, "", false, etc.).
- [ ] Add validation function to `validations.utils.ts` if needed. *Specify the exact validations required.*
}

_End of API Plan for {{featureNumber}} - {{feature_short_name}}_