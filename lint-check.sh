#!/bin/bash

# Script to run ESLint with different options
# Usage: ./lint-check.sh [errors-only|warnings-only|all]

OPTION=${1:-"all"}

case "$OPTION" in
  "errors-only")
    echo "Running ESLint (errors only)..."
    npx nx lint stay-api --quiet  # Only show errors
    ;;
  "warnings-only")
    echo "Running ESLint (warnings only)..."
    npx nx lint stay-api --max-warnings=0  # Exit with error if warnings exist
    ;;
  "all")
    echo "Running ESLint (showing all issues)..."
    npx nx lint stay-api
    ;;
  *)
    echo "Invalid option. Use: errors-only, warnings-only, or all"
    exit 1
    ;;
esac

exit 0 