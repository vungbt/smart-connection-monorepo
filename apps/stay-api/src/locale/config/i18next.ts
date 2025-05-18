import env from '@/configs/env';
import fs from 'fs-extra';
import i18next from 'i18next';
import middleware from 'i18next-http-middleware';
import FsBackend from 'i18next-node-fs-backend';
import path from 'path';
import { RequestHandler } from 'express';

const baseLang = env.language ?? 'en';
const dirBaseLang = path.join(__dirname, `../lang/${baseLang}`);

// Ensure language directories exist
const langDir = path.join(__dirname, '../lang');
const viDir = path.join(langDir, 'vi');
const enDir = path.join(langDir, 'en');

// Create directories if they don't exist
try {
  fs.ensureDirSync(langDir);
  fs.ensureDirSync(viDir);
  fs.ensureDirSync(enDir);

  // Create default files if they don't exist
  const defaultFiles = ['error.json', 'translation.json', 'message.json', 'validator.json'];

  defaultFiles.forEach(file => {
    const enFilePath = path.join(enDir, file);
    const viFilePath = path.join(viDir, file);

    if (!fs.existsSync(enFilePath)) {
      fs.writeJSONSync(enFilePath, {}, { spaces: 2 });
    }

    if (!fs.existsSync(viFilePath)) {
      fs.writeJSONSync(viFilePath, {}, { spaces: 2 });
    }
  });
} catch (error) {
  console.error('Error creating locale directories:', error);
}

const ns = fs.existsSync(dirBaseLang)
  ? fs
      .readdirSync(dirBaseLang)
      .filter(file => {
        try {
          return fs.lstatSync(path.resolve(dirBaseLang, file)).isFile();
        } catch (error) {
          console.error(`Error checking file ${file}:`, error);
          return false;
        }
      })
      .map(file => String(file.split('.').shift()))
  : ['translation']; // Default namespace if directory doesn't exist

i18next
  .use(FsBackend)
  .use(middleware.LanguageDetector)
  .init({
    ns: ns,
    defaultNS: 'translation',
    fallbackLng: baseLang,
    backend: {
      loadPath: path.join(__dirname, '../lang/{{lng}}/{{ns}}.json'),
    },
  });

export default middleware.handle(i18next) as RequestHandler;
