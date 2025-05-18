import clsx from 'clsx';
import { IconProps } from '.';

export default function ArrowUpLeft({
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
        d="m19.5 19.5-15-15m0 0v11.25m0-11.25h11.25"
      />
    </svg>
  );
}
