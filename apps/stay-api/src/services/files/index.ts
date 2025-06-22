import { CloudinaryServices } from './cloudinary';
import { EProvider, ICreateFileOptions, IFileCloudinary } from '@/types';
import pick from 'lodash/pick';
import env from '@/configs/env';
import FilesModel from '@/models/files';
import BadRequest from '@/utils/errors/BadRequest';

const uploadUrl = async (name?: string) => {
  if (!name) throw new BadRequest();
  return CloudinaryServices.uploadUrl(name);
};

const uploadUrls = async (names: string[]) => {
  return Promise.all(names.map(item => CloudinaryServices.uploadUrl(item)));
};

const createFromStorageId = async (
  id: string,
  options: ICreateFileOptions = {
    folder: env.folder.assets,
  }
) => {
  try {
    let storageFile: IFileCloudinary;
    if (options?.folder) {
      storageFile = await CloudinaryServices.moveFile(id, options.folder);
    } else {
      storageFile = await CloudinaryServices.getInfo(id);
    }
    if (storageFile) {
      return FilesModel.create({
        url: storageFile.url,
        storageId: storageFile.public_id,
        metadata: pick(storageFile, ['format', 'resource_type', 'bytes', 'height', 'width']),
        ...(options?.data || {}),
      });
    }
    throw new BadRequest();
  } catch (error) {
    throw error;
  }
};

const createFormUrl = async (url: string) => {
  try {
    return FilesModel.create({
      url: url,
      provider: EProvider.System,
      storageId: '',
    });
  } catch (error) {
    throw error;
  }
};

const createManyFormUrls = async (urls: string[]) => {
  try {
    const records = urls.map(item => ({
      url: item,
      provider: EProvider.System,
      storageId: '',
    }));
    return FilesModel.bulkCreate(records, { returning: true });
  } catch (error) {
    throw error;
  }
};

export const FileServices = {
  uploadUrl,
  createFromStorageId,
  uploadUrls,
  createFormUrl,
  createManyFormUrls,
};
