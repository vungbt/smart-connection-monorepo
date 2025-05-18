import clsx from 'clsx';
import { IconProps } from '.';

export default function ArrowDownLeft({
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
        d="m19.5 4.5-15 15m0 0h11.25m-11.25 0V8.25"
      />
    </svg>
  );
}
