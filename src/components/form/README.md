# DateRangePicker Components

This document describes the enhanced DateRangePicker components that provide both basic date range selection and advanced preset functionality.

## Components Overview

### 1. **DateRangePicker** (Enhanced Base Component)
- Form-integrated date range picker
- Optional preset support
- Follows established naming conventions
- Full TypeScript support

### 2. **DateRangePresetsPicker** (Advanced Component)
- Extends DateRangePicker with preset functionality
- Quick date selection buttons (This Week, Next Week, Next Month)
- Precision selection radio buttons (Exact dates, 1-14 days)
- Configurable preset sections

## Key Enhancements

### Enhanced DateRangePicker Features
- ✅ **Optional Preset Support**: Can be enabled with `enablePresets` prop
- ✅ **PresetConfig Interface**: Flexible configuration for custom presets
- ✅ **Form Synchronization**: Proper sync between form values and Hero UI values
- ✅ **Effect Management**: Handles external form value changes
- ✅ **Consistent Naming**: Follows established `feature_property` conventions

### DateRangePresetsPicker Features
- ✅ **Quick Preset Buttons**: This Week, Next Week, Next Month
- ✅ **Precision Selection**: Exact dates, 1-14 days
- ✅ **Configurable Sections**: Enable/disable top presets or bottom precision
- ✅ **Event Callbacks**: Custom handlers for preset selection and precision changes
- ✅ **Internationalization Ready**: Marked i18n keys for translation

## Usage Examples

### Basic DateRangePicker
```tsx
import DateRangePicker from '@/components/form/DateRangePicker';

// In your form component
<DateRangePicker<FormData>
  name="dateRange"
  label="Select Date Range"
  placeholder="Choose dates"
/>
```

### DateRangePicker with Custom Presets
```tsx
import DateRangePicker, { type PresetConfig } from '@/components/form/DateRangePicker';

const customPresetConfig: PresetConfig = {
  CalendarTopContent: <CustomTopButtons />,
  CalendarBottomContent: <CustomBottomOptions />,
  calendarProps: { /* custom props */ }
};

<DateRangePicker<FormData>
  name="dateRange"
  label="Select Date Range"
  enablePresets={true}
  presetConfig={customPresetConfig}
/>
```

### DateRangePresetsPicker (Full Featured)
```tsx
import DateRangePresetsPicker from '@/components/form/DateRangePresetsPicker';

<DateRangePresetsPicker<FormData>
  name="campaignDates"
  label="Campaign Date Range"
  onPresetSelect={(range) => console.log('Preset selected:', range)}
  onPrecisionChange={(precision) => console.log('Precision:', precision)}
/>
```

### DateRangePresetsPicker (Custom Configuration)
```tsx
<DateRangePresetsPicker<FormData>
  name="eventDates"
  label="Event Date Range"
  enableTopPresets={true}
  enableBottomPrecision={false}
  defaultPrecision="7_days"
/>
```

## Form Integration

Both components integrate seamlessly with React Hook Form:

```tsx
import { useForm, FormProvider } from 'react-hook-form';

interface FormData {
  eventDates: DateRangeValue;
  campaignDates: DateRangeValue;
}

function MyForm() {
  const methods = useForm<FormData>();
  
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <DateRangePicker<FormData>
          name="eventDates"
          label="Event Dates"
        />
        
        <DateRangePresetsPicker<FormData>
          name="campaignDates"
          label="Campaign Dates"
        />
        
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
}
```

## TypeScript Support

### Core Types
```tsx
interface DateRangeValue {
  start: string | null;
  end: string | null;
}

interface PresetConfig {
  CalendarTopContent?: React.ReactNode;
  CalendarBottomContent?: React.ReactNode;
  calendarProps?: object;
}
```

### Component Props
```tsx
type DateRangePickerFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  enablePresets?: boolean;
  presetConfig?: PresetConfig;
  // ... extends HeroUI DateRangePickerProps
}

type DateRangePresetsPickerProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  enableTopPresets?: boolean;
  enableBottomPrecision?: boolean;
  defaultPrecision?: string;
  onPresetSelect?: (range: { start: DateValue; end: DateValue }) => void;
  onPrecisionChange?: (precision: string) => void;
  // ... extends HeroUI DateRangePickerProps
}
```

## Internationalization (i18n) Requirements

⚠️ **Missing i18n Keys** - Please add these keys to your locale files:

```json
{
  "dateRangePicker": {
    "thisWeek": "This Week",
    "nextWeek": "Next Week", 
    "nextMonth": "Next Month",
    "exactDates": "Exact dates",
    "precisionLabel": "Date precision",
    "precision": {
      "1day": "1 day",
      "2days": "2 days", 
      "3days": "3 days",
      "7days": "7 days",
      "14days": "14 days"
    }
  }
}
```

Once i18n keys are added, update the component to use the Text component:

```tsx
import Text from '@/components/typo/Text';

// Replace hardcoded strings with:
<Text>{t('dateRangePicker.thisWeek')}</Text>
```

## Naming Convention Compliance

All components follow the established naming conventions:

- ✅ Feature prefix consistency: `dateRange_`, `presets_`
- ✅ State pattern: `[feature]_[property]`, `[feature]_[setter]`
- ✅ Handler pattern: `[feature]_handle[Action]`
- ✅ Markup pattern: `[feature]_markup`
- ✅ Comment sections: `// --------------------------------------------------`
- ✅ useCallback for all handlers

## File Structure

```
src/components/form/
├── DateRangePicker.tsx           # Enhanced base component
├── DateRangePresetsPicker.tsx    # Advanced preset component  
├── DateRangePickerExample.tsx    # Usage examples
└── README.md                     # This documentation
```

## Dependencies

The components leverage these well-maintained libraries:
- `@heroui/react` - UI components
- `@internationalized/date` - Date manipulation (30+ lines of complex date logic)
- `@react-aria/i18n` - Internationalization support
- `react-hook-form` - Form integration

## Browser Support

Supports all modern browsers through Hero UI and @internationalized/date compatibility.

## Testing

Test both components with various scenarios:
- Form validation with invalid date ranges
- Preset selection and form value updates
- Precision changes and their effects
- External form value changes (setValue)
- Keyboard navigation and accessibility

## Migration from Previous Version

If migrating from a basic DateRangePicker:

1. **No Breaking Changes**: Existing usage continues to work
2. **Optional Enhancements**: Add `enablePresets={true}` and `presetConfig` to enable new features
3. **Type Updates**: Import updated types if using custom preset configurations
4. **New Component**: Use `DateRangePresetsPicker` for full preset functionality

## Performance Considerations

- ✅ useCallback prevents unnecessary re-renders
- ✅ Proper effect dependencies prevent infinite loops
- ✅ Form value synchronization is optimized
- ✅ Component memoization where appropriate
