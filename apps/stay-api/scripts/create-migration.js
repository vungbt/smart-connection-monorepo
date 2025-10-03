const fs = require('fs');
const path = require('path');
const migrationName =
  process.argv.find(arg => arg.startsWith('--name='))?.split('=')[1] ||
  process.argv[process.argv.indexOf('--name') + 1];

if (!migrationName) {
  console.error('Please provide a migration name');
  process.exit(1);
}

const timestamp = new Date().toISOString().replace(/\D/g, '').slice(0, 14);
const fileName = `${timestamp}_${migrationName}.js`;
const filePath = path.join(__dirname, '../src/database/migrations', fileName);

const template = `'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
      const { DataTypes } = Sequelize;
      // Add migration code here
  },

  async down(queryInterface) {
     // Add rollback code here
  },
};

`;

fs.writeFileSync(filePath, template);
console.log(`Created migration: ${fileName}`);
