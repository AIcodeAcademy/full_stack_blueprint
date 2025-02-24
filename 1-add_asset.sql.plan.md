# SQL Plan for **1 - Add Asset**

## Plan preparation

Ensures SQL structure, seeds, commands and entity types for the `1 - Add Asset` feature.

Read and follow the preconditions before implementing the plan.

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

- `categories`: Lookup table for asset classifications with properties like risk and liquidity
- `assets`: Main table storing investor assets with category, value, quantity and acquisition date

### Seeds

- `categories`: Needs seed data for initial asset classifications (stocks, bonds, real estate, etc.)

## Implementation plan

### 1. Generate SQL Commands tasks

- [ ] Create or update the `/src/sql` folder with the SQL commands
- [ ] Create if not exists a file called `categories.sql.json`
- [ ] Fill it or update it with the SQL commands
- [ ] Add the seed data as an array of objects to the `SEED` property if needed
- [ ] Create if not exists a file called `assets.sql.json`
- [ ] Fill it or update it with the SQL commands

### 2. Generate Domain types tasks

- [ ] Create or update the `/src/server/domain` folder with the domain types
- [ ] Create if not exists a file called `categories.type.ts`
- [ ] Fill it or update it with the domain types, null value and validation function
- [ ] Create if not exists a file called `assets.type.ts`
- [ ] Fill it or update it with the domain types, null value and validation function

### 3. Generate table utils tasks

- [ ] Create or update the `/src/server/shared/initialize.utils.ts` file 
- [ ] Read the sql commands for the table at `const categoriesSql = await readCommands("categories");`
- [ ] Create if not exists a function called `initializeCategoriesTable`
- [ ] Add the seed data function call if needed
- [ ] Add the table initialization call to the `initializeTables` function
- [ ] Read the sql commands for the table at `const assetsSql = await readCommands("assets");`
- [ ] Create if not exists a function called `initializeAssetsTable`
- [ ] Add the table initialization call to the `initializeTables` function

_End of SQL Plan for 1 - Add Asset_ 