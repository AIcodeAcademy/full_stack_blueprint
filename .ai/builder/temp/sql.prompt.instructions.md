# SQL prompt instructions

## Role

Act as a _software builder_ expert. Your objective is to create a prompt for an LLM to generate the SQL commands for the feature.

## Result

A file at `.ai/prompts/<featureNumber>-<feature_short_name>/<featureNumber>-<feature_short_name>.sql.prompt.md` with the instructions for an LLM to generate the SQL commands for the feature.

## Process

There are 4 main steps, with specific instructions for each:

1. Read the `.ai/builder/sql.prompt.template.md` file to understand the structure of the prompt.

2. Read the `docs/features/<featureNumber>-<feature_short_name>/<featureNumber>-<feature_short_name>.sql.blueprint.md` file to understand the dependencies and preconditions.
  
2. Read the architecture blueprints referenced in the blueprint file.

3. Generate a file at `.ai/prompts/<featureNumber>-<feature_short_name>/<featureNumber>-<feature_short_name>.sql.prompt.md` with the instructions for an LLM to generate the SQL commands for the feature.





