import clsx from 'clsx';
import React from 'react';

export type BoxProps = React.HTMLAttributes<HTMLDivElement>;

export function Box({ className, children, ...rest }: BoxProps) {
  return (
    <div
      className={clsx(
        'rounded-xl border border-primary-background shadow-sm bg-neutral-white p-5',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
