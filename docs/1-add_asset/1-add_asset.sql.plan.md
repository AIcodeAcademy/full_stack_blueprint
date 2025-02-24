--- 
information: Generate a markdown file documenting the implementation plan of the sql tier for a feature.
important: This is a template for one and only one feature.
file_name: 1-add_asset.sql.plan.md
---

# SQL Plan for **1 - add_asset**

## Description

Ensures SQL structure, seeds, commands, and entity types for the `1 - add_asset` feature. This plan covers the necessary SQL files, domain type definitions, and table initialization functions to support asset creation by investors.

### Prompt after plan

This is the recommended prompt to use this plan after it is generated:

```text
Follow the instructions at ".ai\builder\builder-implement.instructions.md" to implement the sql tier plan at `1-add_asset.sql.plan.md`
Add the **rules** @rules to the prompt to be applied during the implementation.
```

### Read the reference documentation

- [Project System Architecture](/docs/systems.blueprint.md)
- [Project Data model](/docs/data-model.blueprint.md)
- [Feature](/docs/1-add_asset/1-add_asset.blueprint.md)
- [SQL Commands Type](/src/server/shared/sql.type.ts)
- [Initialize Utils](/src/server/shared/initialize.utils.ts)
- [SQL utils](/src/server/shared/sql.utils.ts)
- [TS Rules](/.cursor/rules/type-script.mdc)

### Tables

- `asset`: Stores each investment asset added by a user, including fields such as category_id, value, quantity, acquisition_date, and user_id to map the asset to its owner.
- `category`: Holds asset categories (e.g., stocks, bonds, real estate) with properties like risk and liquidity. This table is crucial for providing valid category selections during asset creation.

### Seeds

- `category`: Needs seed data for default asset categories to ensure valid selections for asset creation.

## Implementation plan

### 1. Generate SQL Commands tasks

- [ ] Create or update `/src/sql/asset.sql.json` with SQL commands following the SQL type interface. This should include commands for dropping/creating the table, as well as SELECT_ALL, SELECT_BY_ID, SELECT_BY_FIELD, SELECT_BY_QUERY, SELECT_BY_USER_ID, INSERT, UPDATE, DELETE. No seed data is required for `asset`.
- [ ] Create or update `/src/sql/category.sql.json` with similar SQL commands and include seed data in the `SEED` property for default asset categories.
- Ensure parameter naming conventions use `$field`, `$value`, `$id`, and `$user_id` for dynamic queries.

### 2. Generate Domain types tasks

- [ ] Create or update `/src/server/domain/asset.type.ts` to export a type `asset`, a `NULL_TABLE` value constant, and a `validate` function for asset records. Import necessary utilities such as `AppError` and `Raw` from shared modules.
- [ ] Create or update `/src/server/domain/category.type.ts` for the `category` domain type with similar structure.
- Follow the reference implementation in `/src/server/domain/tools.type.ts` for guidance on formatting and validation.

### 3. Generate table utils tasks

- [ ] Update `/src/server/shared/initialize.utils.ts` to include initialization functions for the new tables:
  - Implement an `initializeAssetTable` function that drops and creates the `asset` table, and performs any necessary operations (seeding is not needed for asset).
  - Implement an `initializeCategoryTable` function that drops, creates, and seeds the `category` table.
- [ ] Ensure these functions are called in the overall `initializeTables` function to guarantee proper table setup during application initialization.

_End of SQL Plan for 1 - add_asset_ 