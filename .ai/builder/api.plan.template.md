---
information: Generate a markdown file documenting the implementation plan of the api tier for a feature.
important: This is a template for one and only one feature.
guide: Include all this template content, instructions and samples in the result, fill the placeholders with the actual values.
file_name: {{featureNumber}}-{{feature_short_name}}.api.plan.md
---

# API Plan for **{{featureNumber}} - {{feature_short_name}}**

## Plan preparation

This plan ensures API structure, endpoints, and types for the `{{featureNumber}} - {{feature_short_name}}` feature.

Before implementing the plan, read the preconditions below.

### Read the reference documentation

Reference documentation to be used during implementation:

- [Project System Architecture](/docs/systems.blueprint.md)
- [Project Data model](/docs/data-model.blueprint.md)
- [Feature](/docs/{{featureNumber}}-{{feature_short_name}}/{{featureNumber}}-{{feature_short_name}}.blueprint.md)
- [Request Utils](/src/server/shared/request.utils.ts)
- [SQL Utils](/src/server/shared/sql.utils.ts)
- [Response Utils](/src/server/shared/response.utils.ts)
- [API Error Types](/src/server/shared/api-error.type.ts)
- [TS Rules](/.cursor/rules/type-script.mdc)
- [Server Resource Rules](/.cursor/rules/server-resource.mdc)

### Resources

<!--
Think about the resources needed to implement the feature.
List them in kebab-case, with a brief description.
Each resource should represent a business concept.
Consider CRUD operations needed for each resource.
Example:
- `assets`: Manages investor assets with CRUD operations
- `categories`: Provides read-only access to asset categories for selection
-->

@for(resource of resources) {
- `{{resource.name}}`: {{resource.description}}
}

### DTOs

<!--
Think about the Data Transfer Objects needed for each resource.
List them in PascalCase, with a brief description.
Follow these patterns:
- Request DTOs: resource-name-request.type.ts (e.g., AssetPostRequest)
- Response DTOs: resource-name-response.type.ts (e.g., AssetResponse)

For each DTO:
- Include all fields needed by the client
- Use string for dates (ISO format)
- Include field descriptions
- Specify field types clearly

Example:
For `assets`:
- `AssetPostRequest`: Request DTO for creating a new asset
  - `categoryId: number` - ID of the selected asset category
  - `value: number` - Monetary value of the asset
  - `quantity: number` - Number of units of the asset
  - `acquisitionDate: string` - ISO date string when the asset was acquired
- `AssetResponse`: Response DTO for asset data
  - `id: number` - Unique identifier of the asset
  - `categoryId: number` - ID of the asset category
  - `value: number` - Monetary value of the asset
  - `createdAt: string` - ISO datetime of record creation
  - `updatedAt: string` - ISO datetime of last update
-->

@for(resource of resources) {
For `{{resource.name}}`:
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
Follow these patterns:
- Use RESTful conventions (GET, POST, PUT, DELETE)
- Include authentication requirements
- List all possible error cases
- Specify request/response types
- Use clear descriptions

Example:
For `assets`:
- `POST /api/assets`: Creates a new asset in the investor's portfolio
  - Request: `AssetPostRequest`
  - Response: `AssetResponse`
  - Errors: UNAUTHORIZED, BAD_REQUEST, INTERNAL_SERVER_ERROR
-->

@for(resource of resources) {
For `{{resource.name}}`:
@for(endpoint of resource.endpoints) {
- `{{endpoint.method}} {{endpoint.path}}`: {{endpoint.description}}
  - Request: `{{endpoint.request}}`
  - Response: `{{endpoint.response}}`
  - Errors: {{endpoint.errors}}
}
}

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

#### Tasks

- [ ] Create or update the `/src/server/api` folder with the API resources
@for(resource of resources) {
- [ ] Create folder `{{resource.name}}`
}

### 2. Generate API Repository files

#### Instructions and references

- Uses domain types and validation from `@server/domain` folder
- Uses the SQL commands from the `{{resource.name}}.sql.json` files
- Calls the SQL commands using the `sql.utils.ts` file
- Validates the data using domain validation functions
- Defines NULL values for safe fallbacks
- Uses Raw type for database operations
- Returns domain types from repository functions

Repository example with domain types and validation:
```typescript
import type { Asset, validateAsset } from "@/server/domain/asset.type";
import type { Raw } from "@/server/shared/sql.type";
import { insert, readCommands, selectAll, selectById } from "@server/shared/sql.utils";
import type { AssetResponse } from "./asset-response.type";

// Define NULL value for safe fallback
const NULL_ASSET: AssetResponse = {
  id: 0,
  categoryId: 0,
  categoryName: "",
  value: 0,
  quantity: 0,
  acquisitionDate: "",
  createdAt: "",
  updatedAt: ""
};

// Load SQL commands from file
const assetsSql = await readCommands("assets");

// Repository functions with domain validation
export const insertAsset = (assetToInsert: Raw<Asset>): Asset => {
  validateAsset(assetToInsert); // Domain validation
  const assetId = insert<Raw<Asset>>(assetsSql.INSERT, assetToInsert);
  const asset = selectById<Asset>(assetsSql.SELECT_BY_ID, assetId);
  return asset || NULL_ASSET;
};
```

#### Tasks

@for(resource of resources) {
- [ ] Create repository `{{resource.name}}.repository.ts`
  - [ ] Add SQL commands import and read commands
  - [ ] Import domain types and validation
  - [ ] Define NULL value constant
  - [ ] Implement data access functions with Raw type
  - [ ] Add domain validation calls
}

### 3. Generate API DTOs

#### Instructions and references

- DTOs are simple types that represent the data of the resource
- Request DTOs match the expected client input format
- Response DTOs include all fields needed by the client
- Dates are handled as ISO strings in DTOs
- We do not validate the data at the DTO level
- No need for NULL values at DTO level

Example DTO with date handling:
```typescript
// Request DTO - matches client input
export type AssetPostRequest = {
  categoryId: number;
  value: number;
  quantity: number;
  acquisitionDate: string; // ISO date string
};

// Response DTO - includes all needed fields
export type AssetResponse = {
  id: number;
  categoryId: number;
  categoryName: string;
  value: number;
  quantity: number;
  acquisitionDate: string; // ISO date string
  createdAt: string;      // ISO datetime
  updatedAt: string;      // ISO datetime
};
```

#### Tasks

@for(resource of resources) {
- [ ] Go to `/src/server/api/{{resource.name}}/` folder
@for(dto of resource.dtos) {
  - [ ] Create DTO `{{dto.name}}.type.ts`
}
}

### 4. Generate API Controllers

#### Instructions and references

- Controllers handle the HTTP layer
- They extract information from the request
- They map between DTOs and domain types
- They handle date conversions (string <-> Date)
- They call repository functions with correct types
- They map domain objects to response DTOs
- They return responses using response utils
- They do not handle errors (done at route level)
- They require authentication via validateUserId

Example controller with type mapping:
```typescript
import type { Asset } from "@/server/domain/asset.type";
import type { Raw } from "@/server/shared/sql.type";
import { getBody, validateUserId } from "@server/shared/request.utils";
import { ok } from "@server/shared/response.utils";
import type { AssetPostRequest } from "./asset-post-request.type";
import type { AssetResponse } from "./asset-response.type";
import { insertAsset } from "./assets.repository";

export const assetsRoutes = {
  POST: async (request: Request) => await postAsset(request),
};

const postAsset = async (request: Request): Promise<Response> => {
  // Extract and validate request data
  const userId = validateUserId(request);
  const body: AssetPostRequest = await getBody<AssetPostRequest>(request);
  
  // Map request to domain type
  const rawAsset: Raw<Asset> = {
    ...body,
    userId,
    acquisitionDate: new Date(body.acquisitionDate),
  };
  
  // Call repository
  const asset: Asset = insertAsset(rawAsset);
  
  // Map domain to response type
  const assetResponse: AssetResponse = {
    id: asset.id,
    categoryId: asset.categoryId,
    categoryName: asset.categoryName || "",
    value: asset.value,
    quantity: asset.quantity,
    acquisitionDate: asset.acquisitionDate.toISOString(),
    createdAt: asset.createdAt.toISOString(),
    updatedAt: asset.updatedAt.toISOString(),
  };
  
  return ok<AssetResponse>(assetResponse);
};
```

#### Tasks

@for(resource of resources) {
- [ ] Go to `/src/server/api/{{resource.name}}/` folder
- [ ] Create controller `{{resource.name}}.controller.ts`
  - [ ] Import request/response utils
  - [ ] Import domain and DTO types
  - [ ] Import repository functions
  - [ ] Implement type-safe controllers
  - [ ] Add proper type mappings
}

### 5. Update API Configuration

#### Instructions and references

- The API configuration is done in `/src/server/api/api.controller.ts`
- The routes are attached to the routes object
- All routes require CORS preflight support
- Routes can have path parameters

Example configuration:
```typescript
import { corsPreflight } from "../shared/response.utils";
import { assetsRoutes } from "./assets/assets.controller";
import { categoriesRoutes } from "./categories/categories.controller";

export const apiRoutes = {
  "/api/*": {
    OPTIONS: (request: Request) => corsPreflight(request),
  },
  "/api/assets": assetsRoutes,
  "/api/categories": categoriesRoutes,
};
```

#### Tasks

- [ ] Update `/src/server/api/api.controller.ts`
@for(resource of resources) {
- [ ] Import `{{resource.name}}Routes` from controller
- [ ] Add routes to `apiRoutes` object
}

_End of API Plan for {{featureNumber}} - {{feature_short_name}}_