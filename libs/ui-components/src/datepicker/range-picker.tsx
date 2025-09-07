import clsx from 'clsx';
import { forwardRef } from 'react';
import ReactDatePicker from 'react-datepicker';
import { BaseDatePickerProps, colorClasses, sizeClasses } from './common';
import { RenderIcon } from '../icons';
import { getIconSize } from '../common';

export type DateRangePickerProps = BaseDatePickerProps & {
  startDate?: Date | null;
  endDate?: Date | null;
  value?: [Date | null, Date | null];
  onChange?: (dates: [Date | null, Date | null]) => void;
  onClear?: () => void;
  id?: string;
};

export const DateRangePicker = forwardRef<HTMLInputElement, DateRangePickerProps>(
  (
    {
      value,
      startDate,
      endDate,
      icon = 'calendar-date-range',
      loading,
      size = 'middle',
      color = 'neutral',
      variant = 'outline',
      error,
      placeholder = 'Select date range...',
      dateFormat = 'yyyy-MM-dd',
      minDate,
      maxDate,
      isClearable = true,
      showTimeSelect,
      timeIntervals,
      locale,
      customClasses,
      onClear,
      ...rest
    },
    ref
  ) => {
    const colorClass = error ? colorClasses.error[variant] : colorClasses[color][variant];

    const onHandleClear = () => {
      if (rest.onChange) {
        rest.onChange([null, null]);
      }
      if (onClear) {
        onClear();
      }
    };

    return (
      <div className={clsx('w-full datepicker-custom relative', customClasses?.root)}>
        <ReactDatePicker
          {...rest}
          selectsRange
          startDate={value?.[0] ?? startDate ?? undefined}
          endDate={value?.[1] ?? endDate ?? undefined}
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
          withPortal={false}
          portalId="ui-components-datepicker-portal"
          shouldCloseOnSelect={false}
        />

        {isClearable && (value || []).filter(Boolean)?.length ? (
          <span
            onClick={onHandleClear}
            className={clsx(
              'absolute top-1/2 right-10 transform -translate-y-1/2 flex items-center justify-center rounded-full z-10 hover:text-error transition-all ease-linear'
            )}
          >
            <RenderIcon
              name="x-mark"
              className={clsx(
                'cursor-pointer !w-3 !h-3 text-neutral-placeholder',
                getIconSize(size),
                customClasses?.icon
              )}
            />
          </span>
        ) : null}
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

DateRangePicker.displayName = 'DateRangePicker';
