---
description: Generate server API resources
globs: /src/server/api/*
---

# Server Resource Rules

## API Structure

### Resource Organization
- Resources are organized by routes in `/src/server/api/{resource-name}/`
- Each resource follows this structure:
```
/resource-name/
  ├── {resource-name}.controller.ts     # Request handlers and routes
  ├── {resource-name}.repository.ts     # Data access
  ├── {resource-name}-request.type.ts   # Input DTOs
  └── {resource-name}-response.type.ts  # Output DTOs
```

### Controllers
- Export a routes object with HTTP methods
- Use Bun:Request type for parameterized routes
- Handle authentication via request utils at `@server/shared/request.utils`
- Return typed responses using response utils at `@server/shared/response.utils`
- Follow REST conventions

Example:
```typescript
export const resourceNameRoutes = {
  GET: () => getResourceNames(),
  POST: async (request: Request) => await postResourceName(request),
};

const getResourceNames= async (request: Request): Promise<Response> => {
	const resourceNames = selectAllResourceNames();
	return ok<ResourceName[]>(resourceNames);
};
const postResourceName = async (request: Request): Promise<Response> => {
	const userId = validateUserId(request);
	const resourceNameDto = (await request.json()) as ResourceNamePostRequest;
	const resourceNameToInsert: Raw<ResourceName> = {
		...resourceNameDto,
		user_id :userId,
	};
	const resourceName = insertResourceName(resourceNameToInsert);
	return ok<ResourceName>(resourceName);
};

```

### Repositories
- Use readCommands to load SQL queries and commands from `/sql/{resource-name}.sql.json`
- Receive domain types (raw data), not DTOs
- Return domain types, not DTOs
- Use SQL utils for all database operations from `@server/shared/sql.utils`

Example:
```typescript
import type { ResourceName, NULL_RESOURCE_NAME } from "@server/domain/resource-name.type";
import type { Raw } from "@server/shared/sql.type";
import { insert, readCommands, selectAll, selectById } from "@server/shared/sql.utils";

const resourceNameSql = await readCommands("resource-name");

export const selectAllResourceNames = (): ResourceName[] => {
  const results = selectAll<ResourceName>(resourceNameSql.SELECT_ALL);
  return results || [];
};

export const insertResourceName = (resourceNameToInsert: Raw<ResourceName>): ResourceName => {
  const resourceNameId = insert<Raw<ResourceName>>(resourceNameSql.INSERT, resourceNameToInsert);
  return selectById<ResourceName>(resourceNameSql.SELECT_BY_ID, resourceNameId);
};
```

### Domain Types
- Use or create domain types from `@server/domain/{resource-name}.type.ts`
- Use `kebab-case` for field names

Example:
```typescript
export type ResourceName = {
  id: number;
  name: string;
  description: string;
  user_id: number;
  created_at: Date;
  updated_at: Date;
};

export const NULL_RESOURCE_NAME: ResourceName = {
  id: 0,
  name: "",
  description: "",
  user_id: 0,
  created_at: new Date(),
  updated_at: new Date(),
};

// Domain validation
export const validateResourceName = (resourceName: ResourceName): void => {
  if (!resourceName.name) throw new Error("Name is required");
};
```

### DTOs
- Use request/response suffix for clarity
- Keep DTOs simple and focused
- Use `kebab-case` for field names

Example:
```typescript
export type ResourceNameRequest = {
  name: string;
  description: string;
};

export type ResourceNameResponse = {
  id: number;
  name: string;
  description: string;
  user_id: number;
  created_at: Date;
  updated_at: Date;
};

```

## Error Handling
- Use predefined API errors from `@server/shared/api-error.type.ts`
- Handle errors at controller level
- Log errors appropriately
- Return consistent error responses

## Authentication
- Validate user session in controllers when needed
- Use validateUserId utility for protected routes
- Handle unauthorized access consistently

## SQL
- Use SQL utilities from `@server/shared/sql.utils`
- Use stored SQL queries and commands from `/sql/{resource-name}.sql.json`
- Use parameterized queries
- Follow SQL naming conventions
- Use readCommands utility to load queries
