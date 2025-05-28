import clsx from 'clsx';
import { ReactNode, useMemo } from 'react';
import { ModalBase, ModalBaseProps } from '.';
import { Button } from '../button';
import { IconName, RenderIcon } from '../icons';

type ModalConfirmProps = Omit<ModalBaseProps, 'children'> & {
  onCancel?: () => void;
  cancelLabel?: string;
  cancelIcon?: IconName;
  classNameCancel?: string;

  onSubmit?: () => void;
  submitLabel?: string;
  submitIcon?: IconName;
  isLoading?: boolean;
  classNameSubmit?: string;

  message?: string;
  warning?: string;

  actions?: ReactNode;
  iconMain?: IconName;
  submitColor?: 'primary' | 'secondary' | 'success' | 'error' | 'pending' | 'neutral';
};
export const ModalConfirm = ({
  onCancel,
  cancelIcon,
  cancelLabel,
  classNameCancel,
  onSubmit,
  submitIcon,
  submitLabel,
  classNameSubmit,
  onClose,
  actions,
  isLoading,
  message,
  iconMain = 'exclamation-triangle',
  isOpen,
  warning,
  submitColor = 'primary',
}: ModalConfirmProps) => {
  const renderActions = useMemo(() => {
    if (actions) return actions;
    return (
      <div className="flex justify-center items-center gap-3 mt-5">
        <Button onClick={onCancel} icon={cancelIcon} size="small" className={classNameCancel}>
          No, cancel
        </Button>
        <Button
          onClick={onSubmit}
          icon={submitIcon ?? 'trash'}
          className={clsx(classNameSubmit)}
          color={submitColor ?? 'danger'}
          size="small"
          loading={isLoading}
        >
          Yes, I'm sure
        </Button>
      </div>
    );
  }, [
    actions,
    isLoading,
    cancelIcon,
    cancelLabel,
    submitIcon,
    submitLabel,
    classNameCancel,
    classNameSubmit,
    onSubmit,
    onCancel,
    submitColor,
  ]);

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} className="max-w-[500px]">
      <div className="flex flex-col py-2 px-4">
        {/* header */}
        <div className="w-full flex justify-end pb-1">
          <button onClick={onClose}>
            <RenderIcon className="!w-5 !h-5 text-neutral-border" name="x-mark" />
          </button>
        </div>

        {/* main content */}
        <div className="w-full flex items-center flex-col justify-center">
          {iconMain && <RenderIcon name={iconMain} className="!w-14 !h-14 text-pending" />}

          {message && message.length > 0 && (
            <p className="mt-3 font-medium text-neutral-text-secondary px-5 text-center">
              {message}
            </p>
          )}
        </div>

        {/* waning block */}
        {warning && warning.length > 0 && (
          <div className="bg-error-bg rounded-md py-3 px-2 text-error text-sm mt-5">
            <div className="flex items-center gap-1">
              <RenderIcon name="exclamation-triangle" className="text-error !w-4 !h-4 mb-[2px]" />
              <span className="font-bold">Warning</span>
            </div>
            <p className="mt-1">{warning}</p>
          </div>
        )}

        {/* actions */}
        {renderActions}
      </div>
    </ModalBase>
  );
};
