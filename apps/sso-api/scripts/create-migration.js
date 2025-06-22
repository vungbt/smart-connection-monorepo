const fs = require('fs');
const path = require('path');

const migrationName = process.argv[2];

if (!migrationName) {
  console.error('Please provide a migration name');
  process.exit(1);
}

const timestamp = new Date().toISOString().replace(/\D/g, '').slice(0, 14);
const fileName = `${timestamp}_${migrationName}.ts`;
const filePath = path.join(__dirname, '../src/database/migrations', fileName);

const template = `import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  // Add migration code here
}

export async function down(queryInterface: QueryInterface) {
  // Add rollback code here
}
`;

fs.writeFileSync(filePath, template);
console.log(`Created migration: ${fileName}`);
