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
- [Request Utils to get parameters, body and UserId from the request](/src/server/shared/request.utils.ts)
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

1. Each resource must follow the structure:
```
/src/server/api/resource-name/
  ├── resource-name.controller.ts     # Request handlers
  ├── resource-name.repository.ts     # Data access
  ├── request-name-request.type.ts    # Input DTOs (one or more)
  └── response-name-response.type.ts  # Output DTOs (one or more)
```

2. Controllers must:
   - Export routes object with HTTP methods
   - Use request/response utils from `/src/server/shared/request.utils.ts` and `/src/server/shared/response.utils.ts`
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
   - Naming convention: selectAllResources, selectResourceById, insertResource, updateResource, deleteResource
   - Use readCommands for SQL commands
   - Receive Resource type DTO as parameter
   - Use SQL utils from `/src/server/shared/sql.utils.ts` to execute commands
   - Handle data transformations
   - Return domain types  

Example repository structure:
```typescript
const resourceSql = await readCommands("resource-name");

export const selectAllResources = (): Resource[] => {
  const results = selectAll<Resource>(resourceSql.SELECT_ALL);
  return results || [];
};
```

1. Study `tools.controller.ts` and `auth.controller.ts` as reference implementations

@for(resource of resources) {
For {{resource.name}}:

- [ ] Create resource folder at `src/server/api/{{resource.name}}`
- [ ] Create controller with endpoints
- [ ] Create repository with data access
- [ ] Create request/response types
}

### API Configuration

Go to the `/src/server/api/api.controller.ts` file

1. Add routes following the pattern:
```typescript
export const apiRoutes = {
  "/api/*": {
    OPTIONS: (request: Request) => corsPreflight(request),
  },
  "/api/resource": resourceRoutes,
  "/api/resource/:param": resourceWithParamRoutes,
};
```

2. Import and configure:
   - New controllers
   - Error handlers
   - Authentication if needed

- [ ] Add routes for new resources
- [ ] Update error handling if needed
- [ ] Configure authentication if required

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

@for(type of types) {
- [ ] Create if not exists `{{type.name}}.type.ts`
- [ ] Add validation function if needed
}

_End of API Plan for {{featureNumber}} - {{feature_short_name}}_
