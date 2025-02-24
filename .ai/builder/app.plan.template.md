---
information: Generate a markdown file documenting the implementation plan of the app tier for a feature.
important: This is a template for one and only one feature.
guide: Include all this template content, instructions and samples in the result, fill the placeholders with the actual values.
file_name: {{featureNumber}}-{{feature_short_name}}.app.plan.md
---

# App Plan for **{{featureNumber}} - {{feature_short_name}}**

## Plan preparation

This plan ensures client-side structure, components, and types for the `{{featureNumber}} - {{feature_short_name}}` feature.

Before implementing the plan, read the preconditions below.

### Read the reference documentation

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

<!--
Think about the domain types needed for the feature.
List them in PascalCase, with a brief description.
Fields are in snake_case, with a brief description.
Include validation rules and default values.
-->

@for(type of types) {
#### {{type.name}}.type.ts
```typescript
export type {{type.name}} = {
  @for(field of type.fields) {
  {{field.name}}: {{field.type}}; // {{field.description}}
  }
};

export const NULL_{{type.name | uppercase}} = {
  @for(field of type.fields) {
  {{field.name}}: {{field.default}},
  }
};

@if(type.validation) {
export const validate{{type.name}} = (data: Partial<{{type.name}}>): boolean => {
  @for(rule of type.validation) {
  // {{rule.description}}
  if (!{{rule.condition}}) return false;
  }
  return true;
};
}
```
}

### Pages

<!--
Think about the pages needed for the feature.
They are top-level components that handle routing and state management.
They use Presentational Components to build the UI and Repository Functions to handle the data.
List them in kebab-case, with a brief description.
Include route, state, template and lifecycle methods.
-->

@for(page of pages) {
- {{page.name}}: {{page.description}}
}

### Components

<!--
Think about the presentational components needed for the feature.
They hold the UI logic and state.
They do not handle routing or data fetching.
List them in kebab-case, with a brief description.
Include properties, events, template and lifecycle methods.
-->

@for(component of components) {
- {{component.name}}: {{component.description}}
}

### Repository Functions

<!--
Think about the repository functions needed for the feature.
They are modules of functions that handle API requests.
List them in camelCase, with a brief description.
Include parameters, return types and error handling.
-->

@for(repository of repositories) {
- {{repository.name}}: {{repository.description}}
}

## Implementation Steps

### 1. Generate Domain Types

#### Instructions and references
- Domain types represent the core business objects
- They must include validation and default values
- They should be independent of UI/API concerns
- Study `/src/client/domain/tools.type.ts` as reference

#### Tasks

@for(type of types) {
- [ ] Create `src/client/domain/{{type.name}}.type.ts`
  - [ ] Define type interface
  - [ ] Add NULL constant
  - [ ] Implement validation
}

### 2. Generate Page folder 

#### Instructions and references
- Page folder contains the page component and its dependencies
- It should be named after the page
- It should be located in the `src/client/app` folder
- Study `/src/client/app/tools/` as reference
 

#### Tasks

@for(page of pages) {
- [ ] Create `src/client/app/{{page.name}}/` folder
}

### 3. Generate Repository Functions

#### Instructions and references
- Repository are modules of functions that handle API requests
- They use the `fetch.utils.ts` to make requests
- They must include error handling and return Result types, without throwing errors
- Study `/src/client/repository/tools.repository.ts` as reference

This is an example of a repository function:
```typescript
@for(function of repository.functions) {
export const {{function.name}} = async ({{function.params}}): Promise<{{function.return}}> => {
  try {
    const response = await {{function.method}}<{{function.return}}>(
      "{{function.endpoint}}"{{#if function.body}},
      {{function.body}}
      {{/if}}
    );
    return response.body || {{function.default}};
  } catch (error) {
    console.error(`Error in {{function.name}}:`, error);
    return {{function.default}};
  }
};
}
```


#### Tasks

@for(repository of repositories) {
- [ ] Go to the `src/client/app/{{page.name}}/` folder
- [ ] Create `{{repository.name}}.repository.ts`
  - [ ] Define function interface
  - [ ] Implement error handling
  - [ ] Return Result types
}

### 4. Generate Presentational Components

#### Instructions and references
- Components are reusable UI elements
- They emit events for parent communication
- They use attributes for configuration
- Study existing components in the `src/client/app/tools` folder as reference

This is an example of a presentational component:
```typescript
const html = String.raw;

export class {{component.className}}Component extends HTMLElement {
  // Parent: {{component.parent}}
  
  @for(prop of component.properties) {
  @if(prop.attribute) {
  static get observedAttributes() {
    return ['{{prop.attribute}}'];
  }
  }
  #{{prop.name}} = {{prop.default}}; // {{prop.description}}
  }

  @for(event of component.events) {
  #{{event.name}}Event = new CustomEvent('{{event.name}}', {
    bubbles: true,
    composed: true,
    detail: {{event.detail}}
  });
  }

  #template = html`
    {{component.template}}
  `;

  constructor() {
    super();
    this.innerHTML = this.#template;
  }

  @if(component.connected) {
  connectedCallback() {
    {{component.connected}}
  }
  }

  @if(component.disconnected) {
  disconnectedCallback() {
    {{component.disconnected}}
  }
  }

  @if(component.attributeChanged) {
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    {{component.attributeChanged}}
  }
  }
}
```

#### Tasks  

@for(component of components) {
- [ ] Go to the `src/client/app/{{component.parent}}/` folder
- [ ] Create `{{component.name}}.component.ts`
  - [ ] Define component class
  - [ ] Define and add the HTML template
  - [ ] Add properties and events
  - [ ] Add lifecycle methods
}

### 5. Generate Page Structure

#### Instructions and references
- Pages are top-level components
- They handle routing and state management
- They coordinate child components
- Study `/src/client/app/home/home.page.ts` as reference

This is an example of a page:
```typescript
const html = String.raw;

export class {{page.className}}Page extends HTMLElement {
  // Route: #{{page.route}}
  // Parent: router-outlet
  
  #state = {
    @for(state of page.state) {
    {{state.name}}: {{state.default}}, // {{state.description}}
    }
  };

  #template = html`
    {{page.template}}
  `;

  constructor() {
    super();
    this.innerHTML = this.#template;
  }

  @if(page.connected) {
  connectedCallback() {
    {{page.connected}}
  }
  }

  @if(page.disconnected) {
  disconnectedCallback() {
    {{page.disconnected}}
  }
  }
}
```

#### Tasks

@for(page of pages) {
- [ ] Go to the `src/client/app/{{page.name}}/` folder
- [ ] Create `{{page.name}}.page.ts`
  - [ ] Define page class
  - [ ] Import components and define them as custom elements
  - [ ] Import repository functions
  - [ ] Add state management
  - [ ] Add lifecycle methods
}

### 6. Update Navigation

#### Instructions and references
- Navigation is handled in `/src/client/shared/navigation.utils.ts`
- Each page needs a route definition
- Components need to be registered
- Study existing routes as reference

#### Tasks

- [ ] Go`/src/client/shared/navigation.utils.ts`
@for(page of pages) {
  - [ ] Add route for `{{page.name}}`
  - [ ] Register `{{page.className}}Page` component
}


_End of App Plan for {{featureNumber}} - {{feature_short_name}}_
