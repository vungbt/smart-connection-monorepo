export type UploadItem = {
  id: string;
  url: string;
  file?: File;
  position?: number | string;
  size?: number;
  fileName?: string;
  href?: string;
};

export const DEFAULT_FILE_IMAGE = {
  accepts: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'],
  size: 1024 * 1024 * 5, // 5MB,
};
