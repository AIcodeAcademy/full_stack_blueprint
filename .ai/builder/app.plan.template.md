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

### Domain Types

@for(type of types) {
```typescript
export type {{type.name}} = {
  {{type.fields}}
};

export const NULL_{{type.name | uppercase}} = {
  {{type.defaults}}
};

{{#if type.validation}}
export const validate{{type.name}} = (data: Partial<{{type.name}}>): boolean => {
  {{type.validation}}
};
{{/if}}
```
}

### Page Components

@for(page of pages) {
#### {{page.name}}.page.ts
- Route: `#{{page.route}}`
- Parent: `router-outlet`
- State:
```typescript
#state = {
  {{page.state}}
}
```
- Template:
```typescript
#template = html`
  {{page.template}}
`;
```
- Lifecycle:
  - Constructor: Set template
  - ConnectedCallback: {{page.connected}}
  - DisconnectedCallback: {{page.disconnected}}
}

### Presenter Components

@for(presenter of presenters) {
#### {{presenter.name}}.component.ts
- Parent: `{{presenter.parent}}`
- Properties:
```typescript
{{presenter.properties}}
```
- Events:
```typescript
{{presenter.events}}
```
- Template:
```typescript
#template = html`
  {{presenter.template}}
`;
```
- Lifecycle:
  - Constructor: Set template
  - ConnectedCallback: {{presenter.connected}}
  - DisconnectedCallback: {{presenter.disconnected}}
}

### Repository Functions

@for(repository of repositories) {
#### {{repository.name}}.repository.ts
@for(function of repository.functions) {
```typescript
export const {{function.name}} = async ({{function.params}}): Promise<{{function.return}}> => {
  const response = await {{function.method}}<{{function.return}}>("{{function.endpoint}}"{{#if function.body}}, {{function.body}}{{/if}});
  if (response.body) return response.body;
  return {{function.default}};
};
```
}
}

## Implementation Steps

1. Create Domain Types
@for(type of types) {
- [ ] Create `src/client/domain/{{type.name}}.type.ts`
}

2. Create Page Structure
@for(page of pages) {
- [ ] Create folder `src/client/app/{{page.name}}/`
- [ ] Create `{{page.name}}.page.ts`
- [ ] Create `{{page.name}}.repository.ts`
}

3. Create Presenter Components
@for(presenter of presenters) {
- [ ] Create `{{presenter.name}}.component.ts`
}

4. Update Navigation
- [ ] Add routes to `navigation.utils.ts`:
```typescript
@for(page of pages) {
customElements.define("app-{{page.name}}-page", {{page.className}}Page);
}
```


_End of App Plan for {{featureNumber}} - {{feature_short_name}}_
