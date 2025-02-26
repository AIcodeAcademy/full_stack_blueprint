# SQL Plan for **1 - add_asset**

## Plan preparation

This plan ensures SQL structure, seeds, commands and entity types for the `1 - add_asset` feature.

Before implementing the plan, read the preconditions below.

### Read the reference documentation

Reference documentation to be used during implementation:

- [Project System Architecture](/docs/systems.blueprint.md)
- [Project Data model](/docs/data-model.blueprint.md)
- [Feature](/docs/1-add_asset/1-add_asset.blueprint.md)
- [SQL Commands Type](/src/server/shared/sql.type.ts)
- [Initialize Utils](/src/server/shared/initialize.utils.ts)
- [SQL utils](/src/server/shared/sql.utils.ts)
- [SQL-JSON rule](/.cursor/rules/sql-json.mdc)
- [Server entity rule](/.cursor/rules/server-entity.mdc)

### Tables

- `users`: Represents an investor using the system.
- `assets`: Represents the investment asset with attributes such as category_id, value, quantity, and acquisition_date.
- `categories`: Represents the classification for assets based on properties like risk and liquidity.


### Seeds

- `categories`: Needs seed data for predefined categories that investors can select from when adding assets.

## Plan implementation tasks

### 1. Tasks to generate SQL Commands 

- [x] Create or update the `/src/sql` folder with the SQL commands
  
- [x] Create if not exists a file called `users.sql.json`
- [x] Fill it or update it with the SQL commands, respecting the [SQL-JSON rule](/.cursor/rules/sql-json.mdc)
- [x] Add the seed data as an array of objects to the `SEED` property if needed

- [x] Create if not exists a file called `assets.sql.json`
- [x] Fill it or update it with the SQL commands, respecting the [SQL-JSON rule](/.cursor/rules/sql-json.mdc)
- [x] Add the seed data as an array of objects to the `SEED` property if needed

- [x] Create if not exists a file called `categories.sql.json`
- [x] Fill it or update it with the SQL commands, respecting the [SQL-JSON rule](/.cursor/rules/sql-json.mdc)
- [x] Add the seed data as an array of objects to the `SEED` property if needed

### 2. Tasks to generate Domain Entity types

- [x] Create or update the `/src/server/domain` folder with the domain types
  
- [x] Create if not exists a file called `users.type.ts`
- [x] Fill it or update it with the domain types, null value and validation function respecting the [Server entity rule](/.cursor/rules/server-entity.mdc)

- [x] Create if not exists a file called `assets.type.ts`
- [x] Fill it or update it with the domain types, null value and validation function respecting the [Server entity rule](/.cursor/rules/server-entity.mdc)

- [x] Create if not exists a file called `categories.type.ts`
- [x] Fill it or update it with the domain types, null value and validation function respecting the [Server entity rule](/.cursor/rules/server-entity.mdc)

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

- [x] Create or update the `/src/server/shared/initialize.utils.ts` file 

- [x] Read the sql commands for the table at `const usersSql = await readCommands("users");`
- [x] Create if not exists a function called `initializeUsersTable`
- [x] Add the seed data function call if needed
- [x] Add the table initialization call to the `initializeTables` function

- [x] Read the sql commands for the table at `const assetsSql = await readCommands("assets");`
- [x] Create if not exists a function called `initializeAssetsTable`
- [x] Add the seed data function call if needed
- [x] Add the table initialization call to the `initializeTables` function

- [x] Read the sql commands for the table at `const categoriesSql = await readCommands("categories");`
- [x] Create if not exists a function called `initializeCategoriesTable`
- [x] Add the seed data function call if needed
- [x] Add the table initialization call to the `initializeTables` function

_End of SQL Plan for 1 - add_asset_ 