# SQL Plan for **1 - Add Asset**

## Plan preparation

This plan ensures SQL structure, seeds, commands and entity types for the `1 - Add Asset` feature.

Before implementing the plan, read the preconditions below.

### Read the reference documentation

Reference documentation to be used during implementation:

- [Project System Architecture](/docs/systems.blueprint.md)
- [Project Data model](/docs/data-model.blueprint.md)
- [Feature](/docs/1-add_asset/1-add_asset.blueprint.md)
- [SQL Commands Type](/src/server/shared/sql.type.ts)
- [Initialize Utils](/src/server/shared/initialize.utils.ts)
- [SQL utils](/src/server/shared/sql.utils.ts)
- [TS Rules](/.cursor/rules/type-script.mdc)

### Tables

- `users`: Represents investors using the system with authentication data
- `categories`: Lookup table for asset classifications with properties like risk and liquidity
- `assets`: Main table storing investor assets with category, value, quantity and acquisition date

### Seeds

- `categories`: Needs seed data for initial asset classifications (stocks, bonds, real estate, etc.)

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

- [x] Create or update the `/src/sql` folder with the SQL commands
- [x] Create if not exists a file called `users.sql.json`
- [x] Fill it or update it with the SQL commands
- [x] Create if not exists a file called `categories.sql.json`
- [x] Fill it or update it with the SQL commands
- [x] Add the seed data as an array of objects to the `SEED` property
- [x] Create if not exists a file called `assets.sql.json`
- [x] Fill it or update it with the SQL commands

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

- [x] Create or update the `/src/server/domain` folder with the domain types
- [x] Create if not exists a file called `users.type.ts`
- [x] Fill it or update it with the domain types, null value and validation function
- [x] Create if not exists a file called `categories.type.ts`
- [x] Fill it or update it with the domain types, null value and validation function
- [x] Create if not exists a file called `assets.type.ts`
- [x] Fill it or update it with the domain types, null value and validation function

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
- [x] Create or update the `/src/server/shared/initialize.utils.ts` file 
- [x] Read the sql commands for the table at `const usersSql = await readCommands("users");`
- [x] Create if not exists a function called `initializeUsersTable`
- [x] Add the table initialization call to the `initializeTables` function
- [x] Read the sql commands for the table at `const categoriesSql = await readCommands("categories");`
- [x] Create if not exists a function called `initializeCategoriesTable`
- [x] Add the seed data function call if needed
- [x] Add the table initialization call to the `initializeTables` function
- [x] Read the sql commands for the table at `const assetsSql = await readCommands("assets");`
- [x] Create if not exists a function called `initializeAssetsTable`
- [x] Add the table initialization call to the `initializeTables` function

_End of SQL Plan for 1 - Add Asset_ 