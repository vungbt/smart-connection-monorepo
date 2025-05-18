import clsx from 'clsx';
import { IconProps } from '.';

export default function Underline({
  className,
  style,
  transform,
  strokeWidth = 1.5,
}: Readonly<IconProps>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      className={clsx('h-6 w-6', className)}
      style={style}
      transform={transform}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.995 3.744v7.5a6 6 0 1 1-12 0v-7.5m-2.25 16.502h16.5"
      />
    </svg>
  );
}
