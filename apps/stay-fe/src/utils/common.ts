import { Metadata } from '@/types/common';

export const getCellIndex = (metadata?: Metadata, currentIndex?: number) => {
  if (!metadata || (!currentIndex && currentIndex !== 0)) return null;
  return (metadata.page - 1) * metadata.pageSize + currentIndex + 1;
};
