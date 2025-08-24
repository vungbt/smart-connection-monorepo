import clsx from 'clsx';
import React from 'react';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: React.ReactNode;
  size?: 'small' | 'middle' | 'large';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'pending' | 'neutral';
  optionType?: 'button' | 'default';
  customClasses?: {
    root?: string;
    label?: string;
  };
}

export const Radio: React.FC<RadioProps> = props => {
  const {
    label,
    className,
    size = 'middle',
    color = 'primary',
    optionType = 'default',
    customClasses,
    ...reset
  } = props;
  const colorClass = colorClasses[color][optionType];
  const optionClass = optionClasses[optionType][size];
  const optionIsButton = optionType === 'button';
  return (
    <label
      className={clsx(
        'cursor-pointer group',
        props.disabled && 'cursor-not-allowed opacity-50',
        className,
        customClasses?.root,
        optionClass.root,
        colorClass.root
      )}
    >
      <input type="radio" className="peer hidden" {...reset} />
      {!optionIsButton ? (
        <span
          className={clsx('transition-all ease-linear', optionClass.circle, colorClass.circle)}
        />
      ) : null}

      {/* default option */}
      {label && (
        <span className={clsx('transition-all ease-linear', optionClass.label, colorClass.label)}>
          {label}
        </span>
      )}
    </label>
  );
};

const colorClasses = {
  primary: {
    button: {
      root: 'flex items-center gap-1',
      circle: '',
      label:
        'hover:text-primary peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary',
    },
    default: {
      root: 'flex items-center gap-1',
      circle: 'peer-checked:border-primary group-hover:border-primary border-neutral',
      label: '',
    },
  },
  secondary: {
    button: {
      root: 'flex items-center gap-1',
      circle: '',
      label:
        'hover:text-secondary peer-checked:bg-secondary peer-checked:text-white peer-checked:border-secondary',
    },
    default: {
      root: 'flex items-center gap-1',
      circle: 'peer-checked:border-secondary group-hover:border-secondary border-neutral',
      label: '',
    },
  },
  success: {
    button: {
      root: 'flex items-center gap-1',
      circle: 'border-success',
      label:
        'hover:text-success peer-checked:bg-success peer-checked:text-white peer-checked:border-success',
    },
    default: {
      root: 'flex items-center gap-1',
      circle:
        'border-success peer-checked:border-success group-hover:border-success border-neutral',
      label: '',
    },
  },
  error: {
    button: {
      root: 'flex items-center gap-1',
      circle: 'border-error',
      label:
        'hover:text-error peer-checked:bg-error peer-checked:text-white peer-checked:border-error',
    },
    default: {
      root: 'flex items-center gap-1',
      circle: 'border-error peer-checked:border-error group-hover:border-error',
      label: '',
    },
  },
  pending: {
    button: {
      root: 'flex items-center gap-1',
      circle: 'border-pending',
      label:
        'hover:text-pending peer-checked:bg-pending peer-checked:text-white peer-checked:border-pending',
    },
    default: {
      root: 'flex items-center gap-1',
      circle: 'peer-checked:border-pending group-hover:border-pending border-neutral',
      label: '',
    },
  },
  neutral: {
    button: {
      root: 'flex items-center gap-1',
      circle: 'border-neutral',
      label:
        'hover:text-neutral peer-checked:bg-neutral peer-checked:text-white peer-checked:border-neutral',
    },
    default: {
      root: 'flex items-center gap-1',
      circle:
        'border-neutral peer-checked:border-neutral group-hover:border-neutral border-neutral',
      label: '',
    },
  },
};

const optionClasses = {
  default: {
    small: {
      root: 'flex items-center gap-1',
      circle: 'w-3 h-3 rounded-full border border-solid peer-checked:border-[4px]',
      label: 'text-14 px-1',
    },
    middle: {
      root: 'flex items-center gap-1',
      circle: 'w-4 h-4 rounded-full border border-solid peer-checked:border-[5px]',
      label: 'text-14 px-1',
    },
    large: {
      root: 'flex items-center gap-1',
      circle: 'w-5 h-5 rounded-full border border-solid peer-checked:border-[6px]',
      label: 'text-16 px-1',
    },
  },
  button: {
    small: {
      root: 'flex items-center gap-1',
      circle: '',
      label:
        'text-14 px-2 border border-solid border-neutral group-last:rounded-tr group-last:rounded-br group-first:rounded-tl group-first:rounded-bl group-first:border-r-0 group-last:border-l-0',
    },
    middle: {
      root: 'flex items-center gap-1',
      circle: '',
      label:
        'text-14 px-4 py-1 border border-solid border-neutral group-last:rounded-tr-md group-last:rounded-br-md group-first:rounded-tl-md group-first:rounded-bl-md group-first:border-r-0 group-last:border-l-0',
    },
    large: {
      root: 'flex items-center gap-1',
      circle: '',
      label:
        'text-16 px-4 py-2 border border-solid border-neutral group-last:rounded-tr-lg group-last:rounded-br-lg group-first:rounded-tl-md group-first:rounded-bl-md group-first:border-r-0 group-last:border-l-0',
    },
  },
};
