"use client";
import { Textarea as HeroTextarea } from "@heroui/react";
import { Controller, useFormContext } from "react-hook-form";

import type { FieldValues, Path } from "react-hook-form";

type TextareaProps = React.ComponentProps<typeof HeroTextarea>;

function Textarea<T extends FieldValues>({
  name,
  label,
  ...props
}: TextareaProps & { name: Path<T> }) {
  const { control, ...rest } = useFormContext<T>();
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { name, value, onChange, onBlur, ref },
        fieldState: { invalid, error }
      }) => (
        <HeroTextarea
          ref={ref}
          isRequired
          errorMessage={error?.message}
          validationBehavior="aria"
          isInvalid={invalid}
          label={label}
          name={name}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          {...rest}
          {...props}
        />
      )}
    />
  );
}

export default Textarea
