import clsx from 'clsx';
import { CSSProperties, ReactNode, useMemo } from 'react';
import { ColorName, colorScaleGenerator } from '@smart-connection-monorepo/utils';
import { IconName, RenderIcon } from '../icons';

type TagProps = {
  content: string | ReactNode;
  color?: ColorName | string;
  closeIcon?: IconName;
  icon?: IconName;
  className?: string;
  type?: 'default' | 'outline';
  onClose?: () => void;
};
export function Tag({
  content,
  color,
  closeIcon,
  icon,
  type = 'default',
  className,
  onClose,
}: TagProps) {
  const colorStyle: CSSProperties | undefined = useMemo(() => {
    if (!color) return undefined;
    if (type === 'default')
      return {
        background: color,
        color: 'white',
        border: `1px solid ${color}`,
      };

    // style for outline tag
    const colors = colorScaleGenerator(color) ?? [];
    return {
      color: colors[9],
      background: colors[1],
      border: `1px solid ${colors[3]}`,
    };
  }, [color, type]);

  return (
    <span
      className={clsx(
        'flex w-fit items-center gap-1 rounded border border-solid px-1 py-0.5 text-xs font-medium',
        {
          '!border-neutral-border !bg-neutral-bg !text-neutral-text-primary':
            type === 'default' && !color,
        },
        className
      )}
      style={colorStyle}
    >
      {icon && <RenderIcon name={icon} className="!h-3 !w-3" />}
      {content}
      {(closeIcon || onClose) && (
        <span onClick={onClose}>
          <RenderIcon
            name={closeIcon ?? 'x-mark'}
            className="!h-3 !w-3 cursor-pointer hover:text-error"
          />
        </span>
      )}
    </span>
  );
}
