# API Plan for **1 - Add Asset**

## Plan preparation

This plan ensures API structure, endpoints, and types for the `1 - Add Asset` feature.

Before implementing the plan, read the preconditions below.

### Read the reference documentation

Reference documentation to be used during implementation:

- [Project System Architecture](/docs/systems.blueprint.md)
- [Project Data model](/docs/data-model.blueprint.md)
- [Feature](/docs/1-add_asset/1-add_asset.blueprint.md)
- [Request Utils](/src/server/shared/request.utils.ts)
- [SQL Utils](/src/server/shared/sql.utils.ts)
- [Response Utils](/src/server/shared/response.utils.ts)
- [API Error Types](/src/server/shared/api-error.type.ts)
- [TS Rules](/.cursor/rules/type-script.mdc)
- [Server Resource Rules](/.cursor/rules/server-resource.mdc)

### Resources

- `assets`: Manages investor assets with CRUD operations
- `categories`: Provides read-only access to asset categories for selection

### DTOs

For `assets`:
- `AssetPostRequest`: Request DTO for creating a new asset
  - `categoryId: number` - ID of the selected asset category
  - `value: number` - Monetary value of the asset
  - `quantity: number` - Number of units of the asset
  - `acquisitionDate: string` - ISO date string when the asset was acquired
- `AssetResponse`: Response DTO for asset data
  - `id: number` - Unique identifier of the asset
  - `categoryId: number` - ID of the asset category
  - `categoryName: string` - Name of the asset category
  - `value: number` - Monetary value of the asset
  - `quantity: number` - Number of units of the asset
  - `acquisitionDate: string` - ISO date string of acquisition
  - `createdAt: string` - ISO datetime of record creation
  - `updatedAt: string` - ISO datetime of last update

For `categories`:
- `CategoryResponse`: Response DTO for category data
  - `id: number` - Unique identifier of the category
  - `name: string` - Name of the category
  - `risk: string` - Risk level of the category
  - `liquidity: string` - Liquidity level of the category

### Endpoints

For `assets`:
- `POST /api/assets`: Creates a new asset in the investor's portfolio
  - Request: `AssetPostRequest`
  - Response: `AssetResponse`
  - Errors: UNAUTHORIZED, BAD_REQUEST, INTERNAL_SERVER_ERROR

For `categories`:
- `GET /api/categories`: Retrieves all available asset categories
  - Request: None
  - Response: `CategoryResponse[]`
  - Errors: UNAUTHORIZED, INTERNAL_SERVER_ERROR

## Implementation plan

### 1. Generate API Resources folder structure

#### Instructions and references

Each resource must follow this structure:
```
/src/server/api/resource-name/
  ├── resource-name.controller.ts     # Request handlers
  ├── resource-name.repository.ts     # Data access
  ├── request-name-request.type.ts    # Input DTOs
  └── response-name-response.type.ts  # Output DTOs
```

Repository example:
```typescript
import type { Raw } from "@/server/shared/sql.type";
import { NULL_RESOURCE, validateResource } from "@server/domain/resource.type";
import { insert, readCommands, selectAll } from "@server/shared/sql.utils";

const resourceSql = await readCommands("resource-name");

export const selectAllResources = (): Resource[] => {
  const results = selectAll<Resource>(resourceSql.SELECT_ALL);
  return results || [];
};

export const insertResource = (resourceToInsert: Raw<Resource>): Resource => {
  validateResource(resourceToInsert);
  const resourceId = insert<Raw<Resource>>(resourceSql.INSERT, resourceToInsert);
  const resource = selectById<Resource>(resourceSql.SELECT_BY_ID, resourceId);
  return resource || NULL_RESOURCE;
};
```

Controller example:
```typescript
import { validateUserId } from "@server/shared/request.utils";
import { ok } from "@server/shared/response.utils";
import type { ResourcePostRequest } from "./resource-post-request.type";
import { insertResource, selectAllResources } from "./resource.repository";

export const resourceRoutes = {
  GET: async (request: Request) => await getResources(request),
  POST: async (request: Request) => await postResource(request),
};

const getResources = async (request: Request): Promise<Response> => {
  const userId = validateUserId(request); // If auth needed
  const resources = selectAllResources();
  return ok<Resource[]>(resources);
};

const postResource = async (request: Request): Promise<Response> => {
  const userId = validateUserId(request); // If auth needed
  const body = await getBody<ResourcePostRequest>(request);
  const resource = await insertResource(body);
  return ok<Resource>(resource);
};
```

#### Tasks

- [ ] Create or update the `/src/server/api` folder with the API resources
- [ ] Create folder `assets`
- [ ] Create folder `categories`

### 2. Generate API Repository files

#### Instructions and references

- Uses the SQL commands from the `assets.sql.json` and `categories.sql.json` files
- Calls the SQL commands using the `sql.utils.ts` file
- Validates the data using the `validateAsset` function
- Throws an AppError if the logic or validation fails

#### Tasks

- [ ] Create repository `assets.repository.ts`
  - [ ] Add SQL commands import and read commands
  - [ ] Import entity types and Raw utils
  - [ ] Implement data access functions
  - [ ] Add validation calls
  - [ ] Throw AppError if logic or validation fails
- [ ] Create repository `categories.repository.ts`
  - [ ] Add SQL commands import and read commands
  - [ ] Import entity types and Raw utils
  - [ ] Implement data access functions
  - [ ] Add validation calls
  - [ ] Throw AppError if logic or validation fails

### 3. Generate API DTOs

#### Instructions and references

- DTOs are simple types that represent the data of the resource
- We do not validate the data at the DTO level, only at the repository level
- No need to null values nor validate types at the DTO level

Example DTO:
```typescript
export type ResourcePostRequest = {
  name: string;
  description: string;
  value: number;
};

export type ResourceResponse = {
  id: number;
  name: string;
  description: string;
  value: number;
  createdAt: string;
  updatedAt: string;
};
```

#### Tasks

- [ ] Go to `/src/server/api/assets/` folder
  - [ ] Create DTO `asset-post-request.type.ts`
  - [ ] Create DTO `asset-response.type.ts`
- [ ] Go to `/src/server/api/categories/` folder
  - [ ] Create DTO `category-response.type.ts`

### 4. Generate API Controllers

#### Instructions and references

- Controllers are the main files that handle the requests and responses
- They are functions attached to the routes object
- They extract information from the request and return the response
- They only validate request data presence, not data correctness
- They call the repository functions to read or write data
- They return the response using the response utils
- They do not handle errors, this is done at the route level

#### Tasks

- [ ] Go to `/src/server/api/assets/` folder
- [ ] Create controller `assets.controller.ts`
  - [ ] Import request utils and response utils
  - [ ] Import DTOs
  - [ ] Import repository
  - [ ] Implement controller functions
- [ ] Go to `/src/server/api/categories/` folder
- [ ] Create controller `categories.controller.ts`
  - [ ] Import request utils and response utils
  - [ ] Import DTOs
  - [ ] Import repository
  - [ ] Implement controller functions

### 5. Update API Configuration

#### Instructions and references

- The API configuration is done in `/src/server/api/api.controller.ts`
- The routes are attached to the routes object

Example configuration:
```typescript
export const apiRoutes = {
  "/api/*": {
    OPTIONS: (request: Request) => corsPreflight(request),
  },
  "/api/resources": resourceRoutes,
  "/api/resources/:param": resourceWithParamRoutes,
};
```

#### Tasks

- [ ] Update `/src/server/api/api.controller.ts`
- [ ] Import `assetsRoutes` from controller
- [ ] Import `categoriesRoutes` from controller
- [ ] Add routes to `apiRoutes` object

_End of API Plan for 1 - Add Asset_