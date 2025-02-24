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
  id: string; // Unique identifier
  category_id: string; // Reference to category
  value: number; // Asset monetary value
  quantity: number; // Asset quantity/units
  acquisition_date: string; // ISO date string
  user_id: string; // Owner of the asset
};

export const NULL_ASSET = {
  id: "",
  category_id: "",
  value: 0,
  quantity: 0,
  acquisition_date: "",
  user_id: ""
};

export const validateAsset = (data: Partial<Asset>): boolean => {
  // Category must be selected
  if (!data.category_id) return false;
  // Value must be positive number
  if (!data.value || data.value <= 0) return false;
  // Quantity must be positive number
  if (!data.quantity || data.quantity <= 0) return false;
  // Date must be valid ISO string
  if (!data.acquisition_date || isNaN(Date.parse(data.acquisition_date))) return false;
  return true;
};
```

#### Category.type.ts
```typescript
export type Category = {
  id: string; // Unique identifier
  name: string; // Display name
  risk_level: string; // Risk classification
  liquidity: string; // Liquidity classification
};

export const NULL_CATEGORY = {
  id: "",
  name: "",
  risk_level: "",
  liquidity: ""
};
```

### Pages

- add-asset: Page component for creating a new asset, handles form state and submission at route /assets/add

### Components

- asset-form: Form component for asset data input with validation and submission
- category-selector: Dropdown component for selecting asset category
- date-picker: Custom date input component with validation

### Repository Functions

- assetRepository: Functions for creating assets and fetching categories
  - createAsset: Creates new asset record
  - getCategories: Fetches available asset categories

## Implementation Steps

### 1. Generate Domain Types

#### Instructions and references
- Domain types represent the core business objects
- They must include validation and default values
- They should be independent of UI/API concerns
- Study `/src/client/domain/tools.type.ts` as reference

#### Tasks

- [ ] Create `src/client/domain/asset.type.ts`
  - [ ] Define Asset interface
  - [ ] Add NULL_ASSET constant
  - [ ] Implement validation
- [ ] Create `src/client/domain/category.type.ts`
  - [ ] Define Category interface
  - [ ] Add NULL_CATEGORY constant

### 2. Generate Page folder 

#### Instructions and references
- Page folder contains the page component and its dependencies
- It should be named after the page
- It should be located in the `src/client/app` folder
- Study `/src/client/app/about/` as reference

#### Tasks

- [ ] Create `src/client/app/add-asset/` folder

### 3. Generate Repository Functions

#### Instructions and references
- Repository are modules of functions that handle API requests
- They use the `fetch.utils.ts` to make requests
- They must include error handling and return Result types, without throwing errors
- Study `/src/client/repository/tools.repository.ts` as reference

#### Tasks

- [ ] Go to the `src/client/app/add-asset/` folder
- [ ] Create `asset.repository.ts`
  ```typescript
  export const postAsset = async (asset: Asset): Promise<Asset | null> => {
    const response = await post<Asset>("/api/assets", asset);
    return response.body || NULL_ASSET;
  };

  export const getCategories = async (): Promise<Category[]> => {
    const response = await get<Category[]>("/api/categories");
    return response.body || [];
  };
  ```

### 4. Generate Presentational Components

#### Instructions and references
- Components are reusable UI elements
- They emit events for parent communication
- They use attributes for configuration
- Study existing components in the `src/client/app/tools` folder as reference

#### Tasks

- [ ] Go to the `src/client/app/add-asset/` folder
- [ ] Create `category-selector.component.ts`
  ```typescript
  const html = String.raw;

  export class CategorySelectorComponent extends HTMLElement {
    #categories: Category[] = [];
    #selected = "";
    #select: HTMLSelectElement | null = null;

    static get observedAttributes() {
      return ["categories", "selected"];
    }

    #template = html`
      <select name="category" required>
        <option value="">Select a category</option>
        ${this.#categories.map(category => html`
          <option value="${category.id}" ${category.id === this.#selected ? "selected" : ""}>
            ${category.name} (Risk: ${category.risk_level}, Liquidity: ${category.liquidity})
          </option>
        `)}
      </select>
    `;

    constructor() {
      super();
      this.innerHTML = this.#template;
    }

    connectedCallback() {
      this.#select = this.querySelector("select");
      this.#select?.addEventListener("change", this.#handleChange);
    }

    disconnectedCallback() {
      this.#select?.removeEventListener("change", this.#handleChange);
    }

    attributeChangedCallback(name: string, _: string, newValue: string) {
      if (name === "categories") {
        this.#categories = JSON.parse(newValue);
        this.#render();
      } else if (name === "selected") {
        this.#selected = newValue;
        this.#render();
      }
    }

    #handleChange = (event: Event) => {
      const select = event.target as HTMLSelectElement;
      this.dispatchEvent(new CustomEvent("category-change", {
        detail: select.value,
        bubbles: true
      }));
    };

    #render() {
      this.innerHTML = this.#template;
      // Reattach event listener after render
      this.#select = this.querySelector("select");
      this.#select?.addEventListener("change", this.#handleChange);
    }
  }
  ```

- [ ] Create `date-picker.component.ts`
  ```typescript
  const html = String.raw;

  export class DatePickerComponent extends HTMLElement {
    #value = "";
    #input: HTMLInputElement | null = null;

    static get observedAttributes() {
      return ["value"];
    }

    #template = html`
      <input 
        type="date" 
        name="acquisition_date" 
        required
        value="${this.#value}"
        max="${new Date().toISOString().split("T")[0]}"
      />
    `;

    constructor() {
      super();
      this.innerHTML = this.#template;
    }

    connectedCallback() {
      this.#input = this.querySelector("input");
      this.#input?.addEventListener("change", this.#handleChange);
    }

    disconnectedCallback() {
      this.#input?.removeEventListener("change", this.#handleChange);
    }

    attributeChangedCallback(name: string, _: string, newValue: string) {
      if (name === "value") {
        this.#value = newValue;
        this.#render();
      }
    }

    #handleChange = (event: Event) => {
      const input = event.target as HTMLInputElement;
      this.dispatchEvent(new CustomEvent("date-change", {
        detail: input.value,
        bubbles: true
      }));
    };

    #render() {
      this.innerHTML = this.#template;
      // Reattach event listener after render
      this.#input = this.querySelector("input");
      this.#input?.addEventListener("change", this.#handleChange);
    }
  }
  ```

- [ ] Create `asset-form.component.ts`
  ```typescript
  const html = String.raw;

  export class AssetFormComponent extends HTMLElement {
    #asset: Asset = NULL_ASSET;
    #categories: Category[] = [];
    #error: string | null = null;
    #form: HTMLFormElement | null = null;
    #valueInput: HTMLInputElement | null = null;
    #quantityInput: HTMLInputElement | null = null;

    static get observedAttributes() {
      return ["categories", "error"];
    }

    #template = html`
      <form>
        <div class="form-group">
          <label for="category">Category</label>
          <category-selector-component
            categories="${JSON.stringify(this.#categories)}"
            selected="${this.#asset.category_id}"
          ></category-selector-component>
        </div>

        <div class="form-group">
          <label for="value">Value</label>
          <input 
            type="number" 
            name="value" 
            required 
            min="0.01" 
            step="0.01"
            value="${this.#asset.value}"
          />
        </div>

        <div class="form-group">
          <label for="quantity">Quantity</label>
          <input 
            type="number" 
            name="quantity" 
            required 
            min="1" 
            step="1"
            value="${this.#asset.quantity}"
          />
        </div>

        <div class="form-group">
          <label for="acquisition_date">Acquisition Date</label>
          <date-picker-component
            value="${this.#asset.acquisition_date}"
          ></date-picker-component>
        </div>

        ${this.#error ? html`<div class="error">${this.#error}</div>` : ""}

        <button type="submit">Add Asset</button>
      </form>
    `;

    constructor() {
      super();
      this.innerHTML = this.#template;
    }

    connectedCallback() {
      this.#form = this.querySelector("form");
      this.#valueInput = this.querySelector('input[name="value"]');
      this.#quantityInput = this.querySelector('input[name="quantity"]');

      this.#form?.addEventListener("submit", this.#handleSubmit);
      this.#valueInput?.addEventListener("change", this.#handleValueChange);
      this.#quantityInput?.addEventListener("change", this.#handleQuantityChange);
      this.addEventListener("category-change", this.#handleCategoryChange);
      this.addEventListener("date-change", this.#handleDateChange);
    }

    disconnectedCallback() {
      this.#form?.removeEventListener("submit", this.#handleSubmit);
      this.#valueInput?.removeEventListener("change", this.#handleValueChange);
      this.#quantityInput?.removeEventListener("change", this.#handleQuantityChange);
      this.removeEventListener("category-change", this.#handleCategoryChange);
      this.removeEventListener("date-change", this.#handleDateChange);
    }

    #handleCategoryChange = (event: CustomEvent<string>) => {
      this.#asset = { ...this.#asset, category_id: event.detail };
    };

    #handleValueChange = (event: Event) => {
      const input = event.target as HTMLInputElement;
      this.#asset = { ...this.#asset, value: Number(input.value) };
    };

    #handleQuantityChange = (event: Event) => {
      const input = event.target as HTMLInputElement;
      this.#asset = { ...this.#asset, quantity: Number(input.value) };
    };

    #handleDateChange = (event: CustomEvent<string>) => {
      this.#asset = { ...this.#asset, acquisition_date: event.detail };
    };

    #handleSubmit = (event: Event) => {
      event.preventDefault();
      if (validateAsset(this.#asset)) {
        this.dispatchEvent(new CustomEvent("asset-submit", {
          detail: this.#asset,
          bubbles: true
        }));
      }
    };

    #render() {
      this.innerHTML = this.#template;
    }
  }
  ```

### 5. Generate Page Structure

#### Instructions and references
- Pages are top-level components
- They handle routing and state management
- They coordinate child components
- Study `/src/client/app/home/home.page.ts` as reference

#### Tasks

- [ ] Go to the `src/client/app/add-asset/` folder
- [ ] Create `add-asset.page.ts`
  ```typescript
  const html = String.raw;

  // Define custom elements
  customElements.define("category-selector-component", CategorySelectorComponent);
  customElements.define("date-picker-component", DatePickerComponent);
  customElements.define("asset-form-component", AssetFormComponent);

  export class AddAssetPage extends HTMLElement {
    // Route: #/assets/add
    #route = "/assets/add";

    #state = {
      categories: [] as Category[],
      error: null as string | null,
      loading: false
    };

    #template = html`
      <article class="add-asset-page">
        <header>
          <h1>Add New Asset</h1>
        </header>

        <main>
          ${this.#state.loading 
            ? html`<div class="loading">Loading...</div>`
            : html`
              <asset-form-component
                categories="${JSON.stringify(this.#state.categories)}"
                error="${this.#state.error}"
              ></asset-form-component>
            `}
        </main>
      </article>
    `;

    constructor() {
      super();
      this.innerHTML = this.#template;
    }

    async connectedCallback() {
      this.addEventListener("asset-submit", this.#handleSubmit);
      await this.#loadCategories();
    }

    disconnectedCallback() {
      this.removeEventListener("asset-submit", this.#handleSubmit);
    }

    async #loadCategories() {
      this.#state.loading = true;
      this.#render();

      const categories = await getCategories();
      this.#state.categories = categories;
      this.#state.loading = false;
      this.#render();
    }

    #handleSubmit = async (event: CustomEvent<Asset>) => {
      this.#state.loading = true;
      this.#render();

      const asset = await postAsset(event.detail);
      
      if (asset) {
        // Navigate to assets list on success
        window.location.hash = "#/assets";
      } else {
        this.#state.error = "Failed to create asset. Please try again.";
        this.#state.loading = false;
        this.#render();
      }
    };

    #render() {
      this.innerHTML = this.#template;
    }
  }
  ```

### 6. Update Navigation

#### Instructions and references
- Navigation is handled in `/src/client/shared/navigation.utils.ts`
- Each page needs a route definition
- Components need to be registered
- Study existing routes as reference

#### Tasks

- [ ] Go to `/src/client/shared/navigation.utils.ts`
  - [ ] Add route for `add-asset` at path `/assets/add`
  - [ ] Register `AddAssetPage` component
  - [ ] Add navigation link in home page

_End of App Plan for 1 - Add Asset_ 