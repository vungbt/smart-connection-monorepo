export type Size = 'small' | 'middle' | 'large';
export const getIconSize = (size: Size): string => {
  switch (size) {
    case 'small':
      return '!h-4 !w-4';
    case 'large':
      return '!h-6 !w-6';
    default:
      return '!h-5 !w-5';
  }
};
