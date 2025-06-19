# Project a

This repository uses a structured layout to separate different concerns of the project.

```
src/
  bot/
    core/
    flows/
    nlp/
  ui/
    components/
    themes/
  api/
public/
docs/
examples/
.github/
  workflows/
```

Each empty directory contains a `.gitkeep` placeholder file so that the folder
is tracked by Git. The `.github/workflows` directory includes a starter GitHub
Actions workflow.
