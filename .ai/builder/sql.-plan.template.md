--- 
information: Generate a markdown file documenting the implementation plan of the sql tier for a feature.
important: This is a template for one and only one feature.
commands: think about the commands that are needed to implement the feature.
preconditions: think about the tables or seeds that are needed to implement the feature.
file_name: {{featureNumber}}-{{feature_short_name}}.sql-plan.blueprint.md
---

# SQL Plan for **{{featureNumber}} - {{feature_short_name}}**

## Description

Ensures SQL structure and commands for the `{{featureNumber}} - {{feature_short_name}}` feature.
Reference documentation to be used during implementation:

- [Project System Architecture](/docs/architecture/system-architecture.blueprint.md)
- [Project Data model](/docs/architecture/data-model.blueprint.md)
- [Feature](/docs/features/{{featureNumber}}-{{feature_short_name}}/{{featureNumber}}-{{feature_short_name}}.blueprint.md)

## Preconditions

<!--
Think about the tables needed to implement the feature.
List them in camel case, with a brief description.
No need to generate the table at this point, just list them.
-->

@for(table of tables) {
- `{{table.name}}`: {{table.description}}
}

### Seeds

<!--
Some tables must have seed data to be able to use the feature.
Is data that predefined in the database to be able to test the feature.
Think about the seeds needed to implement the feature.
List them in camel case, with a brief description.
No need to generate the seed at this point, just list them.
-->

@for(seed of seeds) {
- `{{seed.name}}`: {{seed.description}}
}

## Commands

<!--
Think about the commands that are needed to implement the feature.
Will be implemented as methods in a repository.
Will be used to generate the SQL commands.
List them in camelCase (as it will be the method names), with a brief description.
If the command has parameters, list them as well.
No need to generate the command at this point, just list them.
-->

@for(command of commands) {
- `{{command.name}}`: {{command.description}}
  @if(command.parameters) {
    @for(parameter of command.parameters) {
    - `{{parameter.name}}`: {{parameter.description}}
    }
  }
}

## Implementation plan

<!--
This project relies on a json file to store the SQL commands for each table.
Those json files are located at `/src/sql` folder.
Can be used with a real database or in memory by the api code.
The JSON properties will in UPPER_CASE to be used as constants later in code.
Use the `tools.sql.json`, `users.sql.json` and other files at `/src/sql` as examples.
-->

Go to the `/src/sql` folder 

- Analyze existing implementations in similar files:
 - Use them as strict templates for structure and formatting
 - Match parameter naming conventions (e.g., $-prefixed parameters)
 - Follow the same JSON schema and field organization
 - Use the same SQL commands and parameters

@for(table of tables){
- [ ] Create if not exists a file called `{table.name}.sql.json`.
- [ ] Fill it or update it with the SQL commands needed for this feature.
- [ ] Add the seed data as an array of objects to the `SEED_{table.name}` property if needed.
}

_End of SQL Plan for {{featureNumber}} - {{feature_short_name}}_
