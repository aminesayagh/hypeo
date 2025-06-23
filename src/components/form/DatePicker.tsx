import {
  DatePicker as HeroDatePicker,
  type DatePickerProps,
} from '@heroui/react'
import { useState } from 'react'
import {
  Controller,
  useFormContext,
  type FieldValues,
  type Path,
} from 'react-hook-form'
import { parseDate } from '@internationalized/date'

import type {DateValue} from "@internationalized/date";

function UIDatePicker<T extends FieldValues>({
  label,
  name,
  className,
  value: valueProps,
  ...props
}: DatePickerProps & { label?: string | undefined; name: Path<T>, value: string }) {
  const [value, setValue] = useState<DateValue | null>(parseDate(valueProps))
  return (
    <HeroDatePicker
      label={label}
      name={name}
      value={value}
      onChange={setValue}
      className={className}
      {...props}
    />
  )
}

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
        field: { name, value, ...restField },
        fieldState: { ...restFieldState },
      }) => (
        <UIDatePicker
          label={label}
          name={name}
          value={value?.toString() ?? ''}
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
