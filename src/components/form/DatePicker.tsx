import {
  DatePicker as HeroDatePicker,
  type DatePickerProps,
} from '@heroui/react'
import {
  Controller,
  useFormContext,
  type FieldValues,
  type Path,
} from 'react-hook-form'

function DatePicker<T extends FieldValues>({
  label,
  name,
  className,
  ...props
}: DatePickerProps & { label?: string; name: Path<T> }) {
  const { control } = useFormContext<T>()
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { name, value, onChange, onBlur, ref, ...restField },
        fieldState: { invalid, error, ...restFieldState },
      }) => (
        <HeroDatePicker
          label={label}
          name={name}
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

export default DatePicker
