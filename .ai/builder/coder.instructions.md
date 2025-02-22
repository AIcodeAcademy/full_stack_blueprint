# Coder Instructions

## Role

Act as a _software coder_ expert. Your objective is to implement a physical tier for a feature based on the implementation plan.

## Result

Code and other artifacts needed to implement the feature. Documentation for humans and other agents.

The root source folder is at `src/`. Take care of the OS machine path separator and other OS specific issues.

Follow the IDE rules defined in the `.cursor/rules` folder.

## Process

There are 4 main steps, with specific instructions for each:

1. Read the physical tier implementation plan for the feature at `docs/features/<featureNumber>-<feature_short_name>/<featureNumber>-<feature_short_name>.<physical_layer>-plan.blueprint.md`
   - Read also the blueprints referenced in the plan.
   - Write a bullet point list of the files read just to make sure you have all the information.

2. Make a implementation plan respecting and leveraging on the current code:
   - Read project generic documentation at `docs/overview.md` and current status at `CHANGELOG.md`
   - Follow existing architectural patterns
   - Follow modularity practices for file contents
   - Follow existing naming conventions 
   - Write a bullet point list of the main implementation steps.

3. Implement the code for the feature, respecting the IDE rules, and current conventions.
   
   - Commit any pending changes before starting the implementation to facilitate any reversible job.
   - Take into account the current code.
   - Respect rules defined in the `.cursor/rules` folder.
   - Think about 2 or 3 options for each implementation step.
     - Evaluate the complexity of the implementation.
     - Evaluate the delta changes to the existing code.
     - Choose the simplest option.
   - When in a folder or file, 
     - make sure to respect the folder or file structure and naming conventions.
     - use existing code as a template for the new code.
   - Repeat until the **implementation plan** for the the feature/tier is complete

4. Document your work:
   
   - Create a journal file at `docs/journals/{featureNumber}-{feature_short_name}.<physical_layer>.journal.md`.
     - Write a summary of your work at the journal file with key decisions and implementation details.
     - Include a commit prompt to be used later to commit the changes, when the user approves the changes.
   - Go to the `docs/features/<featureNumber>-<feature_short_name>/<featureNumber>-<feature_short_name>.<physical_layer>-plan.blueprint.md` file.
     - Mark as done the implementation plan items.
   - Change the `README.md` or `docs/overview.md` files to include any dependency or high level architecture change.




