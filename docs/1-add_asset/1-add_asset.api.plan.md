# API Plan for **1 - Add Asset**

## Description

Ensures API structure, endpoints, and types for the `1 - Add Asset` feature.

### Prompt after plan

Recommended prompt to use this plan:

```text
Follow the `.ai\builder\builder-implement.instructions.md` instructions to implement the api tier plan `1-add_asset.api.plan.md`
Read the reference documentation to understand the project and the feature.
Add the @rules to the prompt to be applied during the implementation.
```

## Preconditions

### Reference documentation

Reference documentation to be used during implementation:

- [Project System Architecture](/docs/systems.blueprint.md)
- [Project Data model](/docs/data-model.blueprint.md)
- [Feature](/docs/1-add_asset/1-add_asset.blueprint.md)
- [Request Utils to get params, body and UserIdt](/src/server/shared/request.utils.ts)
- [SQL Utils to interact with the database](/src/server/shared/sql.utils.ts)
- [Response Utils to send responses](/src/server/shared/response.utils.ts)
- [API Error Types](/src/server/shared/api-error.type.ts)
- [TS Rules](/.cursor/rules/type-script.mdc)
- [Server Resource Rules](/.cursor/rules/server-resource.mdc)

### Resources

- `asset`: Represents an investment asset.

### DTOs

For asset:
- `CreateAssetRequest`: Represents the data required to create a new asset.
  - `category_id: number` - The ID of the asset category.
  - `value: number` - The monetary value of the asset.
  - `quantity: number` - The quantity of the asset.
  - `acquisition_date: string` - The date the asset was acquired (ISO 8601 format).
- `AssetResponse`: Represents the asset data returned after creation or retrieval.
  - `id: number` - The unique identifier of the asset.
  - `user_id: number` - The ID of the user who owns the asset.
  - `category_id: number` - The ID of the asset category.
  - `value: number` - The monetary value of the asset.
  - `quantity: number` - The quantity of the asset.
  - `acquisition_date: string` - The date the asset was acquired (ISO 8601 format).

### Endpoints

For asset:
- `POST /api/assets`: Creates a new asset.
  - Request: `CreateAssetRequest`
  - Response: `AssetResponse`
  - Errors: `UNAUTHORIZED_ERROR`, `BAD_REQUEST_ERROR`, `INTERNAL_SERVER_ERROR`

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

For asset:

- [ ] Create resource folder at `src/server/api/asset`
- [ ] Create controller (`asset.controller.ts`) with endpoints, following the guidelines above.
    - Endpoint: `POST /api/assets`
    - Validation Function: `validateAsset`
    - Repository Function: `insertAsset`
- [ ] Create repository (`asset.repository.ts`) with data access functions, following the guidelines above.
    - Function Name: `insertAsset`
    - SQL Query:
      ```sql
      INSERT INTO asset (user_id, category_id, value, quantity, acquisition_date)
      VALUES (:user_id, :category_id, :value, :quantity, :acquisition_date);
      ```
- [ ] Create request/response types (`create-asset-request.type.ts`, `asset-response.type.ts`) in the resource folder.
- [ ] Create SQL file (`sql/asset.sql.json`) with the necessary SQL queries.
    - INSERT query (as defined above).

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

- [ ] Add routes for new resources in `apiRoutes`.  Add `"/api/assets": assetRoutes`
- [ ] Update error handling if needed.
- [ ] Configure authentication if required. Authentication is required for the `POST /api/assets` endpoint.

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

- [ ] Create if not exists `asset.type.ts`
  ```typescript
    export type Asset = {
        id: number;
        user_id: number;
        category_id: number;
        value: number;
        quantity: number;
        acquisition_date: string;
    }

    export const NULL_ASSET: Asset = {
        id: 0,
        user_id: 0,
        category_id: 0,
        value: 0,
        quantity: 0,
        acquisition_date: '',
    }
  ```
- [ ] Add `NULL_ASSET` constant, initializing *all* fields to appropriate default values (e.g., 0, "", false, etc.).
- [ ] Add validation function to `validations.utils.ts` if needed.
  ```typescript
  import { BAD_REQUEST_ERROR } from "@/server/shared/api-error.type";

  export const validateAsset = (asset: Partial<CreateAssetRequest>): void => {
    if (!asset.category_id ||!asset.value ||!asset.quantity ||!asset.acquisition_date) {
      throw BAD_REQUEST_ERROR;
    }
    if (!asset.acquisition_date || typeof asset.acquisition_date !== 'string') {
      throw BAD_REQUEST_ERROR;
    }
  };

  ```

_End of API Plan for 1 - Add Asset_ 