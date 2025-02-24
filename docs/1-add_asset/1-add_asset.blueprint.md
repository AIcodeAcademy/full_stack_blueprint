# Feature 1 - **Add Asset**

## Description

Enables an authenticated investor to add a new asset by specifying its category, value, quantity, and acquisition date. The system captures and persists the asset details in the investor's portfolio for streamlined asset management.

## Involved Data Models

The following data models play a role in this feature:

- **User**: Represents an investor using the system.
- **Asset**: Represents the investment asset with attributes such as category_id, value, quantity, and acquisition_date.
- **Category**: Represents the classification for assets based on properties like risk and liquidity.

## Acceptance Criteria (in Gherkin Syntax)

```gherkin
Feature: Add Asset
  As an authenticated investor
  I want to add a new asset
  So that I can effectively manage my investment portfolio

  Scenario: Successfully adding a new asset
    Given an authenticated user on the asset creation page
    When the user submits valid asset information including category, value, quantity, and acquisition date
    Then the asset is added to the investor's portfolio
```

## Additional Information

- **Dependencies**: JWT authentication must be enabled. Backend validations should be in place to ensure the asset record is created successfully.
- **Preconditions**: The user must be authenticated, and the asset creation page must be accessible with a valid asset category available for selection.
- **Notes**: Ensure proper error handling for invalid or incomplete submissions and verify that the asset data is persistently stored in the SQLite database.
- **UI**: The asset creation page will at route `/assets/add` with anchor links from home page and nav bar.

_End of Feature Documentation for Add Asset_
