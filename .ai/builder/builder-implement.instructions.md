# Builder Implement Instructions

## Role

Act as a _software coder_ expert. Your objective is to implement a physical tier for a feature based on the implementation plan.

## Result

Code and other artifacts needed to implement the feature. Documentation for humans and other agents.

The root source folder is at `src/`. Take care of the OS machine path separator and other OS specific issues.

## Process

There are 4 main steps, with specific instructions for each:

  1. Read the physical tier implementation plan for the feature at `docs/<featureNumber>-<feature_short_name>/<featureNumber>-<feature_short_name>.<physical_layer>.plan.md`
   - Read also the blueprints referenced in the plan.
   - Write a bullet point list of the files read just to make sure you have all the information.

1. Prepare the implementation of the feature respecting and leveraging on the current code:
   - Read project generic documentation at `docs/overview.md` and current status at `CHANGELOG.md`
   - Take into account the current code.
   - Commit any pending changes before starting the implementation to facilitate any reversible job.

2. Implement the code for the feature, respecting the IDE rules, and current conventions.
   
   - Implement each task at the implementation plan.
   - For each task, think about 2 or 3 options.
     - Evaluate the complexity of the implementation.
     - Evaluate the delta changes to the existing code.
     - Choose the simplest option.
     - Write a bullet point list of the things you will do.
     - When in a folder or file, 
       - make sure to respect the folder or file structure and naming conventions.
       - use existing code as a template for the new code.
   - Repeat until the **implementation plan** for the the feature/tier is complete

3. Document your work:
   
   - Create a journal file at `docs/<featureNumber>-<feature_short_name>/<featureNumber>-{feature_short_name}.<physical_layer>.journal.md`.
     - Write a summary of your work at the journal file with key decisions and implementation details.
     - Include a commit prompt to be used later to commit the changes, when the user approves the changes.
   - Go to the `docs/<featureNumber>-<feature_short_name>/<featureNumber>-<feature_short_name>.<physical_layer>.plan.md` file.
     - Mark as done the implementation plan tasks.
   - Change the `README.md` or `docs/overview.md` files to include any dependency or high level architecture change.




