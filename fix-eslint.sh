#!/bin/bash

# Script to fix ESLint configuration issues in CI

# Make sure the root ESLint config exists
if [ ! -f .eslintrc.json ]; then
  echo "Root ESLint config not found, creating it..."
  cat > .eslintrc.json << 'EOF'
{
  "root": true,
  "ignorePatterns": ["**/*"],
  "plugins": ["@nx"],
  "overrides": [
    {
      "files": ["*.ts", "*.tsx", "*.js", "*.jsx"],
      "rules": {
        "@nx/enforce-module-boundaries": [
          "error",
          {
            "enforceBuildableLibDependency": true,
            "allow": [],
            "depConstraints": [
              {
                "sourceTag": "*",
                "onlyDependOnLibsWithTags": ["*"]
              }
            ]
          }
        ]
      }
    },
    {
      "files": ["*.ts", "*.tsx"],
      "extends": ["plugin:@nx/typescript"],
      "rules": {}
    },
    {
      "files": ["*.js", "*.jsx"],
      "extends": ["plugin:@nx/javascript"],
      "rules": {}
    }
  ]
}
EOF
fi

# Make sure the project ESLint configs exist and are correct
for project in apps/stay-fe libs/ui-components libs/ui-theme; do
  if [ ! -f "$project/.eslintrc.json" ]; then
    echo "$project ESLint config not found, creating it..."
    mkdir -p "$project"
    cat > "$project/.eslintrc.json" << 'EOF'
{
  "extends": ["../../.eslintrc.json"],
  "ignorePatterns": ["!**/*", "node_modules/**/*", "dist/**/*", ".next/**/*"],
  "overrides": [
    {
      "files": ["*.ts", "*.tsx", "*.js", "*.jsx"],
      "rules": {
        "@typescript-eslint/no-unused-vars": "warn"
      }
    },
    {
      "files": ["*.ts", "*.tsx"],
      "rules": {}
    },
    {
      "files": ["*.js", "*.jsx"],
      "rules": {}
    }
  ]
}
EOF
  fi
done

echo "ESLint configurations fixed!" 