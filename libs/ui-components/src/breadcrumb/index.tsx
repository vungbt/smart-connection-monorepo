import clsx from 'clsx';
import { MouseEventHandler, ReactNode } from 'react';

export type BreadcrumbItem = {
  key?: string | number;
  title: ReactNode;
  href?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  className?: string;
};

export type BreadcrumbProps = {
  items: BreadcrumbItem[];
  separator?: ReactNode;
  description?: ReactNode;
  className?: string;
  itemClassName?: string;
  separatorClassName?: string;
  descriptionClassName?: string;
  itemRender?: (item: BreadcrumbItem, isLast: boolean) => ReactNode;
};

export function Breadcrumb({
  items,
  separator = '/',
  description,
  className,
  itemClassName,
  separatorClassName,
  descriptionClassName,
  itemRender,
}: BreadcrumbProps) {
  return (
    <nav aria-label="breadcrumb" className={className}>
      <ol className="m-0 flex list-none items-center p-0 text-14">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const node = itemRender?.(item, isLast) ?? renderDefaultItem(item, isLast, itemClassName);

          return (
            <li key={item.key ?? `${index}-${String(item.title)}`} className="flex items-center">
              {node}
              {!isLast ? (
                <span
                  className={clsx('mx-2 select-none text-neutral-placeholder', separatorClassName)}
                  aria-hidden="true"
                >
                  {separator}
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>

      {description ? (
        <p className={clsx('mt-1 text-14 text-neutral-placeholder', descriptionClassName)}>
          {description}
        </p>
      ) : null}
    </nav>
  );
}

const renderDefaultItem = (item: BreadcrumbItem, isLast: boolean, itemClassName?: string) => {
  if (isLast) {
    return (
      <span
        className={clsx('font-medium text-neutral-text-primary', itemClassName, item.className)}
      >
        {item.title}
      </span>
    );
  }

  if (item.href) {
    return (
      <a
        href={item.href}
        onClick={item.onClick}
        className={clsx(
          'text-neutral-placeholder transition-colors hover:text-primary',
          itemClassName,
          item.className
        )}
      >
        {item.title}
      </a>
    );
  }

  if (item.onClick) {
    return (
      <button
        type="button"
        onClick={item.onClick}
        className={clsx(
          'cursor-pointer border-none bg-transparent p-0 text-neutral-placeholder transition-colors hover:text-primary',
          itemClassName,
          item.className
        )}
      >
        {item.title}
      </button>
    );
  }

  return (
    <span className={clsx('text-neutral-placeholder', itemClassName, item.className)}>
      {item.title}
    </span>
  );
};
