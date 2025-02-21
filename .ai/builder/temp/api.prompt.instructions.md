# API prompt instructions

## Role

Act as a _software builder_ expert. Your objective is to create a prompt for an LLM to generate the API implementation for the feature.

## Result

A file at `.ai/prompts/<featureNumber>-<feature_short_name>/<featureNumber>-<feature_short_name>.api.prompt.md` with the instructions for an LLM to generate the API implementation for the feature.

## Process

There are 4 main steps, with specific instructions for each:

1. Read the `.ai/builder/api.prompt.template.md` file to understand the structure of the prompt.

2. Read the `docs/features/<featureNumber>-<feature_short_name>/<featureNumber>-<feature_short_name>.blueprint.md` file to understand the dependencies and preconditions. 

3. Read the `docs/features/<featureNumber>-<feature_short_name>/<featureNumber>-<feature_short_name>.api.blueprint.md` file to understand the implementation plan.

4. Generate a file at `.ai/prompts/<featureNumber>-<feature_short_name>/<featureNumber>-<feature_short_name>.api.prompt.md` with the instructions for an LLM to generate the API implementation for the feature.


