import FilesModel from '@/models/files';
import { IModelBase } from './common';

export enum EProvider {
  S3 = 's3',
  Cloudinary = 'cloudinary',
  System = 'system',
}

export type FileItem = FilesModel;

export interface IFileAttributes extends IModelBase {
  url?: string;
  storageId: string;
  provider?: EProvider;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metadata?: any;
}

export interface ICreateFileOptions {
  folder?: string;
  data?: FileItem;
}

export interface IFileCloudinary {
  public_id: string;
  version: number;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  url: string;
  secure_url: string;
  access_mode: string;
}
