import clsx from 'clsx';
import { IconProps } from '.';

export default function LucideRight({
  className,
  style,
  transform,
  strokeWidth = 1.5,
}: Readonly<IconProps>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={clsx('h-6 w-6', className)}
      style={style}
      transform={transform}
    >
      <path d="M21 12H9" />
      <path d="M21 18H7" />
      <path d="M21 6H3" />
    </svg>
  );
}
