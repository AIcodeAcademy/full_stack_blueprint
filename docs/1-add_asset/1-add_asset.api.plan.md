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

- `assets`: Manages investor assets with CRUD operations for portfolio management
- `categories`: Provides read-only access to asset categories for selection during asset creation

### DTOs

For `assets`:
- `AssetPostRequest`: Request DTO for creating a new asset
  - `categoryId: string` - UUID of the selected asset category
  - `value: number` - Monetary value of the asset
  - `quantity: number` - Number of units of the asset
  - `acquisitionDate: string` - ISO date string when the asset was acquired

- `AssetResponse`: Response DTO for asset data
  - `id: string` - UUID of the asset
  - `categoryId: string` - UUID of the asset category
  - `value: number` - Monetary value of the asset
  - `quantity: number` - Number of units of the asset
  - `acquisitionDate: string` - ISO date of acquisition
  - `userId: string` - UUID of the owner
  - `createdAt: string` - ISO datetime of record creation
  - `updatedAt: string` - ISO datetime of last update

For `categories`:
- `CategoryResponse`: Response DTO for category data
  - `id: string` - UUID of the category
  - `name: string` - Name of the category
  - `riskLevel: string` - Risk level (low, medium, high)
  - `liquidityLevel: string` - Liquidity level (low, medium, high)

### Endpoints

For `assets`:
- `POST /api/assets`: Creates a new asset in the investor's portfolio
  - Request: `AssetPostRequest`
  - Response: `AssetResponse`
  - Errors: UNAUTHORIZED, BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR

For `categories`:
- `GET /api/categories`: Retrieves list of available asset categories
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

#### Tasks

- [x] Create or update the `/src/server/api` folder with the API resources
- [x] Create folder `assets`
- [x] Create folder `categories`

### 2. Generate API Repository files

#### Instructions and references

- Uses domain types, null values and validation from `@server/domain` folder
- Uses the SQL commands from the `assets.sql.json` files
- Calls the SQL commands using the `sql.utils.ts` file
- Uses Raw utility type for incoming data
- Returns domain types from repository functions
- No api DTOs or api related knowledge in the repository files

Repository example with domain types and validation:
```typescript
import type { Asset, validateAsset, NULL_ASSET } from "@/server/domain/asset.type";
import type { Raw } from "@/server/shared/sql.type";
import { insert, readCommands, selectAll, selectById } from "@server/shared/sql.utils";

const assetSql = await readCommands("asset");

export const selectAllAssets = (): Asset[] => {
  const results = selectAll<Asset>(assetSql.SELECT_ALL);
  return results || [];
};

export const insertAsset = (assetToInsert: Raw<Asset>): Asset => {
  validateAsset(assetToInsert); // Domain validation
  const assetId = insert<Raw<Asset>>(assetSql.INSERT, assetToInsert);
  const asset = selectById<Asset>(assetSql.SELECT_BY_ID, assetId);
  return asset || NULL_ASSET;
};
```

#### Tasks

- [x] Create repository `assets.repository.ts`
  - [x] Add SQL commands import and read commands
  - [x] Import domain types and validation
  - [x] Define NULL value constant
  - [x] Implement data access functions with Raw type
  - [x] Add domain validation calls

- [x] Create repository `categories.repository.ts`
  - [x] Add SQL commands import and read commands
  - [x] Import domain types and validation
  - [x] Define NULL value constant
  - [x] Implement data access functions with Raw type
  - [x] Add domain validation calls

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
  categoryId: string;
  value: number;
  quantity: number;
  acquisitionDate: string;
};

// Response DTO - includes all needed fields
export type AssetResponse = {
  id: string;
  categoryId: string;
  value: number;
  quantity: number;
  acquisitionDate: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};
```

#### Tasks

- [x] Go to `/src/server/api/assets/` folder
  - [x] Create DTO `asset-post-request.type.ts`
  - [x] Create DTO `asset-response.type.ts`

- [x] Go to `/src/server/api/categories/` folder
  - [x] Create DTO `category-response.type.ts`

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
import { insertAsset } from "./asset.repository";

export const assetRoutes = {
  POST: async (request: Request) => {
    // Extract and validate request data
    const userId = validateUserId(request);
    const body = await getBody<AssetPostRequest>(request);
    
    // Map request to domain type
    const rawAsset: Raw<Asset> = {
      ...body,
      userId,
      acquisitionDate: new Date(body.acquisitionDate),
    };
    
    // Call repository
    const asset = await insertAsset(rawAsset);
    
    // Map domain to response type
    const assetResponse: AssetResponse = {
      id: asset.id,
      categoryId: asset.categoryId,
      value: asset.value,
      quantity: asset.quantity,
      userId: asset.userId,
      acquisitionDate: asset.acquisitionDate.toISOString(),
      createdAt: asset.createdAt.toISOString(),
      updatedAt: asset.updatedAt.toISOString(),
    };
    
    return ok<AssetResponse>(assetResponse);
  },
};
```

#### Tasks

- [x] Go to `/src/server/api/assets/` folder
- [x] Create controller `assets.controller.ts`
  - [x] Import request/response utils
  - [x] Import domain and DTO types
  - [x] Import repository functions
  - [x] Implement type-safe controllers
  - [x] Add proper type mappings

- [x] Go to `/src/server/api/categories/` folder
- [x] Create controller `categories.controller.ts`
  - [x] Import request/response utils
  - [x] Import domain and DTO types
  - [x] Import repository functions
  - [x] Implement type-safe controllers
  - [x] Add proper type mappings

### 5. Update API Configuration

#### Instructions and references

- The API configuration is done in `/src/server/api/api.controller.ts`
- The routes are attached to the routes object
- All routes require CORS preflight support
- Routes can have path parameters

Example configuration:
```typescript
import { corsPreflight } from "../shared/response.utils";
import { assetRoutes } from "./assets/assets.controller";
import { categoryRoutes } from "./categories/categories.controller";

export const apiRoutes = {
  "/api/*": {
    OPTIONS: (request: Request) => corsPreflight(request),
  },
  "/api/assets": assetRoutes,
  "/api/categories": categoryRoutes,
};
```

#### Tasks

- [x] Update `/src/server/api/api.controller.ts`
- [x] Import `assetRoutes` from controller
- [x] Import `categoryRoutes` from controller
- [x] Add routes to `apiRoutes` object

_End of API Plan for 1 - Add Asset_ 