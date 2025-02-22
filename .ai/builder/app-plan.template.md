---
information: Generate a markdown file documenting the implementation plan of the app tier for a feature.
important: This is a template for one and only one feature.
file_name: {{featureNumber}}-{{feature_short_name}}.app-plan.blueprint.md
---

# App Plan for **{{featureNumber}} - {{feature_short_name}}**

## Description

The App implementation plan for the `{{featureNumber}} - {{feature_short_name}}` feature. 

Reference documentation to be used during implementation:

- [Project System Architecture](/docs/architecture/system-architecture.blueprint.md)
- [Project Data model](/docs/architecture/data-model.blueprint.md)
- [Feature](/docs/features/{{featureNumber}}-{{feature_short_name}}/{{featureNumber}}-{{feature_short_name}}.blueprint.md)
- [SQL Plan](/docs/features/{{featureNumber}}-{{feature_short_name}}/{{featureNumber}}-{{feature_short_name}}.sql-plan.blueprint.md)

## Preconditions

- Use the `/src/server/api` folder with the API resources at those files.


## Implementation plan

<!--
Think about 
- the App pages and components to implement the features
- the domain models needed as input and output for the pages and components.
- the repository methods to retrieve or persist data from the api.
- the shared utility methods to support previous items.
Write the plan to implement them with the following structure:
-->

### Domain layer

Go to the `/src/client/app` folder 

- Analyze existing implementations in similar files:
 - Use them as strict templates for structure and formatting
 - Match naming conventions
 - Follow the `.cursor/rules/type-script.mdc` rules for naming and structuring the files.
- Ensure your code mimics the existing code in the folder.
- Use the server domain models at `/src/server/domain` as templates for the client domain models.


@for(domainModel of domainModels) {
- `{{domainModel.name}}`: {{domainModel.description}}
- [ ] Create if not exists a file called `{{domainModel.name}}.type.ts`
- @for(property of domainModel.properties) {
  - `{{property.name}}`: {{property.description}}
  - [ ] Add or update the property to the `{{domainModel.name}}.type.ts` file.
}
}

### App layer

<!--
This is the App related code.
Uses the domain models and the shared utility methods.
Implement here the pages and components code exclusive for this feature.
-->

Go to the `/src/client/app` folder 

- Analyze existing implementations in similar resources folder like `/src/client/app/about`:
 - Use them as strict templates for structure and formatting
 - Match naming conventions
 - Read and follow the @client-page rules at the `.cursor/rules/client-page.mdc` for implementing the page.

#### Pages

@for(page of pages) {
- `{{page.name}}`: {{page.description}}
- [ ] Create if not exists a folder called `{{page.name}}` under `/src/client/app`
}

#### Repositories

Go to the `/src/client/app/{{page.name}}` folder 

@for(repository of repositories) {
- `{{repository.name}}`: {{repository.description}}
- [ ] Create if not exists a file called `{{repository.name}}.repository.ts`
- [ ] Repositories are not clases, just modules exporting functions
  @for(method of repository.methods) {
  - `{{method.name}}`: {{method.description}}
  - [ ] Add or update the function `{{method.name}}` to the `{{repository.name}}.repository.ts` module file.
  - [ ] Make use of the fetch utils from the `/src/client/shared/fetch.utils.ts` module.
  }
}

#### Page Component

Go to the `/src/client/app/{{page.name}}` folder 

- [ ] Create if not exists a file called `{{component.name}}.page.ts`
  -  Page components are classes extending the `HTMLElement` class
  -  Import the repository or repositories in the page file.
  -  Make use of the repository function methods to retrieve or persist data from the api.
  -  Make use of the client domain models to extract data from the request and create the response objects.
  -  Make use of the shared utility function methods to support previous items.

#### Presentation Components

Go to the `/src/client/app/{{page.name}}` folder 

- [ ] Create if not exists a file called `{{component.name}}.component.ts`
  - Components are classes extending the `HTMLElement` class
  - DO not import the repository or repositories in the component file.
  - Presentation components receive data from the page component and display it.

### Shared layer

<!--
Think about the utility function methods needed for the feature.
List them with a brief description.
No need to generate the function at this point, just list it.
Validation and formatting should go at the `/src/client/domain/` folder; not at the shared layer.
This is only for generic utility functions, not attached to a particular page..
Add any utility function methods needed not covered by the other layers.
-->

Go to the `/src/client/shared` folder 

- Analyze existing implementations in similar files:
 - Use them as strict templates for structure and formatting
 - Match naming conventions
 - Follow the `.cursor/rules/type-script.mdc` rules for naming and structuring the files.

@for(utilsMethod of utilsMethods) {
- `{{utilsMethod.name}}` at `{{utilsModule.name}}`: {{utilsMethod.description}} 
}


## Prompt after plan

Recommended prompt to use this plan:

```text
Follow the `.ai\builder\coder.instructions.md` instructions to implement the app tier plan `{{featureNumber}}-{{feature_short_name}}.app-plan.blueprint.md`
```
