const { createPostCssConfig } = require('@smart-connection-monorepo/ui-theme/helper');
const { join } = require('path');

module.exports = createPostCssConfig({
  tailwindcss: {
    config: join(__dirname, 'tailwind.config.js'),
  },
});
