--- 
information: Generate a markdown file documenting the implementation plan of the sql tier for a feature.
important: This is a template for one and only one feature.
guide: Include all this template content in the result, fill the placeholders with the actual values.
file_name: {{featureNumber}}-{{feature_short_name}}.sql.plan.md
---

# SQL Plan for **{{featureNumber}} - {{feature_short_name}}**

## Plan preparation

This plan ensures SQL structure, seeds, commands and entity types for the `{{featureNumber}} - {{feature_short_name}}` feature.

Before implementing the plan, read the preconditions below.

### Read the reference documentation

Reference documentation to be used during implementation:

- [Project System Architecture](/docs/systems.blueprint.md)
- [Project Data model](/docs/data-model.blueprint.md)
- [Feature](/docs/{{featureNumber}}-{{feature_short_name}}/{{featureNumber}}-{{feature_short_name}}.blueprint.md)
- [SQL Commands Type](/src/server/shared/sql.type.ts)
- [Initialize Utils](/src/server/shared/initialize.utils.ts)
- [SQL utils](/src/server/shared/sql.utils.ts)
- [TS Rules](/.cursor/rules/type-script.mdc)

### Tables

<!--
Think about the tables needed to implement the feature.
List them in camel case, with a brief description.
No need to generate tasks for the tables at this point, just list them.
-->

@for(table of tables) {
- `{{table.name}}`: {{table.description}}
}


### Seeds

<!--
Some tables must have seed data to be able to use the feature.
Is data that predefined in the database to be able to test the feature.
Think about the seeds needed to implement the feature.
List tables  that needs seed data, in camel case, with a brief description.
No need to generate the seed at this point, just list them.
-->

@for(table of tablesWithSeeds) {
- `{{table.name}}`: Needs seed data for {{reason}}
}

## Implementation plan

### 1. Generate SQL Commands tasks

#### Instructions and references

- You must generate the SQL commands for each table.
- Each SQL file must strictly implement the SQL type interface:
```typescript
type SQL = {
  TABLE: string;               // Table name for drop/create operations
  CREATE_TABLE: string;        // Create table SQL command
  SELECT_ALL: string;          // Select all records
  SELECT_BY_ID: string;        // Select by primary key
  SELECT_BY_FIELD: string;     // Select by any field
  SELECT_BY_QUERY: string;     // Select by custom query
  SELECT_BY_USER_ID: string;   // Select by user relationship
  INSERT: string;              // Insert record
  UPDATE: string;              // Update record
  DELETE: string;              // Delete record
  SEED: unknown[];             // Initial data if needed
};
```
- Parameter naming in SQL commands:
   - Use `$field` and `$value` for dynamic field queries
   - Use `$id` for primary key
   - Use `$user_id` for user relationships
   - Prefix all parameters with `$`
- Study `tools.sql.json` as the reference implementation

#### Tasks

- [ ] Create or update the `/src/sql` folder with the SQL commands
@for(table of tables){
- [ ] Create if not exists a file called `{{table.name}}.sql.json`
- [ ] Fill it or update it with the SQL commands
- [ ] Add the seed data as an array of objects to the `SEED` property if needed
}

### 2. Generate Domain types tasks

#### Instructions and references
- You must generate the domain types for each table.
- Import
  - `import { AppError } from "../shared/app-error.class";`
  - `import type { Raw } from "../shared/sql.type";`
- Export 
  - a type called `{{table.name}}`, 
  - a `NULL_TABLE` value constant, 
  - a `validate(table: Raw<{{table.name}}>)` function.
- Study `/src/server/domain/tools.type.ts` as the reference implementation

#### Tasks

- [ ] Create or update the `/src/server/domain` folder with the domain types
@for(table of tables){
- [ ] Create if not exists a file called `{{table.name}}.type.ts`
- [ ] Fill it or update it with the domain types, null value and validation function
}

### 3. Generate table utils tasks

#### Instructions and references

- You must generate the initialize utils for each table.
- It is done in the `initializeTables` function at `/src/server/shared/initialize.utils.ts` file.
- Study `initializeToolsTable` function as the reference implementation

Example:
```typescript
const {tableName}SQL = await readCommands("{tableName}");
const initialize{TableName}Table = (): void => {
  drop({tableName}SQL.TABLE);
  create({tableName}SQL.CREATE_TABLE);
  seed{TableName}();
};
// If seeding needed:
const seed{TableName} = (): void => {
  for (const item of {tableName}SQL.SEED) {
    insert({tableName}SQL.INSERT, item);
  }
};
```

#### Tasks
- [ ] Create or update the `/src/server/shared/initialize.utils.ts` file 
@for(table of tables){
- [ ] Read the sql commands for the table at `const {tableName}Sql = await readCommands("{tableName}");`
- [ ] Create if not exists a function called `initialize{{table.name}}Table`
- [ ] Add the seed data function call if needed
- [ ] Add the table initialization call to the `initializeTables` function
}

_End of SQL Plan for {{featureNumber}} - {{feature_short_name}}_
