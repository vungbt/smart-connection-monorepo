import { ChangeEvent, ReactNode, Ref, forwardRef } from 'react';
import clsx from 'clsx';
import { RenderIcon } from '../icons';
import { DEFAULT_FILE_IMAGE, UploadItem } from '../upload/types';

type AvatarProps = Omit<
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'size' | 'onChange' | 'value' | 'max' | 'required'
> & {
  label?: string;
  loading?: boolean;
  required?: boolean;
  value?: UploadItem;
  size?: 'small' | 'middle' | 'large';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'pending' | 'neutral';
  variant?: 'solid' | 'outline' | 'subtle' | 'ghost';
  isTouched?: boolean;
  error?: string;
  helperText?: string;
  name?: string;
  text?: string | ReactNode;
  dot?: boolean | string;
  customClasses?: {
    root?: string;
    label?: string;
    content?: string;
    contentWrap?: string;
    previewWrap?: string;
    helperText?: string;
    error?: string;
    iconTrash?: string;
    dot?: string;
  };
  onChange: (values?: UploadItem) => void;
  setError?: (message: string | ReactNode) => void;
};

export const Avatar = forwardRef(function AvatarInput(
  props: AvatarProps,
  ref: Ref<HTMLInputElement>
) {
  const {
    className,
    disabled,
    label,
    error,
    loading,
    accept = DEFAULT_FILE_IMAGE.accepts.join(', '),
    name,
    value,
    id = 'avatar',
    text,
    dot = false,
    customClasses,
    setError,
    onChange,
    size = 'middle',
    color = 'neutral',
    variant = 'outline',
    helperText,
    required,
    ...reset
  } = props;

  const uploadId = id || name;
  const isHaveError = error && error?.length > 0;
  const sizeClass = sizeClasses[size];
  const colorClass = isHaveError ? colorClasses.error[variant] : colorClasses[color][variant];

  const onHandleChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target?.files ?? [];
    if (!files || files.length <= 0) return showError('Please choose a valid file.');

    let newValues: UploadItem | undefined = undefined;
    if (value) {
      newValues = value;
    }

    const file = files[0];
    if (file) {
      const reader = new FileReader();
      await new Promise((resolve: any, reject) => {
        reader.onload = () => {
          newValues = {
            id: `${new Date().toISOString()}-${file?.name}`,
            url: reader.result as string,
            file: file,
          };
          resolve();
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }
    onChange(newValues);
    resetInputFile();
  };

  const showError = (mess: string) => {
    setError?.(mess);
  };

  const onHandleRemove = () => {
    onChange(undefined);
    resetInputFile();
  };

  const resetInputFile = () => {
    if (!document || !uploadId) return;
    const inputFile = document.getElementById(uploadId) as HTMLInputElement;
    if (inputFile) {
      inputFile.value = '';
    }
  };

  return (
    <div className={clsx('w-full', customClasses?.root)}>
      {label && (
        <label
          htmlFor={uploadId}
          className={clsx(
            'block font-medium mb-1 w-fit text-neutral-text-primary',
            sizeClass.label,
            customClasses?.label
          )}
        >
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}

      <div
        className={clsx(
          'relative flex items-center gap-3 group w-fit rounded-full',
          customClasses?.contentWrap
        )}
      >
        <label
          htmlFor={uploadId}
          className={clsx(
            'rounded-full border flex flex-col gap-2 justify-center items-center cursor-pointer transition-all ease-in-out overflow-hidden',
            sizeClasses[size].content,
            colorClass,
            {
              'cursor-not-allowed opacity-50': disabled || loading,
            },
            customClasses?.content
          )}
        >
          {value ? (
            <img src={value?.url} alt="Avatar" className="w-full h-full object-cover" />
          ) : text ? (
            text
          ) : (
            <div className="flex gap-2 text-ui-fg-subtle">
              <RenderIcon
                name={loading ? 'loading' : 'user'}
                className={clsx(
                  'text-neutral-placeholder',
                  sizeClass.icon,
                  loading && 'animate-spin'
                )}
              />
            </div>
          )}

          {/* badge */}
          {dot && (
            <div
              className={clsx(
                'absolute top-[6px] right-0 rounded-full p-[2px] bg-error text-white aspect-square text-8 h-4 flex items-center justify-center font-medium',
                customClasses?.dot
              )}
            >
              {dot}
            </div>
          )}

          <input
            ref={ref}
            name={name}
            id={uploadId}
            type="file"
            hidden
            accept={accept}
            onChange={onHandleChangeFile}
            disabled={disabled || loading}
            className={clsx(
              'w-full flex-1 border-none text-dark outline-none bg-transparent',
              { 'cursor-not-allowed bg-gray-100': disabled || loading },
              className
            )}
            {...reset}
          />
        </label>

        {value && (
          <div className="absolute top-0 right-0 bottom-0 left-0 hidden transition-all ease-linear group-hover:block rounded-full">
            <span className="absolute top-0 right-0 bottom-0 left-0 bg-black opacity-70 rounded-full" />
            <button
              type="button"
              onClick={onHandleRemove}
              className="text-error absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <RenderIcon
                name="trash"
                className={clsx(sizeClass.iconTrash, customClasses?.iconTrash)}
              />
            </button>
          </div>
        )}
      </div>

      {(helperText || isHaveError) && (
        <div className="mt-1">
          {isHaveError ? (
            <p className={clsx('text-error', sizeClass.helperText, customClasses?.error)}>
              {error}
            </p>
          ) : (
            helperText && (
              <p
                className={clsx(
                  'text-neutral-placeholder',
                  sizeClass.helperText,
                  customClasses?.helperText
                )}
              >
                {helperText}
              </p>
            )
          )}
        </div>
      )}
    </div>
  );
});

const sizeClasses = {
  small: {
    content: 'w-16 h-16 text-14',
    helperText: 'text-14',
    label: 'text-14',
    icon: '!w-5 !h-5',
    iconTrash: '!w-4 !h-4',
  },
  middle: {
    content: 'w-20 h-20 text-14',
    helperText: 'text-14',
    label: 'text-14',
    icon: '!w-7 !h-7',
    iconTrash: '!w-6 !h-6',
  },
  large: {
    content: 'w-24 h-24 text-16',
    helperText: 'text-16',
    label: 'text-16',
    icon: '!w-8 !h-8',
    iconTrash: '!w-7 !h-7',
  },
};

const colorClasses = {
  primary: {
    solid: 'bg-primary-background border-primary text-primary-base',
    outline: 'bg-transparent border-primary text-primary-base',
    subtle: 'bg-primary-background border-primary-background text-primary-base',
    ghost: 'text-primary bg-transparent border border-primary hover:bg-primary-background',
  },
  secondary: {
    solid: 'bg-secondary-background border-secondary text-secondary-base',
    outline: 'bg-transparent border-secondary text-secondary-base',
    subtle: 'bg-secondary-background border-secondary-background text-secondary-base',
    ghost: 'text-secondary bg-transparent border border-secondary hover:bg-secondary-background',
  },
  success: {
    solid: 'bg-success-bg border-success text-success',
    outline: 'bg-transparent border-success text-success',
    subtle: 'bg-success-bg border-success-bg text-success',
    ghost: 'text-success bg-transparent border border-success hover:bg-success-bg',
  },
  error: {
    solid: 'bg-error-bg border-error text-error',
    outline: 'bg-transparent border-error text-error',
    subtle: 'bg-error-bg border-error-bg text-error',
    ghost: 'text-error bg-transparent border border-error hover:bg-error-bg',
  },
  pending: {
    solid: 'bg-pending-bg border-pending text-pending',
    outline: 'bg-transparent border-pending text-pending',
    subtle: 'bg-pending-bg border-pending-bg text-pending',
    ghost: 'text-pending bg-transparent border border-pending hover:bg-pending-bg',
  },
  neutral: {
    solid: 'bg-neutral-bg border-neutral text-neutral',
    outline: 'bg-transparent border-neutral text-neutral',
    subtle: 'bg-neutral-bg border-neutral-bg text-neutral',
    ghost: 'text-neutral bg-transparent border border-neutral hover:bg-neutral-bg',
  },
};
