module.exports = {
  '*.{js,jsx,ts,tsx}': files => {
    // Get unique project names from file paths
    const uniqueProjects = [
      ...new Set(
        files
          .map(file => {
            // Extract project name from file path
            const match = file.match(/^(?:apps|libs)\/([^/]+)/);
            return match ? match[1] : null;
          })
          .filter(Boolean)
      ),
    ];

    // Return lint commands followed by git add
    const lintCommands = uniqueProjects.map(project => `pnpm exec nx lint ${project} --fix`);
    return [...lintCommands, 'git add .'];
  },
  // Add specific formatting for other file types with git add
  '*.{json,css,scss,md}': ['prettier --write', 'git add .'],
};
