--- 
information: Generate a markdown file documenting the implementation plan of the sql tier for a feature.
important: This is a template for one and only one feature.
commands: think about the commands that are needed to implement the feature.
preconditions: think about the tables or seeds that are needed to implement the feature.
prompt: Follow instructions to generate the SQL plan for Feature X
file_name: {{featureNumber}}-{{feature_short_name}}.sql.plan.md
---

# SQL Plan for **{{featureNumber}} - {{feature_short_name}}**

## Description

Ensures SQL structure, seeds, commands and types for the `{{featureNumber}} - {{feature_short_name}}` feature.

### Prompt after plan

Recommended prompt to use this plan:

```text
Follow the `.ai\builder\builder-implement.instructions.md` instructions to implement the sql tier plan `{{featureNumber}}-{{feature_short_name}}.sql.plan.md`
Read the reference documentation to understand the project and the feature.
Add the @rules to the prompt to be applied during the implementation.
```

## Preconditions

### Reference documentation

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
  @for(item of seed.data) {
  - `{{item}}`
  }
}

### Commands

<!--
For each table, think about the commands that are needed to implement the feature.
Will be implemented as methods in a repository.
Will be used to generate the SQL commands.
List them in camelCase (as it will be the method names), with a brief description.
If the command has parameters, list them as well.
No need to generate the command at this point, just list them.
-->

@for(table of tables) {
For {{table.name}} table:
@for(command of table.commands) {
- `{{command.name}}`: {{command.description}}
  @if(command.parameters) {
    @for(parameter of command.parameters) {
    - `{{parameter.name}}`: {{parameter.description}}
    }
  }
}
}

## Implementation plan

### SQL Commands

Go to the `/src/sql` folder 

1. Each SQL file must strictly implement the SQL type interface:
```typescript
type SQL = {
  TABLE: string;                // Table name for drop/create operations
  CREATE_TABLE: string;         // Create table SQL command
  SELECT_ALL: string;          // Select all records
  SELECT_BY_ID: string;        // Select by primary key
  SELECT_BY_FIELD: string;     // Select by any field
  SELECT_BY_QUERY: string;     // Select by custom query
  SELECT_BY_USER_ID: string;   // Select by user relationship
  INSERT: string;              // Insert record
  UPDATE: string;              // Update record
  DELETE: string;              // Delete record
  SEED: unknown[];            // Initial data if needed
};
```

2. Parameter naming in SQL commands:
   - Use `$field` and `$value` for dynamic field queries
   - Use `$id` for primary key
   - Use `$user_id` for user relationships
   - Prefix all parameters with `$`

3. Study `tools.sql.json` as the reference implementation

@for(table of tables){
- [ ] Create if not exists a file called `{{table.name}}.sql.json`
- [ ] Fill it or update it with the SQL commands
- [ ] Add the seed data as an array of objects to the `SEED` property if needed
}

### Domain types

Go to the `/src/server/domain` folder 

@for(table of tables){
- [ ] Create if not exists a file called `{{table.name}}.type.ts`
- [ ] Fill it or update it with the domain types
}

### Initialize utils

Go to the `/src/server/shared/initialize.utils.ts` file 

1. Each table must have:
```typescript
const initialize{Table}Table = (): number => {
  drop({table}SQL.TABLE);
  const result = create({table}SQL.CREATE_TABLE);
  return result;
};

// If seeding needed:
const seed{Table} = (): number => {
  let results = 0;
  for (const item of {table}SQL.SEED) {
    results += insert({table}SQL.INSERT, item);
  }
  return results;
};
```

2. Add initialization to the main function:
```typescript
export async function initializeTables(): Promise<void> {
  // ... existing
  initialize{Table}Table();
  // ... 
}
```

3. Use only the functions from sql.utils:
   - `drop()`
   - `create()`
   - `insert()`
   - No direct SQL execution

@for(table of tables){
- [ ] Create if not exists a function called `initialize{{table.name}}Table`
- [ ] Add the seed data function call if needed
}

_End of SQL Plan for {{featureNumber}} - {{feature_short_name}}_
