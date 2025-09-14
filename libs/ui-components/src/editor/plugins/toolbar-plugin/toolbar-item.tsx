import clsx from 'clsx';
import { IconName, RenderIcon } from '../../../icons';

export const ToolbarItem = ({
  onClick,
  disabled,
  className,
  ariaLabel,
  active,
  icon,
  children,
}: {
  children?: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className: string;
  ariaLabel?: string;
  active?: boolean;
  icon?: IconName;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        className,
        'border-0 flex bg-none rounded-lg p-2 cursor-pointer vertical-align-middle',
        active && 'bg-neutral'
      )}
      aria-label={ariaLabel}
    >
      {children ? children : <RenderIcon name={icon} className="!w-4 !h-4" />}
    </button>
  );
};
