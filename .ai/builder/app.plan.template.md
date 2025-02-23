---
information: Generate a markdown file documenting the implementation plan of the app tier for a feature.
important: This is a template for one and only one feature.
file_name: {{featureNumber}}-{{feature_short_name}}.app.plan.md
---

# App Plan for **{{featureNumber}} - {{feature_short_name}}**

## Description

Ensures client-side structure, components, and types for the `{{featureNumber}} - {{feature_short_name}}` feature.

### Prompt after plan

Recommended prompt to use this plan:

```text
Follow the `.ai\builder\builder-implement.instructions.md` instructions to implement the app tier plan `{{featureNumber}}-{{feature_short_name}}.app.plan.md`
Read the reference documentation to understand the project and the feature.
Add the @rules to the prompt to be applied during the implementation.
```

## Preconditions

### Reference documentation

Reference documentation to be used during implementation:

- [Project System Architecture](/docs/systems.blueprint.md)
- [Project Data model](/docs/data-model.blueprint.md)
- [Feature](/docs/{{featureNumber}}-{{feature_short_name}}/{{featureNumber}}-{{feature_short_name}}.blueprint.md)
- [DOM Utils](/src/client/shared/dom.utils.ts)
- [Fetch Utils](/src/client/shared/fetch.utils.ts)
- [Navigation Utils](/src/client/shared/navigation.utils.ts)
- [Format Utils](/src/client/shared/format.utils.ts)
- [Web Rules](/.cursor/rules/web.mdc)
- [Client Page Rules](/.cursor/rules/client-page.mdc)
- [TypeScript Rules](/.cursor/rules/type-script.mdc)

### Page Components

<!--
Think about the page components needed.
List them in kebab-case, with a brief description.
-->

@for(page of pages) {
- `{{page.name}}-page`: {{page.description}}
  - Route: `#{{page.route}}`
  - Parent: `router-outlet`
}

### Presenter Components

<!--
Think about the presenter components needed.
List them in kebab-case, with a brief description.
-->

@for(presenter of presenters) {
- `{{presenter.name}}-component`: {{presenter.description}}
  - Parent: `{{presenter.parent}}`
  - Events: {{presenter.events}}
}

### Repository Functions

<!--
Think about the repository functions needed.
List them in camelCase, with a brief description.
-->

@for(repository of repositories) {
For {{repository.name}}:
@for(function of repository.functions) {
- `{{function.name}}`: {{function.description}}
  - Endpoint: `{{function.endpoint}}`
  - Method: `{{function.method}}`
  - Request: `{{function.request}}`
  - Response: `{{function.response}}`
}
}

## Implementation plan

### Page Structure

Go to the `/src/client/app` folder

1. Each page must follow the structure:
```
/src/client/app/page-name/
  ├── page-name.page.ts           # Page controller
  ├── section-name.component.ts   # Presenter components
  └── page-name.repository.ts     # Data access
```

2. Pages must:
   - Extend HTMLElement
   - Use string templates with html helper
   - Define child components
   - Handle navigation
   - Follow REST conventions

3. Components must:
   - Extend HTMLElement
   - Use string templates with html helper
   - Handle DOM events
   - Emit custom events
   - No shadow DOM

4. Repositories must:
   - Use fetch utils only
   - Return typed responses
   - Handle errors properly
   - No direct fetch calls

5. Study `about/about.page.ts` and `auth/auth.page.ts` as reference implementations

@for(page of pages) {
For {{page.name}}:

- [ ] Create page folder at `src/client/app/{{page.name}}`
- [ ] Create page component with navigation
- [ ] Create presenter components
- [ ] Create repository with data access
}

### Navigation Configuration

Go to the `/src/client/shared/navigation.utils.ts` file

1. Add routes following the pattern:
```typescript
customElements.define("app-page-name-page", PageNamePage);
```

2. Import and configure:
   - New pages
   - Route handlers
   - Authentication if needed

- [ ] Add routes for new pages
- [ ] Update navigation handling if needed
- [ ] Configure authentication if required

### Domain Types

Go to the `/src/client/domain` folder

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

2. Add validation functions if needed:
```typescript
export const validateEntity = (entity: Partial<EntityType>): boolean => {
  return !!(entity.requiredField);
};
```

@for(type of types) {
- [ ] Create if not exists `{{type.name}}.type.ts`
- [ ] Add validation function if needed
}

_End of App Plan for {{featureNumber}} - {{feature_short_name}}_
