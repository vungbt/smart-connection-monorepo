import { ChangeEvent, ReactNode, Ref, forwardRef } from 'react';
import clsx from 'clsx';
import { RenderIcon } from '../icons';
import { DEFAULT_FILE_IMAGE, UploadItem } from './types';
import { UploadPreview } from './upload-preview';

type UploadProps = Omit<
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'size' | 'onChange' | 'value' | 'max' | 'required' | 'multiple'
> & {
  label?: string;
  loading?: boolean;
  required?: boolean;
  subPlaceholder?: string;
  value?: UploadItem[];
  size?: 'small' | 'middle' | 'large';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'pending' | 'neutral';
  variant?: 'solid' | 'outline' | 'subtle' | 'ghost';
  max?: number;
  isTouched?: boolean;
  error?: string;
  helperText?: string;
  layout?: 'horizontal' | 'vertical';
  name?: string;
  multiple?: boolean;
  customClasses?: {
    root?: string;
    label?: string;
    content?: string;
    contentWrap?: string;
    previewWrap?: string;
    helperText?: string;
    error?: string;
  };
  onChange: (values?: UploadItem[]) => void;
  setError?: (message: string | ReactNode) => void;
};

export const Upload = forwardRef(function UploadInput(
  props: UploadProps,
  ref: Ref<HTMLInputElement>
) {
  const {
    className,
    disabled,
    label,
    multiple = false,
    error,
    loading,
    accept = DEFAULT_FILE_IMAGE.accepts.join(', '),
    name,
    placeholder = 'Drag & drop files or Browse',
    value: values = [],
    subPlaceholder = 'Supported formats: PNG, JPG, JPEG, WEBP, GIF',
    id = 'upload',
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

    let newValues: UploadItem[] = [];
    if (values && values.length > 0) {
      newValues = [...values];
    }
    if (multiple) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileItem = await handleReadfile(file);
        if (fileItem) {
          newValues.push(fileItem);
        }
      }
    } else {
      const file = files[0];
      const fileItem = await handleReadfile(file);

      if (fileItem) {
        newValues = [fileItem];
      }
    }
    onChange(newValues);
    resetInputFile();
  };

  const handleReadfile = async (file: File) => {
    const fileId = `${new Date().toISOString()}-${file?.name}`;
    let item = null;
    if (file) {
      const reader = new FileReader();
      await new Promise((resolve: any, reject) => {
        reader.onload = () => {
          (item = {
            id: fileId,
            url: reader.result as string,
            file: file,
          }),
            resolve();
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }
    return item;
  };

  const showError = (mess: string) => {
    setError?.(mess);
  };

  const onHandleRemove = (value: UploadItem) => {
    const newItem = [...values];
    const indexItemValid = newItem.findIndex(item => item.id === value.id);
    if (indexItemValid !== -1) {
      newItem.splice(indexItemValid, 1);
    }
    onChange(newItem);
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

      <div className={clsx('flex items-center flex-wrap gap-3', customClasses?.contentWrap)}>
        <label
          htmlFor={uploadId}
          className={clsx(
            'rounded-lg border border-dashed flex flex-col gap-2 justify-center items-center cursor-pointer transition-all ease-in-out',
            sizeClasses[size].content,
            colorClass,
            {
              'cursor-not-allowed opacity-50': disabled || loading,
            },
            customClasses?.content
          )}
        >
          <div className="flex gap-2 text-ui-fg-subtle">
            <RenderIcon
              name={loading ? 'loading' : 'cloud-arrow-up'}
              className={clsx('text-primary', sizeClass.icon, loading && 'animate-spin')}
            />
            <p className={clsx('text-neutral-text-primary', sizeClass.placeholder)}>
              {placeholder}
            </p>
          </div>
          <p className={clsx('text-neutral-placeholder', sizeClass.subPlaceholder)}>
            {subPlaceholder}
          </p>

          <input
            ref={ref}
            name={name}
            id={uploadId}
            type="file"
            hidden
            accept={accept}
            onChange={onHandleChangeFile}
            disabled={disabled || loading}
            multiple={multiple}
            className={clsx(
              'w-full flex-1 border-none text-dark outline-none bg-transparent',
              { 'cursor-not-allowed bg-gray-100': disabled || loading },
              className
            )}
            {...reset}
          />
        </label>

        {values && values.length > 0 && (
          <UploadPreview
            className={clsx(customClasses?.previewWrap)}
            items={values}
            onRemove={onHandleRemove}
          />
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
    content: 'p-4 min-h-[80px] min-w-[240px] text-14',
    helperText: 'text-14',
    label: 'text-14',
    placeholder: 'text-14 leading-6 font-medium',
    subPlaceholder: 'text-13 leading-6',
    icon: '!w-5 !h-5',
  },
  middle: {
    content: 'p-6 min-h-[114px] min-w-[324px] text-14',
    helperText: 'text-14',
    label: 'text-14',
    placeholder: 'text-14 leading-6 font-medium',
    subPlaceholder: 'text-13 leading-6',
    icon: '!w-6 !h-6',
  },
  large: {
    content: 'p-8 min-h-[148px] min-w-[408px] text-16',
    helperText: 'text-16',
    label: 'text-16',
    placeholder: 'text-16 leading-6 font-medium',
    subPlaceholder: 'text-15 leading-6',
    icon: '!w-8 !h-8',
  },
};

const colorClasses = {
  primary: {
    solid: 'bg-primary-background border-primary text-primary-base',
    outline: 'bg-transparent border-primary text-primary-base',
    subtle: 'bg-primary-background border-primary-background text-primary-base',
    ghost:
      'text-primary bg-transparent border border-dashed border-primary hover:bg-primary-background',
  },
  secondary: {
    solid: 'bg-secondary-background border-secondary text-secondary-base',
    outline: 'bg-transparent border-secondary text-secondary-base',
    subtle: 'bg-secondary-background border-secondary-background text-secondary-base',
    ghost:
      'text-secondary bg-transparent border border-dashed border-secondary hover:bg-secondary-background',
  },
  success: {
    solid: 'bg-success-bg border-success text-success',
    outline: 'bg-transparent border-success text-success',
    subtle: 'bg-success-bg border-success-bg text-success',
    ghost: 'text-success bg-transparent border border-dashed border-success hover:bg-success-bg',
  },
  error: {
    solid: 'bg-error-bg border-error text-error',
    outline: 'bg-transparent border-error text-error',
    subtle: 'bg-error-bg border-error-bg text-error',
    ghost: 'text-error bg-transparent border border-dashed border-error hover:bg-error-bg',
  },
  pending: {
    solid: 'bg-pending-bg border-pending text-pending',
    outline: 'bg-transparent border-pending text-pending',
    subtle: 'bg-pending-bg border-pending-bg text-pending',
    ghost: 'text-pending bg-transparent border border-dashed border-pending hover:bg-pending-bg',
  },
  neutral: {
    solid: 'bg-neutral-bg border-neutral text-neutral',
    outline: 'bg-transparent border-neutral text-neutral',
    subtle: 'bg-neutral-bg border-neutral-bg text-neutral',
    ghost: 'text-neutral bg-transparent border border-dashed border-neutral hover:bg-neutral-bg',
  },
};
