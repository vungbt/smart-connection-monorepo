import { ExternalToast, Toaster as SonnerToaster, toast, ToasterProps } from 'sonner';
import { RenderIcon } from '../icons';

export const Toaster = (props: ToasterProps) => {
  return (
    <SonnerToaster
      {...props}
      icons={{
        success: <RenderIcon name="check-circle" className="!w-5 !h-5 text-success" />,
        error: <RenderIcon name="exclamation-circle" className="!w-5 !h-5 text-error" />,
        warning: <RenderIcon name="exclamation-triangle" className="!w-5 !h-5 text-pending" />,
        info: <RenderIcon name="information-circle" className="!w-5 !h-5 text-info" />,
      }}
    />
  );
};

export const toastError = (message: string, options?: ExternalToast) =>
  toast.error(message, { ...options });

export const toastSuccess = (message: string, options?: ExternalToast) =>
  toast.success(message, { ...options });

export const toastWarning = (message: string, options?: ExternalToast) =>
  toast.warning(message, { ...options });

export const toastInfo = (message: string, options?: ExternalToast) =>
  toast.info(message, { ...options });
