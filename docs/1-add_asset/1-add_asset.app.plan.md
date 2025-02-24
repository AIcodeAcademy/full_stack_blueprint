# App Plan for **1 - Add Asset**

## Plan preparation

This plan ensures client-side structure, components, and types for the `1 - Add Asset` feature.

Before implementing the plan, read the preconditions below.

### Read the reference documentation

Reference documentation to be used during implementation:

- [Project System Architecture](/docs/systems.blueprint.md)
- [Project Data model](/docs/data-model.blueprint.md)
- [Feature](/docs/1-add_asset/1-add_asset.blueprint.md)
- [DOM Utils](/src/client/shared/dom.utils.ts)
- [Fetch Utils](/src/client/shared/fetch.utils.ts)
- [Navigation Utils](/src/client/shared/navigation.utils.ts)
- [Format Utils](/src/client/shared/format.utils.ts)
- [Web Rules](/.cursor/rules/web.mdc)
- [Client Page Rules](/.cursor/rules/client-page.mdc)
- [TypeScript Rules](/.cursor/rules/type-script.mdc)

### Domain Types

#### Asset.type.ts
```typescript
export type Asset = {
  id: string; // Unique identifier for the asset
  category_id: string; // Reference to the category
  value: number; // Monetary value of the asset
  quantity: number; // Number of units
  acquisition_date: string; // ISO date string
  user_id: string; // Owner of the asset
};

export const NULL_ASSET = {
  id: '',
  category_id: '',
  value: 0,
  quantity: 0,
  acquisition_date: new Date().toISOString(),
  user_id: ''
};

export const validateAsset = (data: Partial<Asset>): boolean => {
  // Category must be selected
  if (!data.category_id?.trim()) return false;
  // Value must be positive number
  if (typeof data.value !== 'number' || data.value <= 0) return false;
  // Quantity must be positive integer
  if (typeof data.quantity !== 'number' || data.quantity <= 0 || !Number.isInteger(data.quantity)) return false;
  // Acquisition date must be valid ISO date
  if (!data.acquisition_date?.trim() || isNaN(Date.parse(data.acquisition_date))) return false;
  return true;
};
```

#### Category.type.ts
```typescript
export type Category = {
  id: string; // Unique identifier for the category
  name: string; // Display name
  risk_level: 'LOW' | 'MEDIUM' | 'HIGH'; // Risk classification
  liquidity: 'LOW' | 'MEDIUM' | 'HIGH'; // Liquidity classification
};

export const NULL_CATEGORY = {
  id: '',
  name: '',
  risk_level: 'LOW' as const,
  liquidity: 'LOW' as const
};
```

### Pages

- add-asset-page: Main page component for asset creation at route `/assets/add`, manages form state and handles asset submission

Example of the page implementation:
```typescript
const html = String.raw;

export class AddAssetPage extends HTMLElement {
  // Route: #/assets/add
  // Parent: router-outlet
  
  #state = {
    asset: NULL_ASSET, // Current asset form data
    categories: [] as Category[], // Available categories
    loading: false, // Loading state for API calls
    error: null as string | null // Error message if any
  };

  #template = html`
    <div class="add-asset-page">
      <h1>Add New Asset</h1>
      <asset-form-component
        .categories="${this.#state.categories}"
        @submit="${this.#handleSubmit}"
      ></asset-form-component>
      ${this.#state.error ? html`<div class="error">${this.#state.error}</div>` : ''}
    </div>
  `;

  constructor() {
    super();
    this.innerHTML = this.#template;
  }

  async connectedCallback() {
    this.#state.loading = true;
    const result = await getCategories();
    if (result.ok) {
      this.#state.categories = result.data;
    } else {
      this.#state.error = result.error;
    }
    this.#state.loading = false;
    this.#render();
  }

  #handleSubmit = async (event: CustomEvent<Asset>) => {
    this.#state.loading = true;
    const result = await createAsset(event.detail);
    if (result.ok) {
      navigate('/assets');
    } else {
      this.#state.error = result.error;
      this.#render();
    }
    this.#state.loading = false;
  };

  #render() {
    this.innerHTML = this.#template;
  }
}
```

### Components

- asset-form-component: Form component that coordinates all inputs and handles validation
- category-selector-component: Dropdown component for selecting asset categories with risk and liquidity indicators
- value-input-component: Numeric input with currency formatting and validation
- quantity-input-component: Integer input with validation and increment/decrement controls
- date-picker-component: Date input with calendar popup and ISO date handling

Example of a component implementation:
```typescript
const html = String.raw;

export class AssetFormComponent extends HTMLElement {
  // Parent: add-asset-page
  
  static get observedAttributes() {
    return ['categories'];
  }
  
  #categories: Category[] = []; // List of available categories
  #currentAsset = NULL_ASSET; // Current form data
  #errors: Partial<Record<keyof Asset, string>> = {}; // Validation errors

  #submitEvent = new CustomEvent('submit', {
    bubbles: true,
    composed: true,
    detail: this.#currentAsset
  });

  #template = html`
    <form class="asset-form" @submit="${this.#handleSubmit}">
      <category-selector-component
        .categories="${this.#categories}"
        @change="${this.#handleCategoryChange}"
        error="${this.#errors.category_id}"
      ></category-selector-component>

      <value-input-component
        .value="${this.#currentAsset.value}"
        @change="${this.#handleValueChange}"
        error="${this.#errors.value}"
      ></value-input-component>

      <quantity-input-component
        .value="${this.#currentAsset.quantity}"
        @change="${this.#handleQuantityChange}"
        error="${this.#errors.quantity}"
      ></quantity-input-component>

      <date-picker-component
        .value="${this.#currentAsset.acquisition_date}"
        @change="${this.#handleDateChange}"
        error="${this.#errors.acquisition_date}"
      ></date-picker-component>

      <button type="submit" ?disabled="${!this.#isValid()}">Add Asset</button>
    </form>
  `;

  constructor() {
    super();
    this.innerHTML = this.#template;
  }

  attributeChangedCallback(name: string, _: string, newValue: string) {
    if (name === 'categories') {
      this.#categories = JSON.parse(newValue);
      this.#render();
    }
  }

  #handleSubmit = (event: Event) => {
    event.preventDefault();
    if (this.#isValid()) {
      this.dispatchEvent(this.#submitEvent);
    }
  };

  #isValid(): boolean {
    return validateAsset(this.#currentAsset);
  }

  #render() {
    this.innerHTML = this.#template;
  }
}

### Repository Functions

- assetRepository: 
```typescript
export const createAsset = async (asset: Omit<Asset, 'id'>): Promise<Result<Asset>> => {
  try {
    const response = await post<Asset>(
      "/api/assets",
      asset
    );
    return { ok: true, data: response.body };
  } catch (error) {
    console.error(`Error in createAsset:`, error);
    return { ok: false, error: 'Failed to create asset' };
  }
};
```

- categoryRepository:
```typescript
export const getCategories = async (): Promise<Result<Category[]>> => {
  try {
    const response = await get<Category[]>(
      "/api/categories"
    );
    return { ok: true, data: response.body || [] };
  } catch (error) {
    console.error(`Error in getCategories:`, error);
    return { ok: false, error: 'Failed to fetch categories' };
  }
};
```

## Implementation Steps

### 1. Generate Domain Types

#### Instructions and references
- Domain types represent the core business objects
- They must include validation and default values
- They should be independent of UI/API concerns
- Study `/src/client/domain/tools.type.ts` as reference

#### Tasks

- [x] Create `src/client/domain/asset.type.ts`
  - [x] Define Asset interface with snake_case fields
  - [x] Add NULL_ASSET constant
  - [x] Implement comprehensive validation
- [x] Create `src/client/domain/category.type.ts`
  - [x] Define Category interface with snake_case fields
  - [x] Add NULL_CATEGORY constant

### 2. Generate Page folder 

#### Instructions and references
- Page folder contains the page component and its dependencies
- It should be named after the page
- It should be located in the `src/client/app` folder
- Study `/src/client/app/tools/` as reference

#### Tasks

- [x] Create `src/client/app/add-asset/` folder

### 3. Generate Repository Functions

#### Instructions and references
- Repository are modules of functions that handle API requests
- They use the `fetch.utils.ts` to make requests
- They must include error handling and return Result types
- Study `/src/client/repository/tools.repository.ts` as reference

#### Tasks

- [x] Go to the `src/client/app/add-asset/` folder
- [x] Create `asset.repository.ts`
  - [x] Define createAsset function with proper typing
  - [x] Implement error handling with Result type
  - [x] Add logging for errors
- [x] Create `category.repository.ts`
  - [x] Define getCategories function with proper typing
  - [x] Implement error handling with Result type
  - [x] Add logging for errors

### 4. Generate Presentational Components

#### Instructions and references
- Components are reusable UI elements
- They emit events for parent communication
- They use attributes for configuration
- Study existing components in the `src/client/app/tools` folder as reference

#### Tasks

- [x] Go to the `src/client/app/add-asset/` folder
- [x] Create `asset-form.component.ts`
  - [x] Define form structure with all inputs
  - [x] Add form validation logic
  - [x] Implement submit event handling
- [x] Create `category-selector.component.ts`
  - [x] Add dropdown with category options
  - [x] Display risk and liquidity indicators
  - [x] Emit selection events
- [x] Create `value-input.component.ts`
  - [x] Add numeric input with validation
  - [x] Implement currency formatting
  - [x] Emit value change events
- [x] Create `quantity-input.component.ts`
  - [x] Add integer input with validation
  - [x] Add increment/decrement controls
  - [x] Emit quantity change events
- [x] Create `date-picker.component.ts`
  - [x] Add date input with calendar
  - [x] Handle ISO date formatting
  - [x] Emit date selection events

### 5. Generate Page Structure

#### Instructions and references
- Pages are top-level components
- They handle routing and state management
- They coordinate child components
- Study `/src/client/app/home/home.page.ts` as reference

#### Tasks

- [x] Go to the `src/client/app/add-asset/` folder
- [x] Create `add-asset.page.ts`
  - [x] Define AddAssetPage class
  - [x] Register all custom elements
  - [x] Add state management for form data
  - [x] Implement repository function calls
  - [x] Add success/error notifications
  - [x] Handle navigation after submission

### 6. Update Navigation

#### Instructions and references
- Navigation is handled in `/src/client/shared/navigation.utils.ts`
- Each page needs a route definition
- Components need to be registered
- Study existing routes as reference

#### Tasks

- [x] Go to `/src/client/shared/navigation.utils.ts`
  - [x] Add route for `/assets/add`
  - [x] Register AddAssetPage component
  - [x] Add navigation links in layout

_End of App Plan for 1 - Add Asset_ 