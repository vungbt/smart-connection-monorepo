export const FILE_IMAGE = {
  accepts: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'],
  size: 1024 * 1024 * 5, // 5MB,
};

export const FILE_CSV = {
  accepts: [
    'text/csv',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
    'application/vnd.ms-excel', // .xls
    '.xlsx',
    '.xls',
  ],
  size: 1024 * 1024 * 50, // 50MB,
};

export const FILE_VIDEO_IMAGE_PDF = {
  accepts: [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/webp',
    'image/gif',
    'video/mp4',
    'video/webm',
    'video/ogg',
    'video/ogv',
    'video/x-m4v',
    'application/pdf',
  ],
  size: 1024 * 1024 * 20, // 10MB,
};

export const FILE_PDF = {
  accepts: ['application/pdf'],
  size: 1024 * 1024 * 10, // 10MB,
};

export const FILE_VIDEO = {
  accepts: ['video/*'],
  size: 1024 * 1024 * 10, // 10MB,
};

export const DEFAULT_PAGINATION = {
  page: 1,
  pageSize: 10,
  count: 0,
  totalPages: 0,
};
