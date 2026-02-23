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

export type ListRes<T = unknown> = {
  items: T[];
  metadata: Metadata;
};

export type SingleRes<T = unknown> = {
  item: T;
};

export type Metadata = {
  page: number;
  pageSize: number;
  totalPages: number;
  count: number;
};
