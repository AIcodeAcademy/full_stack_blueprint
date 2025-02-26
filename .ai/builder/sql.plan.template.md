--- 
information: Generate a markdown file documenting the implementation plan of the sql tier for a feature.
important: This is a template for one and only one feature.
guide: Include all this template content in the result file, fill the placeholders with the actual values.
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
- [SQL-JSON rule](/.cursor/rules/sql-json.mdc)
- [Server entity rule](/.cursor/rules/server-entity.mdc)

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

## Plan implementation tasks

### 1. Tasks to generate SQL Commands 

- [ ] Create or update the `/src/sql` folder with the SQL commands
  
@for(table of tables){
- [ ] Create if not exists a file called `{{table.name}}.sql.json`
- [ ] Fill it or update it with the SQL commands, respecting the [SQL-JSON rule](/.cursor/rules/sql-json.mdc)
- [ ] Add the seed data as an array of objects to the `SEED` property if needed
}

### 2. Tasks to generate Domain Entity types

- [ ] Create or update the `/src/server/domain` folder with the domain types
  
@for(table of tables){
- [ ] Create if not exists a file called `{{table.name}}.type.ts`
- [ ] Fill it or update it with the domain types, null value and validation function respecting the [Server entity rule](/.cursor/rules/server-entity.mdc)
} 

### 3. Tasks to generate table utils

Example of desired result:
```typescript
const toolsSql = await readCommands("tools");

export const initializeTables = async (): Promise<void> => {
  // other tables initialization...
  initializeToolsTable();
};

const initializeToolsTable = (): void => {
	drop(toolsSql.TABLE);
	create(toolsSql.CREATE_TABLE);
	seedTools();
};

const seedTools = (): void => {
	for (const tool of toolsSql.SEED) {
		insert<Tool>(toolsSql.INSERT, tool as Raw<Tool>);
	}
};
```

- [ ] Create or update the `/src/server/shared/initialize.utils.ts` file 
@for(table of tables){
- [ ] Read the sql commands for the table at `const {tableName}Sql = await readCommands("{tableName}");`
- [ ] Create if not exists a function called `initialize{{table.name}}Table`
- [ ] Add the seed data function call if needed
- [ ] Add the table initialization call to the `initializeTables` function
}

_End of SQL Plan for {{featureNumber}} - {{feature_short_name}}_
