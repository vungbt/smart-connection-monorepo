import clsx from 'clsx';
import { IconProps } from '.';

export default function ChevronDoubleUpSolid({
  className,
  style,
  transform,
  strokeWidth = 1.5,
}: Readonly<IconProps>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      stroke="none"
      className={clsx('h-6 w-6', className)}
      style={style}
      transform={transform}
    >
      <path
        fillRule="evenodd"
        d="M11.47 10.72a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06L12 12.31l-6.97 6.97a.75.75 0 0 1-1.06-1.06l7.5-7.5Z"
        clipRule="evenodd"
      />
      <path
        fillRule="evenodd"
        d="M11.47 4.72a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06L12 6.31l-6.97 6.97a.75.75 0 0 1-1.06-1.06l7.5-7.5Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
