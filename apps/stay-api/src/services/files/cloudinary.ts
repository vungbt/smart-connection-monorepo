import cloudinary from '@/configs/cloudinary';
import env from '@/configs/env';
import { IFileCloudinary } from '@/types';
import { formatDate, genSlug } from '@/utils/helpers';
import { stringify } from 'qs';

const moveFile = (publicId: string, folder?: string) => {
  const name = publicId.split('/').pop();
  return cloudinary.uploader.rename(publicId, `${folder ?? env.folder.assets}/${name}`, {
    invalidate: true,
    overwrite: true,
  });
};

const signUrlAccess = (publicId?: string) => {
  return cloudinary.utils.sign_request({
    public_id: publicId,
    sign_url: true,
    type: 'authenticated',
  });
};

const signUrlUpload = (name?: string) => {
  const fileName = `${formatDate(new Date())}-${genSlug(name)}`;
  return cloudinary.utils.sign_request({
    public_id: `${env.folder.temp ?? 'temp'}/${fileName}`,
    timestamp: Math.round(new Date().getTime() / 1000),
  });
};

const uploadUrl = (name?: string) => {
  const params = signUrlUpload(name);
  const { cloud_name, cloudinary_domain } = cloudinary.config();
  return `${cloudinary_domain}/${cloud_name}/auto/upload?${stringify(params)}`;
};

const download = (url: string): Promise<IFileCloudinary> => {
  const fileName = `${formatDate(new Date())}-${genSlug()}`;
  return cloudinary.uploader.upload(url, {
    public_id: `${env.folder.temp ?? 'temp'}/${fileName}`,
    timestamp: Math.round(new Date().getTime() / 1000),
  }) as Promise<IFileCloudinary>;
};

const getInfo = (id: string) => {
  return cloudinary.api.resource(id);
};

export const CloudinaryServices = {
  moveFile,
  signUrlAccess,
  signUrlUpload,
  uploadUrl,
  download,
  getInfo,
};
