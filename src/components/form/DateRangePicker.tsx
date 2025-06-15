import {
  DateRangePicker as HeroDateRangePicker,
  type DateRangePickerProps,
} from '@heroui/react'
import {
  Controller,
  useFormContext,
  type FieldValues,
  type Path,
} from 'react-hook-form'

function DateRangePicker<T extends FieldValues>({
  label,
  name,
  className,
  ...props
}: DateRangePickerProps & { label?: string; name: Path<T> }) {
  const { control } = useFormContext<T>()
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { name, value, onChange, onBlur, ref, ...restField },
        fieldState: { invalid, error, ...restFieldState },
      }) => (
        <HeroDateRangePicker
          label={label}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          className={className}
          {...restField}
          {...restFieldState}
          {...props}
        />
      )}
    />
  )
}

export default DateRangePicker
