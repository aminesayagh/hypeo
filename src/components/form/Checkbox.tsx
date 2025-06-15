import { Checkbox, type CheckboxProps } from "@heroui/react";
import React, { useId } from "react";
import { Controller, type FieldValues, type Path, useFormContext } from "react-hook-form";
import { cn } from "@/services/classes";

function CheckboxUI<T extends FieldValues>({
  name,
  label,
  className,
  ...props
}: CheckboxProps & {
  name: Path<T>;
  label?: string;
  className?: string;
}) {
  const { control } = useFormContext<T>();
  const uniqueId = useId();

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { name, value, onChange, onBlur, ref },
        fieldState: { invalid, error }
      }) => {
        const checkboxId = `checkbox-${name}-${uniqueId}`;

        return (
          <div className={cn("flex flex-col gap-2", className)}>
            <div className="flex items-start gap-2">
              <Checkbox
                id={checkboxId}
                ref={ref}
                isInvalid={invalid}
                name={name}
                isSelected={!!value}
                onValueChange={onChange}
                onBlur={onBlur}
                {...props}
              >
                <span className="pb-1 text-xs">{label}</span>
              </Checkbox>
            </div>
            {error && (
              <p className="mt-1 text-xs text-danger">{error.message}</p>
            )}
          </div>
        );
      }}
    />
  );
}

export default CheckboxUI;
