---
information: Generate a markdown file documenting the implementation plan of the api tier for a feature.
important: This is a template for one and only one feature.
file_name: {{featureNumber}}-{{feature_short_name}}.api-plan.blueprint.md
---

# API Plan for **{{featureNumber}} - {{feature_short_name}}**

## Description

The API implementation plan for the `{{featureNumber}} - {{feature_short_name}}` feature. 

Reference documentation to be used during implementation:

- [Project System Architecture](/docs/architecture/system-architecture.blueprint.md)
- [Project Data model](/docs/architecture/data-model.blueprint.md)
- [Feature](/docs/features/{{featureNumber}}-{{feature_short_name}}/{{featureNumber}}-{{feature_short_name}}.blueprint.md)
- [SQL Plan](/docs/features/{{featureNumber}}-{{feature_short_name}}/{{featureNumber}}-{{feature_short_name}}.sql-plan.blueprint.md)

## Preconditions

- Use the `/src/sql` folder with the SQL commands at those JSON files.

<!--
Think about the resources needed to implement the feature; usually just one.
List them in camel case, with a brief description.
No need to generate the resource at this point, just list it.
Think about the endpoints needed of each resource.
List them with the HTTP method with a brief description.
No need to generate the endpoint at this point, just list it.
-->

@for(resource of resources) {
- `{{resource.name}}`: {{resource.description}} at {{resource.http_path}}
- @for(endpoint of resource.endpoints) {
- `{{endpoint.HTTP_METHOD}} {{endpoint.name}}`: {{endpoint.description}}
  }
}

## Implementation plan

<!--
Think about 
- the API resources 
- the controller methods to handle the API requests and responses.
- the domain dto models needed as input and output for the endpoints.
- the repository methods to retrieve or persist data from the database.
- the shared utility methods to support previous items.
Write the plan to implement them with the following structure:
-->

### Domain layer

Go to the `/src/server/domain` folder 

- Analyze existing implementations in similar files:
 - Use them as strict templates for structure and formatting
 - Match naming conventions
 - Follow the `.cursor/rules/type-script.mdc` rules for naming and structuring the files.
 - Ensure your code mimics the existing code in the folder.
- Ensure the current db types are ok.
- Create the domain DTO types needed for the feature. 
  - Post DTOs have no ID property.
  - Put DTOs have ID property.

@for(domainModel of domainDtoModels) {
- `{{domainModel.name}}`: {{domainModel.description}}
- [ ] Create if not exists a file called `{{domainModel.name}}-dto.type.ts`
- @for(property of domainModel.properties) {
  - `{{property.name}}`: {{property.description}}
  - [ ] Add or update the property to the `{{domainModel.name}}-dto.type.ts` file.
}
}

- [ ] Add validations for the DTO models at the `/src/server/domain/validation.utils.ts` file. Make new code mimic the existing code in the file.

### API layer

<!--
This is the API related code.
Uses the domain DTOs and the shared utility methods.
Implement here the controller and repository code exclusive for this feature.
-->

Go to the `/src/server/api` folder 

- Analyze existing implementations in similar resources folder like `/src/server/api/tools`:
 - Use them as strict templates for structure and formatting
 - Match naming conventions
 - Read and follow the @server-resource rules at the `.cursor/rules/server-resource.mdc` for implementing the resource.
 - Particularly see the `src/server/api/tools` folder as an example

#### Resources

@for(resource of resources) {
- `{{resource.name}}`: {{resource.description}}
- [ ] Create if not exists a folder called `{{resource.name}}` under `/src/server/api`
}

#### Repositories

Go to the `/src/server/api/{{resource.name}}` folder 

- Particularly see the `src/server/api/tools/tools.repository.ts` file as an example

@for(repository of repositories) {
- `{{repository.name}}`: {{repository.description}}
- [ ] Create if not exists a file called `{{repository.name}}.repository.ts`
- [ ] Repositories are not clases, just modules exporting functions
- [ ] Every resource has its own repositories (Usually just one) 
  @for(method of repository.methods) {
  - `{{method.name}}`: {{method.description}}
  - [ ] Add or update the function `{{method.name}}` to the `{{repository.name}}.repository.ts` module file.
  - [ ] Make use of the SQL commands from the `/src/sql` folder.
  }
}

#### The Controller module

Go to the `/src/server/api/{{resource.name}}` folder 

- Particularly see the `src/server/api/tools/tools.controller.ts` file as an example

- [ ] Create if not exists a file called `{{resource.name}}.controller.ts`
  - Controller is a module with exported functions to handle the API requests and responses.
  - Import the repository or repositories in the controller file.
  - Make use of the repository function methods to retrieve or persist data from the database.
  - Make use of the domain models to extract data from the request and create the response objects.
  - Make use of the shared utility function methods to support previous items.
- [ ] Add the controller to the main `/src/server/api/api.controller.ts` api controller function.

### Shared layer

<!--
Think about the utility function methods needed for the feature.
List them with a brief description.
No need to generate the function at this point, just list it.
Validation and formatting should go at the `/src/server/domain/` folder; not at the shared layer.
This is only for generic utility functions, not attached to a particular resource.
Add any utility function methods needed not covered by the other layers.
-->

Go to the `/src/server/shared` folder 

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
Follow the `.ai\builder\coder.instructions.md` instructions to implement the api tier plan `{{featureNumber}}-{{feature_short_name}}.api-plan.blueprint.md`
Add the @rules to the prompt.
```
