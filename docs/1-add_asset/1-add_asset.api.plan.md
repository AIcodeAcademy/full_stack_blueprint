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
- [Request Utils](/src/server/shared/request.utils.ts)
- [Response Utils](/src/server/shared/response.utils.ts)
- [SQL Utils](/src/server/shared/sql.utils.ts)
- [API Error Types](/src/server/shared/api-error.type.ts)
- [TS Rules](/.cursor/rules/type-script.mdc)
- [Server Resource Rules](/.cursor/rules/server-resource.mdc)

### Resources

- `category`: Manages investment categories with risk and liquidity levels
- `asset`: Handles investment assets owned by users

### DTOs

For category:
- `CategoryResponse`: Category data returned to client
  - `id: number` - Unique identifier
  - `name: string` - Category name
  - `risk_level: RiskLevel` - Risk level enum
  - `liquidity: Liquidity` - Liquidity level enum

For asset:
- `CreateAssetRequest`: Data needed to create a new asset
  - `category_id: number` - Category identifier
  - `value: number` - Asset monetary value
  - `quantity: number` - Number of units
  - `acquisition_date: string` - ISO date string
- `AssetResponse`: Asset data returned to client
  - `id: number` - Unique identifier
  - `category_id: number` - Category identifier
  - `value: number` - Asset monetary value
  - `quantity: number` - Number of units
  - `acquisition_date: string` - ISO date string

### Endpoints

For category:
- `GET /api/categories`: Get all available categories
  - Request: None
  - Response: `CategoryResponse[]`
  - Errors: Internal Server Error

For asset:
- `POST /api/assets`: Create a new asset
  - Request: `CreateAssetRequest`
  - Response: `AssetResponse`
  - Errors: Bad Request, Unauthorized, Internal Server Error
- `GET /api/assets`: Get user's assets
  - Request: None
  - Response: `AssetResponse[]`
  - Errors: Unauthorized, Internal Server Error

## Implementation plan

### API Resources

Go to the `/src/server/api` folder

1. Each resource must follow the structure:
```
/src/server/api/resource-name/
  ├── resource-name.controller.ts     # Request handlers
  ├── resource-name.repository.ts     # Data access
  ├── request-name-request.type.ts    # Input DTOs
  └── response-name-response.type.ts  # Output DTOs
```

2. Controllers must:
   - Export routes object with HTTP methods
   - Use request/response utils
   - Handle errors properly
   - Validate input data
   - Return typed responses
   - Follow REST conventions

Example controller structure:
```typescript
export const resourceRoutes = {
  GET: () => getResource(),
  POST: async (request: Request) => await postResource(request),
  // For parameterized routes:
  // POST: async (request: BunRequest<"/api/resource/:param">) => 
  //   await resourceController(request, request.params.param),
};
```

3. Repositories must:
   - Use SQL utils only
   - Return domain types
   - Handle data transformations
   - Define NULL values for types
   - Use readCommands for SQL queries

Example repository structure:
```typescript
const resourceSql = await readCommands("resource-name");

export const selectAllResources = (): Resource[] => {
  const results = selectAll<Resource>(resourceSql.SELECT_ALL);
  return results || [];
};
```

4. Study `tools.controller.ts` and `auth.controller.ts` as reference implementations

For category:

- [ ] Create resource folder at `src/server/api/category`
- [ ] Create controller with GET endpoint
- [ ] Create repository with data access
- [ ] Create response types

For asset:

- [ ] Create resource folder at `src/server/api/asset`
- [ ] Create controller with POST and GET endpoints
- [ ] Create repository with data access
- [ ] Create request/response types

### API Configuration

Go to the `/src/server/api/api.controller.ts` file

1. Add routes following the pattern:
```typescript
export const apiRoutes = {
  "/api/*": {
    OPTIONS: (request: Request) => corsPreflight(request),
  },
  "/api/resource": resourceRoutes,
  "/api/resource/:param": resourceRoutes,
};
```

2. Import and configure:
   - New controllers
   - Error handlers
   - Authentication if needed

- [ ] Add routes for categories and assets
- [ ] Update error handling if needed
- [ ] Configure authentication for asset endpoints

### Domain Types

Go to the `/src/server/domain` folder

1. Each type must have:
```typescript
export type EntityType = {
  id: number;
  // ... other fields
};

export const NULL_ENTITY: EntityType = {
  id: 0,
  // ... default values
};
```

2. Add validation functions to `validations.utils.ts`:
```typescript
export const validateEntity = (entity: Partial<EntityType>): void => {
  if (!entity.requiredField) {
    throw BAD_REQUEST_ERROR;
  }
};
```

- [ ] Update `category.type.ts` with NULL_CATEGORY
- [ ] Update `asset.type.ts` with NULL_ASSET
- [ ] Add validation functions for asset creation

_End of API Plan for 1 - Add Asset_ 