# Project structure

## Folders

- Prefer organization by feature than technology

```txt
dist/
docs/ 
src/
tests/
```

## File naming

- Export only one artifact per file
- Use the following naming convention `{{business}}.{{technical}}.ts`, where :
  - business is related to functional or specification domain
  - technical is one of: `type` | `component` | `util` ...


# Type Script rules

- Prefer `type` over `interface`
- Prefer functions over classes
- Prefer `#` over `_` for private members
- Avoid `null` and `undefined`
- Avoid deep nested anonymous functions by asigning named functions
- Avoid deep nested control structures by using early returns
- Validate data using plain TS functions no ValueObjects needed
- Avoid external libraries as much as possible
- For debugging use `console.log("source code that generated this", inspectedObject)`

# Web rules

## HTML rules

- Use standard HTML semantic tags like : `article`, `section`, `nav`, `header`, `footer`, `aside`...
- Avoid `div` or `p` for layout and use proper semantic tags
- Add ARIA attributes for accessibility
- Add `role` attribute when needed
- Add `id` `name` or `role` attributes to facilitate node selections

## CSS rules

- We use PicoCSS as reset to avoid classes
- Do not create custom classes

## Images

- Avoid svg and use emojis for icons

## PicoCSS

- Use a basic reset such
- Use variables for colors, fonts, and spacing
- Use containers and grid for layout
- Nice to have light/dark mode

## Web APIs

- Use fetch API for HTTP requests
- Use localStorage for data storage
- Avoid external libraries as much as possible

## Web Components

- Use Web Components
- Do not use shadow DOM
- Write the template in a private property using html helper string 
  ```ts
  const html = String.raw;
  this.#template = html`<div>...</div>`;
  ```
- Use the constructor to add the innerHTML and call repositories
- Use the `connectedCallback` lifecycle method to add event listeners
- Use the `disconnectedCallback` lifecycle method to remove event listeners
- Do not define the custom element at the component level, instead, export the class and define it at the parent level

### Page components

- A page will be a webcomponent that will be loaded in the `router-outlet`
- Create pages in its own folder at `src/client/app/name` folder 
- The name must be `name.page.ts`
- A page should use a repository to fetch data in its owm folder
- A page should use components to display data in its own folder
- Attach the page to the `router-outlet` in the `navigation.utils.ts`

### Page repository

- A repository will be a module of exported functions that helps a page to fetch data from the server
- Create repositories in the folder of the page at `src/client/app/pagen-name` folder 
- Must use the fetch API to fetch utils from `@/client/shared/fetch.utils.ts`
- Should be named like the page or the resource it is fetching but with `name.repository.ts` extension

### Page components

- Create components in the folder of the page at `src/client/app/pagen-name/components` folder 
- This components are just for this page and are not shared
- A component should be named with `name.component.ts` extension