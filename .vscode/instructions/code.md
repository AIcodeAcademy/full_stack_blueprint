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
- Write the template in a variable as 
  ```ts
  const html = String.raw;
  const template = html`<div>...</div>`;
  ```
- Use the `connectedCallback` lifecycle method to initialize the element
- Use the `disconnectedCallback` lifecycle method to destroy the element
