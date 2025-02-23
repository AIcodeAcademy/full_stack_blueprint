# SQL Plan for **1 - Add Asset**

## Description

Ensures SQL structure, seeds, commands and types for the `1 - Add Asset` feature.

### Prompt after plan

Recommended prompt to use this plan:

```text
Follow the `.ai\builder\builder-implement.instructions.md` instructions to implement the sql tier plan `1-add_asset.sql.plan.md`
Read the reference documentation to understand the project and the feature.
Add the @rules to the prompt to be applied during the implementation.
```

## Preconditions

### Reference documentation

Reference documentation to be used during implementation:

- [Project System Architecture](/docs/systems.blueprint.md)
- [Project Data model](/docs/data-model.blueprint.md)
- [Feature](/docs/1-add_asset/1-add_asset.blueprint.md)
- [SQL Commands Type](/src/server/shared/sql.type.ts)
- [Initialize Utils](/src/server/shared/initialize.utils.ts)
- [SQL utils](/src/server/shared/sql.utils.ts)
- [TS Rules](/.cursor/rules/type-script.mdc)

### Tables

- `category`: Represents asset categories with properties like risk level and liquidity
- `asset`: Represents investment assets with category, value, quantity and acquisition date
- `user`: Represents system users who own assets

### Seeds

- `category`: Predefined asset categories for classification
  - `Stock`
  - `Bond` 
  - `RealEstate`
  - `Cryptocurrency`
  - `Cash`

### Commands

For category table:
- `getAllCategories`: Retrieves all available asset categories
- `getCategoryById`: Gets a specific category by its ID
  - `id`: Unique identifier of the category

For asset table:
- `createAsset`: Creates a new asset record
  - `userId`: ID of the asset owner
  - `categoryId`: ID of the asset category
  - `value`: Monetary value of the asset
  - `quantity`: Number of units
  - `acquisitionDate`: Date when asset was acquired
- `getAssetsByUserId`: Retrieves all assets for a specific user
  - `userId`: ID of the asset owner
- `getAssetById`: Gets a specific asset by its ID
  - `id`: Unique identifier of the asset

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

- [ ] Create if not exists a file called `category.sql.json`
- [ ] Fill it or update it with the SQL commands
- [ ] Add the seed data as an array of objects to the `SEED` property

- [ ] Create if not exists a file called `asset.sql.json`
- [ ] Fill it or update it with the SQL commands

### Domain types

Go to the `/src/server/domain` folder 

- [ ] Create if not exists a file called `category.type.ts`
- [ ] Fill it or update it with the domain types

- [ ] Create if not exists a file called `asset.type.ts`
- [ ] Fill it or update it with the domain types

### Initialize utils

Go to the `/src/server/shared/initialize.utils.ts` file 

1. Each table must have:
```typescript
const initializeCategoryTable = (): number => {
  drop(categorySQL.TABLE);
  const result = create(categorySQL.CREATE_TABLE);
  return result;
};

const seedCategory = (): number => {
  let results = 0;
  for (const item of categorySQL.SEED) {
    results += insert(categorySQL.INSERT, item);
  }
  return results;
};
```

2. Add initialization to the main function:
```typescript
export async function initializeTables(): Promise<void> {
  // ... existing
  initializeCategoryTable();
  initializeAssetTable();
  // ... 
}
```

3. Use only the functions from sql.utils:
   - `drop()`
   - `create()`
   - `insert()`
   - No direct SQL execution

- [ ] Create if not exists a function called `initializeCategoryTable`
- [ ] Add the seed data function call
- [ ] Create if not exists a function called `initializeAssetTable`

_End of SQL Plan for 1 - Add Asset_ 