import clsx from 'clsx';
import { forwardRef } from 'react';
import ReactDatePicker from 'react-datepicker';
import { BaseDatePickerProps, colorClasses, sizeClasses } from './common';
import { RenderIcon } from '../icons';
import { getIconSize } from '../common';

export type DatePickerProps = BaseDatePickerProps & {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  id?: string;
};

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      value,
      size = 'middle',
      color = 'neutral',
      variant = 'outline',
      icon = 'calendar-days',
      loading,
      error,
      placeholder = 'Select date...',
      dateFormat = 'yyyy-MM-dd',
      minDate,
      maxDate,
      isClearable,
      showTimeSelect,
      timeIntervals,
      locale,
      customClasses,
      ...rest
    },
    ref
  ) => {
    const colorClass = error ? colorClasses.error[variant] : colorClasses[color][variant];

    return (
      <div
        className={clsx('w-full datepicker-custom relative', customClasses?.root)}
        suppressHydrationWarning
      >
        <ReactDatePicker
          {...rest}
          selected={value ?? undefined}
          dateFormat={dateFormat}
          minDate={minDate}
          maxDate={maxDate}
          isClearable={isClearable}
          showTimeSelect={showTimeSelect}
          timeIntervals={timeIntervals}
          locale={locale}
          popperClassName="datepicker-popper-custom"
          className={clsx(
            'w-full border rounded-lg transition-all ease-in-out outline-none focus:shadow-border pr-10',
            sizeClasses[size],
            colorClass,
            customClasses?.input
          )}
          placeholderText={placeholder}
          // ensure calendar uses portal to avoid overflow issues inside modals
          withPortal={false}
          portalId="ui-components-datepicker-portal"
          shouldCloseOnSelect
        />
        {(icon || loading) && (
          <label>
            <RenderIcon
              className={clsx(
                'absolute top-1/2 right-4 transform -translate-y-1/2 text-neutral-placeholder',
                getIconSize(size),
                customClasses?.icon,
                loading && 'animate-spin'
              )}
              name={loading ? 'loading' : icon}
            />
          </label>
        )}
      </div>
    );
  }
);

DatePicker.displayName = 'DatePicker';
