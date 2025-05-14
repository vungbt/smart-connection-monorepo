# Smart Connection Monorepo

This is a monorepo for the Smart Connection project, built with [Nx](https://nx.dev).

## Project Structure

The monorepo is organized as follows:

- **apps/**
  - **stay-fe/**: Next.js frontend application
- **libs/**
  - **ui-components/**: Reusable React UI components
  - **ui-theme/**: Theme configuration and styling utilities

## Getting Started

### Prerequisites

- Node.js (v18+)
- pnpm

### Installation

```sh
# Install dependencies
pnpm install
```

## Development

### Running the Application

```sh
# Start the Next.js frontend
pnpm exec nx serve stay-fe

# Or using Nx directly
nx serve stay-fe
```

### Building

```sh
# Build all affected projects
pnpm exec nx affected -t build

# Build specific projects
pnpm exec nx build stay-fe
pnpm exec nx build ui-components
pnpm exec nx build ui-theme
```

### Testing

```sh
# Run tests for all affected projects
pnpm exec nx affected -t test

# Run tests for specific projects
pnpm exec nx test stay-fe
pnpm exec nx test ui-components
pnpm exec nx test ui-theme
```

### Linting

```sh
# Lint all affected projects
pnpm exec nx affected -t lint

# Lint specific projects
pnpm exec nx lint stay-fe
```

### Formatting

```sh
# Format all files
pnpm run format:all

# Check formatting
pnpm run format:check

# Format only uncommitted files
pnpm run format:staged
```

## Build Output

All build artifacts are stored in the `dist/` directory:

- `dist/apps/stay-fe`: The built Next.js application
- `dist/libs/ui-components`: The built UI components library
- `dist/libs/ui-theme`: The built theme library

## Commit Convention

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification for commit messages. Please see [COMMIT_CONVENTION.md](./COMMIT_CONVENTION.md) for detailed guidelines.

Example of a valid commit message:

```
feat(ui-components): add new button variant
```

## Pre-commit Hooks

This project uses Husky and lint-staged to run the following checks before each commit:

1. Code formatting with Prettier
2. Linting with ESLint
3. Commit message validation with commitlint

## Useful Commands

```sh
# Generate dependency graph
nx graph

# Show available targets for a project
nx show project stay-fe

# Run a target for all projects
nx run-many --target=build --all
```

## Adding New Code

### Creating a New Component in ui-components

```sh
# Generate a new component
nx g @nx/react:component button --project=ui-components --export
```

### Creating a New Application

```sh
# Generate a new Next.js application
nx g @nx/next:app admin-dashboard
```

### Creating a New Library

```sh
# Generate a new React library
nx g @nx/react:lib shared-utils
```

## License

MIT
