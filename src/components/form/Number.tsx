  import {
  NumberInput as HeroNumberInput,
  type NumberInputProps,
} from '@heroui/react'
import {
  Controller,
  useFormContext,
  type FieldValues,
  type Path,
} from 'react-hook-form'

function NumberInput<T extends FieldValues>({
  label,
  name,
  className,
  ...props
}: NumberInputProps & { label?: string; name: Path<T> }) {
  const { control } = useFormContext<T>()
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { name, value, onChange, onBlur, ...restField },
        fieldState: { ...restFieldState },
      }) => (
        <HeroNumberInput
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

export default NumberInput;