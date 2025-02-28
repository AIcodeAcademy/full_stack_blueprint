# Template Syntax

## Template Structure

The template is a markdown document with a YAML section at the beginning with instructions for you.

## YAML Section

The YAML section at the beginning of the template with instructions for you.

```yaml 
---
information: Purpose of the template.
defaults: the first option is the default.
other_instructions: other instructions for you.
file-name: Use the pattern `whatever.pattern.md`
---
```

## Markdown Section

The markdown section is the main content of the template.

Use the same structure as the template.

Fill the template placeholders with the information from the blueprint and your knowledge.

### Placeholders

Are marked with `{{` and `}}` characters.

Example:

```markdown
# {{ Project Name }}

{{ Project Description }}
```

### Repeated Sections

Are marked with `@for(item of items){}` characters.

Example:

```markdown
@for(item of items){
  {{ item }}
}
```

### Conditional Sections

Are marked with `@if(condition){}` characters.

Example:

```markdown
@if(condition){
  {{ section }}
}
```

### Selectable Options

Are marked with `option_one | option_two | option_three` characters.

Example:

```markdown
option_one | option_two | option_three
```

### Multi-select Options

Are marked with `option_one, option_two, option_three` characters.

Example:

```markdown
option_one, option_two, option_three
```

### Number Identifier

Are marked with `#1` characters.

Example:

```markdown
#1
```

### HTML Comments

Are marked with `<!--` and `-->` characters.

Example:

```markdown
<!-- Follow this instructions while filling the template, but do not include them in the final output -->
```


