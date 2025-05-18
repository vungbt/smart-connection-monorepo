import clsx from 'clsx';
import { IconProps } from '.';

export default function ArrowTurnUpLeft({
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
        d="M7.49 12 3.74 8.248m0 0 3.75-3.75m-3.75 3.75h16.5V19.5"
      />
    </svg>
  );
}
