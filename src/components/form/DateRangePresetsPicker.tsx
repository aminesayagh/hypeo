import React, { useCallback, useState } from 'react';
import {
  Radio,
  RadioGroup,
  Button,
  ButtonGroup,
  cn,
  type DateRangePickerProps,
} from '@heroui/react';
import {
  today,
  startOfWeek,
  startOfMonth,
  endOfWeek,
  endOfMonth,
  getLocalTimeZone,
  type DateValue,
} from '@internationalized/date';
import { useLocale } from '@react-aria/i18n';
import {
  type FieldValues,
  type Path,
} from 'react-hook-form';

import DateRangePicker, { type PresetConfig } from './DateRangePicker';

// ⚠️ Missing i18n keys - please add to locale file:
// - "dateRangePicker.thisWeek"
// - "dateRangePicker.nextWeek" 
// - "dateRangePicker.nextMonth"
// - "dateRangePicker.exactDates"
// - "dateRangePicker.precision.1day"
// - "dateRangePicker.precision.2days"
// - "dateRangePicker.precision.3days"
// - "dateRangePicker.precision.7days"
// - "dateRangePicker.precision.14days"
// - "dateRangePicker.precisionLabel"

// --------------------------------------------------
// Type Definitions
// --------------------------------------------------

type DateRangePresetsPickerProps<T extends FieldValues> = Omit<DateRangePickerProps, 'value' | 'onChange' | 'name'> & {
  label?: string;
  name: Path<T>;
  className?: string;
  enableTopPresets?: boolean;
  enableBottomPrecision?: boolean;
  defaultPrecision?: string;
  onPresetSelect?: (range: { start: DateValue; end: DateValue }) => void;
  onPrecisionChange?: (precision: string) => void;
}

// --------------------------------------------------
// Utility Functions
// --------------------------------------------------

const dateRangePresets_calculateDateRange = (preset: string, locale: string): { start: DateValue; end: DateValue } | null => {
  const now = today(getLocalTimeZone());
  
  switch (preset) {
    case 'this_week':
      return {
        start: now,
        end: now.add({ days: 7 }),
      };
    case 'next_week':
      return {
        start: startOfWeek(now.add({ weeks: 1 }), locale),
        end: endOfWeek(now.add({ weeks: 1 }), locale),
      };
    case 'next_month':
      return {
        start: startOfMonth(now.add({ months: 1 })),
        end: endOfMonth(now.add({ months: 1 })),
      };
    default:
      return null;
  }
};

// --------------------------------------------------
// CustomRadio Component
// --------------------------------------------------

interface CustomRadioProps {
  value: string;
  children: React.ReactNode;
}

const CustomRadio: React.FC<CustomRadioProps> = ({ children, value, ...otherProps }) => {
  return (
    <Radio
      value={value}
      classNames={{
        base: cn(
          'flex-none m-0 h-8 bg-content1 hover:bg-content2 items-center justify-between',
          'cursor-pointer rounded-full border-2 border-default-200/60',
          'data-[selected=true]:border-primary',
        ),
        label: 'text-tiny text-default-500',
        labelWrapper: 'px-1 m-0',
        wrapper: 'hidden',
      }}
      {...otherProps}
    >
      {children}
    </Radio>
  );
};

// --------------------------------------------------
// Main DateRangePresetsPicker Component
// --------------------------------------------------

function DateRangePresetsPicker<T extends FieldValues>({
  label,
  name,
  className,
  enableTopPresets = true,
  enableBottomPrecision = true,
  defaultPrecision = 'exact_dates',
  onPresetSelect,
  onPrecisionChange,
  ...heroProps
}: DateRangePresetsPickerProps<T>) {
  // --------------------------------------------------
  // Hooks
  // --------------------------------------------------
  const { locale } = useLocale();

  // --------------------------------------------------
  // State Management
  // --------------------------------------------------
  const [presets_selectedPrecision, presets_setSelectedPrecision] = useState(defaultPrecision);

  // --------------------------------------------------
  // Event Handlers
  // --------------------------------------------------
  const presets_handlePresetSelect = useCallback((presetType: string) => {
    const range = dateRangePresets_calculateDateRange(presetType, locale);
    if (range && onPresetSelect) {
      onPresetSelect(range);
    }
  }, [locale, onPresetSelect]);

  const presets_handlePrecisionChange = useCallback((precision: string) => {
    presets_setSelectedPrecision(precision);
    if (onPrecisionChange) {
      onPrecisionChange(precision);
    }
  }, [onPrecisionChange]);

  // --------------------------------------------------
  // Preset Content Components
  // --------------------------------------------------

  const presets_topContentMarkup = enableTopPresets ? (
    <ButtonGroup
      fullWidth
      className="px-3 pb-2 pt-3 bg-content1 [&>button]:text-default-500 [&>button]:border-default-200/60"
      radius="full"
      size="sm"
      variant="bordered"
    >
      <Button
        onPress={() => presets_handlePresetSelect('this_week')}
      >
        This Week {/* ⚠️ Missing i18n: t('dateRangePicker.thisWeek') */}
      </Button>
      <Button 
        onPress={() => presets_handlePresetSelect('next_week')}
      >
        Next Week {/* ⚠️ Missing i18n: t('dateRangePicker.nextWeek') */}
      </Button>
      <Button 
        onPress={() => presets_handlePresetSelect('next_month')}
      >
        Next Month {/* ⚠️ Missing i18n: t('dateRangePicker.nextMonth') */}
      </Button>
    </ButtonGroup>
  ) : null;

  const presets_bottomContentMarkup = enableBottomPrecision ? (
    <RadioGroup
      aria-label="Date precision" // ⚠️ Missing i18n: t('dateRangePicker.precisionLabel')
      classNames={{
        base: 'w-full pb-2',
        wrapper:
          '-my-2.5 py-2.5 px-3 gap-1 flex-nowrap max-w-[w-[calc(var(--visible-months)_*_var(--calendar-width))]] overflow-scroll',
      }}
      value={presets_selectedPrecision}
      onValueChange={presets_handlePrecisionChange}
      orientation="horizontal"
    >
      <CustomRadio value="exact_dates">
        Exact dates {/* ⚠️ Missing i18n: t('dateRangePicker.exactDates') */}
      </CustomRadio>
      <CustomRadio value="1_day">
        1 day {/* ⚠️ Missing i18n: t('dateRangePicker.precision.1day') */}
      </CustomRadio>
      <CustomRadio value="2_days">
        2 days {/* ⚠️ Missing i18n: t('dateRangePicker.precision.2days') */}
      </CustomRadio>
      <CustomRadio value="3_days">
        3 days {/* ⚠️ Missing i18n: t('dateRangePicker.precision.3days') */}
      </CustomRadio>
      <CustomRadio value="7_days">
        7 days {/* ⚠️ Missing i18n: t('dateRangePicker.precision.7days') */}
      </CustomRadio>
      <CustomRadio value="14_days">
        14 days {/* ⚠️ Missing i18n: t('dateRangePicker.precision.14days') */}
      </CustomRadio>
    </RadioGroup>
  ) : null;

  // --------------------------------------------------
  // Preset Configuration
  // --------------------------------------------------
  const presets_config: PresetConfig = {
    CalendarTopContent: presets_topContentMarkup,
    CalendarBottomContent: presets_bottomContentMarkup,
    calendarProps: {
      // Additional calendar configuration can be added here
    },
  };

  // --------------------------------------------------
  // Render
  // --------------------------------------------------
  return (
    <DateRangePicker<T>
      label={label}
      name={name}
      className={className}
      enablePresets={true}
      presetConfig={presets_config}
      {...heroProps}
    />
  );
}

export default DateRangePresetsPicker;

// --------------------------------------------------
// Type Exports for Consumer Usage
// --------------------------------------------------
export type { DateRangePresetsPickerProps };
