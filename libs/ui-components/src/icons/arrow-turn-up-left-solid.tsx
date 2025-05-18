import clsx from 'clsx';
import { IconProps } from '.';

export default function ArrowTurnUpLeftSolid({
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
        d="M20.239 20.25a.75.75 0 0 1-.75-.75V8.999H5.549l2.47 2.47a.75.75 0 0 1-1.06 1.06l-3.75-3.75a.75.75 0 0 1 0-1.06l3.75-3.75a.75.75 0 1 1 1.06 1.06l-2.47 2.47h14.69a.75.75 0 0 1 .75.75V19.5a.75.75 0 0 1-.75.75Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
