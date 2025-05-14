# Commit Message Convention

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification for commit messages.

## Format

Each commit message consists of a **header**, a **body**, and a **footer**.

```
<type>(<scope>): <subject>

<body>

<footer>
```

The **header** is mandatory and must conform to the [Commit Message Header](#commit-message-header) format.

The **body** is optional but highly recommended for providing context about the changes.

The **footer** is optional and can be used to reference issues, PRs, or other related information.

## Commit Message Header

```
<type>(<scope>): <subject>
```

The `type` and `subject` fields are mandatory, the `scope` field is optional.

### Type

Must be one of the following:

- **build**: Changes that affect the build system or external dependencies
- **chore**: Routine tasks, maintenance, or tooling changes
- **ci**: Changes to CI configuration files and scripts
- **docs**: Documentation only changes
- **feat**: A new feature
- **fix**: A bug fix
- **perf**: A code change that improves performance
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **revert**: Reverting a previous commit
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, etc.)
- **test**: Adding missing tests or correcting existing tests

### Scope

The scope is optional and should be the name of the npm package, component, or area of the codebase affected.

Examples:

- `feat(ui-components): add new button variant`
- `fix(stay-fe): resolve layout issue on mobile`

### Subject

The subject contains a succinct description of the change:

- Use the imperative, present tense: "change" not "changed" nor "changes"
- Don't capitalize the first letter
- No period (.) at the end

## Examples

```
feat(button): add new primary variant

Added a new primary button variant with updated styling to match the new design system.

Closes #123
```

```
fix(api): resolve race condition in authentication flow

The race condition was causing intermittent login failures when multiple requests were made simultaneously.
```

```
docs: update README with new setup instructions
```

```
refactor(core): simplify error handling logic
```
