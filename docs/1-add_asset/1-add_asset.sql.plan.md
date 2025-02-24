--- 
information: Generate a markdown file documenting the implementation plan of the sql tier for a feature.
important: This is a template for one and only one feature.
guide: Include all this template content in the result, fill the placeholders with the actual values.
file_name: 1-add_asset.sql.plan.md
---

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
- [TS Rules](/.cursor/rules/type-script.mdc)

### Tables

- `asset`: Stores asset details, including the asset category (as categoryId), monetary value, quantity, acquisition date, and the association to the authenticated user.

### Seeds

None required for the asset table. (New assets are inserted via user actions through the feature interface.)

## Implementation plan

### 1. Generate SQL Commands tasks

#### Tasks

- Create or update the `/src/sql` folder with the SQL commands.
- Create, if it does not exist, a file named `asset.sql.json`.
- Fill or update it with the following SQL commands conforming to the SQL type interface:
  - TABLE: Name of the asset table.
  - CREATE_TABLE: SQL command to create the asset table with appropriate fields and constraints.
  - SELECT_ALL: SQL command to select all assets.
  - SELECT_BY_ID: SQL command to select an asset by its primary key using `$id`.
  - SELECT_BY_FIELD: SQL command to select assets by any field using `$field` and `$value`.
  - SELECT_BY_QUERY: SQL command for custom queries.
  - SELECT_BY_USER_ID: SQL command to select assets based on the authenticated user's `$user_id`.
  - INSERT: SQL command to insert a new asset, utilizing parameters like `$categoryId`, `$value`, `$quantity`, `$acquisitionDate`, and `$user_id`.
  - UPDATE: SQL command to update an asset record.
  - DELETE: SQL command to delete an asset record.
  - SEED: An empty array or a set of predefined seed objects if needed.
- Ensure that all dynamic parameters in the SQL commands are prefixed with `$`.

### 2. Generate Domain types tasks

#### Tasks

- Create or update the `/src/server/domain` folder with the domain types.
- Create, if it does not exist, a file named `asset.type.ts`.
- In this file, export the following:
  - A TypeScript type called `Asset` representing the asset data structure.
  - A constant `NULL_ASSET` representing the null/default state of an asset.
  - A function `validate` that accepts a raw object of type `Raw<Asset>` and performs validation, throwing an `AppError` if validations fail.
- Import the necessary modules:
  - `import { AppError } from "../shared/app-error.class";`
  - `import type { Raw } from "../shared/sql.type";`
- Follow `/src/server/domain/tools.type.ts` for guidance on structuring the domain types.

### 3. Generate table utils tasks

#### Tasks

- Create or update the `/src/server/shared/initialize.utils.ts` file to include asset table initialization.
- Add the following tasks:
  - Read the SQL commands for the asset table: e.g. `const assetSql = await readCommands("asset");`
  - Create a function `initializeAssetTable` that:
    - Calls a `drop` function with `assetSql.TABLE`.
    - Calls a `create` function with `assetSql.CREATE_TABLE`.
    - If seed data exists in `assetSql.SEED`, iterates through each entry and calls an `insert` function with `assetSql.INSERT` and the seed item.
  - Ensure that the initialization call for the asset table is added to the `initializeTables` function so that the asset table is set up during system initialization.

_End of SQL Plan for 1 - add_asset_ 