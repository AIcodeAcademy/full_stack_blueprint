---
information: Generate a markdown file documenting the implementation plan of the api tier for a feature.
important: This is a template for one and only one feature.
guide: Include all this template content in the result, fill the placeholders with the actual values.
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
No need to generate tasks for the resources at this point, just list them.
-->

@for(resource of resources) {
- `{{resource.name}}`: {{resource.description}}
}

### DTOs

<!--
Think about the Data Transfer Objects needed for each resource.
List them in PascalCase, with a brief description.
Follow the pattern: request-name-request.type.ts and response-name-response.type.ts
No need to generate tasks for the DTOs at this point, just list them.
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
List them with their HTTP method, path, and description.
Include request/response types and error cases.
No need to generate tasks for the endpoints at this point, just list them.
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

- Uses the SQL commands from the `{{resource.name}}.sql.json` file.
- Calls the SQL commands using the `sql.utils.ts` file.
- Validates the data using the `validateResource` function.
- Throws an AppError if the logic or validation fails.

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

@for(resource of resources) {
- [ ] Create repository `{{resource.name}}.repository.ts`
  - [ ] Add SQL commands import and read commands
  - [ ] Import entity types and Raw utils
  - [ ] Implement data access functions
  - [ ] Add validation calls
  - [ ] Throw AppError if logic or validation fails
} 

### 3. Generate API DTOs

#### Instructions and references

- DTOs are simple types that represent the data of the resource.
- We do not validate the data at the DTO level, only at the repository level.
- No need to null values nor validate types at the DTO level.

Each DTO must follow this structure:
```typescript 
export type {{resource.name}}{{HttpMethod}}{{ Request | Response }} = {
  // fields
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

- Controllers are the main files that handle the requests and responses.
- They are functions attached to the routes object.
- They extract information from the request and return the response.
- They only validate request data presence, not data correctness.
- They call the repository functions to read or write data.
- They return the response using the response utils.
- The do not handle errors, this is done at the route level.

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

@for(resource of resources) {
- [ ] Go to `/src/server/api/{{resource.name}}/` folder
- [ ] Create controller `{{resource.name}}.controller.ts`
  - [ ] Import request utils and response utils
  - [ ] Import DTOs
  - [ ] Import repository
  - [ ] Implement controller functions
}

### 5. Update API Configuration

#### Instructions and references

- The API configuration is done in `/src/server/api/api.controller.ts`.
- The routes are attached to the routes object.
  
Example:
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
@for(resource of resources) {
- [ ] Import `{{resource.name}}Routes` from controller
- [ ] Add routes to `apiRoutes` object
}


_End of API Plan for {{featureNumber}} - {{feature_short_name}}_