import {
  DateRangePicker as HeroDateRangePicker,
  type DateRangePickerProps,
} from '@heroui/react'
import { type FocusEvent, useState } from 'react'
import {
  Controller,
  useFormContext,
  type FieldValues,
  type Path,
} from 'react-hook-form'
import { parseDate } from '@internationalized/date'

import type { DateValue } from "@internationalized/date";

// --------------------------------------------------
// Type Definitions
// --------------------------------------------------

// Form-friendly date range representation
interface DateRangeValue {
  start: string | null;
  end: string | null;
}

type RangeValue<T> = {
  start: T;
  end: T;
} | null;

// Component props extending HeroUI props but removing 'name' since DateRangePicker handles a range, not individual fields
type DateRangePickerFieldProps<T extends FieldValues> = Omit<DateRangePickerProps, 'value' | 'onChange' | 'name'> & {
  label?: string | undefined;
  name: Path<T>; // This represents the entire range field in the form
}

type UIDateRangePickerProps<T extends FieldValues> = DateRangePickerFieldProps<T> & {
  value: DateRangeValue;
  onChange: (value: DateRangeValue) => void;
  onBlur: (e: FocusEvent<Element, Element>) => void;
}

// --------------------------------------------------
// Utility Functions
// --------------------------------------------------

const dateRangePicker_parseFormValue = (formValue: DateRangeValue): RangeValue<DateValue> | null => {
  if (!formValue?.start || !formValue?.end) {
    return null;
  }

  try {
    return {
      start: parseDate(formValue.start),
      end: parseDate(formValue.end),
    };
  } catch (error) {
    console.warn('Failed to parse date range from form value:', error);
    return null;
  }
};

const dateRangePicker_formatToFormValue = (heroRange: RangeValue<DateValue> | null): DateRangeValue => {
  if (!heroRange?.start || !heroRange?.end) {
    return { start: null, end: null };
  }

  return {
    start: heroRange.start.toString(),
    end: heroRange.end.toString(),
  };
};

// --------------------------------------------------
// UI DateRangePicker Component
// --------------------------------------------------

function UIDateRangePicker<T extends FieldValues>({
  label,
  className,
  value: formValue,
  onChange: onFormChange,
  onBlur,
  ...heroProps
}: UIDateRangePickerProps<T>) {
  // --------------------------------------------------
  // State Management
  // --------------------------------------------------
  const [dateRange_heroValue, dateRange_setHeroValue] = useState<RangeValue<DateValue> | null>(
    dateRangePicker_parseFormValue(formValue)
  );

  // --------------------------------------------------
  // Event Handlers
  // --------------------------------------------------
  const dateRange_handleHeroChange = (heroRange: RangeValue<DateValue> | null) => {
    // Update local state for immediate UI feedback
    dateRange_setHeroValue(heroRange);
    
    // Convert to form-friendly format and notify form
    const formattedValue = dateRangePicker_formatToFormValue(heroRange);
    onFormChange(formattedValue);
  };

  const dateRange_handleBlur = (e: FocusEvent<Element, Element>) => {
    onBlur(e);
  };

  // --------------------------------------------------
  // Render
  // --------------------------------------------------
  return (
    <HeroDateRangePicker
      label={label}
      value={dateRange_heroValue}
      onChange={dateRange_handleHeroChange}
      onBlur={dateRange_handleBlur}
      className={className}
      {...heroProps}
    />
  );
}

// --------------------------------------------------
// Main DateRangePicker Component
// --------------------------------------------------

function DateRangePicker<T extends FieldValues>({
  label,
  name, // Represents the entire date range field in the form
  className,
  ...heroProps
}: DateRangePickerFieldProps<T>) {
  // --------------------------------------------------
  // Form Integration
  // --------------------------------------------------
  const { control } = useFormContext<T>();

  // --------------------------------------------------
  // Render
  // --------------------------------------------------
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { value, onChange, onBlur, ...restField },
        fieldState: { invalid, error, ...restFieldState },
      }) => {
        // Normalize form value to ensure correct structure
        const dateRangePicker_normalizedValue: DateRangeValue = {
          start: value?.start ?? null,
          end: value?.end ?? null,
        };

        return (
          <UIDateRangePicker
            label={label}
            value={dateRangePicker_normalizedValue}
            onChange={onChange}
            onBlur={onBlur}
            className={className}
            isInvalid={invalid}
            errorMessage={error?.message}
            {...restField}
            {...restFieldState}
            {...heroProps}
          />
        );
      }}
    />
  );
}

export default DateRangePicker;

// --------------------------------------------------
// Type Exports for Consumer Usage
// --------------------------------------------------
export type { DateRangeValue, DateRangePickerFieldProps };