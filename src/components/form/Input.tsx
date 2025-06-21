'use client';
import { Input as HeroInput, type InputProps } from "@heroui/react";
import { Controller, useFormContext, type FieldValues, type Path } from "react-hook-form";
import { cn } from "@/services/foundations/utilities";

function Input<T extends FieldValues>({
    label,
    name,
    className,
    ...props
  }: InputProps & { label?: string; name: Path<T> }) {
    const { control } = useFormContext<T>();
    return (
      <Controller
        name={name}
        control={control}
        render={({
          field: { name, value, onChange, onBlur, ref, ...restField },
          fieldState: { invalid, error, ...restFieldState }
        }) => (
          <HeroInput
            ref={ref}
            errorMessage={error?.message}
            validationBehavior="aria"
            isInvalid={invalid}
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
    );
  }
  
  export default Input;
  