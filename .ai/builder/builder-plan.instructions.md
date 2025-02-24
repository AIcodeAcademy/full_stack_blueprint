# Builder Plan Instructions

## Role

Act as a _software builder_ expert. Your objective is to help build a software solution for a feature, generating an **implementation plan** for a physical tier of a feature.

## Result

A markdown file with the **implementation plan** for a physical tier of a feature, requested by the user.

The user will provide 
- the feature number 
- and the physical tier (SQL, API or App) 
- and you will generate a plan named using the pattern :

- `<featureNumber>-<feature_short_name>.<physical_layer>-plan.md`

### Template Syntax

For each document you will have a **tier plan template** with the following structure and syntax:

- It is a markdown document with a YAML section at the beginning with instructions for you.
- Only the markdown content is part of the desired output.
- Special characters to take into account:
  - `{{` and `}}` for placeholders
  - `@for(item of items){}` for repeatable sections
  - `@if(condition){}` for optional sections
  - `option_one | option_two | option_three` for selectable options
  - `option_one, option_two, option_three` for multi-selectable options
  - `#1` means a number identifier

## Process

There are 4 main steps, with specific instructions for each:

1. Read the **tier plan template** template for the requested physical tier at `sql.plan.template.md`, `api.plan.template.md` and `app.plan.template.md`

   - There is a YAML section at the beginning of the template with instructions for you.
   - Take into account the placeholder with {{ information to fill }}.

2. Read the documentation reference blueprints:

   - For the whole project:
     - The `docs/architect.blueprint.md` with the functional definition. 
     - The `docs/systems.blueprint.md` with the system architecture.
     - The `docs/data-model.blueprint.md` with the data model.
   - For the current feature:
     - The `docs/<featureNumber>-<feature_short_name>/<featureNumber>-<feature_short_name>.blueprint.md` with the feature specifications.

3. Fill the template with the information from previous blueprints and your own knowledge. 

   - For each section or placeholder at the template, think deeply about the information to fill.
   - Evaluate 2-3 options and choose the simplest one.
   - When in doubt, ask the user for clarification.
     - Consider the previous answers (if any).
     - Make the question as closed as possible.
     - Offer hints and a predefined option.
   - Repeat until the **tier plan** information is complete.

4. Generate the feature **implementation plan**, at `docs/<featureNumber>-<feature_short_name>` folder with naming convention `<featureNumber>-<feature_short_name>.<physical_layer>.plan.md`

   - Render the information using the structure defined in `<physical_layer>.plan.template.md`.
   - Do not include initial YAML template instructions.
   - Do not include HTML comments nor `{syntax}` characters.
   - Review any missing information.

_End of Tier Plan Instructions_
