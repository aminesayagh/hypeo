"use client";
import React from "react";

import { Select as HeroSelect, SelectItem as HeroSelectItem } from "@heroui/react";
import { Controller, useFormContext } from "react-hook-form";

import type { SelectProps } from "@heroui/react";
import type { FieldValues, Path } from "react-hook-form";

function Select<T extends FieldValues, O extends object = object>({
  name,
  selectionMode,
  label,
  ...props
}: SelectProps<O> & { name: Path<T> }) {
  const { control } = useFormContext<T>();
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { name, value, onChange, onBlur, ref },
        fieldState: { invalid, error }
      }) => {
        const handleSelectionChange = (
          selectedValue: Set<string> | "all" | Set<string | number>
        ) => {
          if (selectionMode === "multiple") {
            // For multiple selection, convert Set to array
            const valueArray =
              selectedValue instanceof Set ? Array.from(selectedValue) : [];
            onChange(valueArray);
          } else {
            // For single selection, extract the first value from the Set
            const singleValue =
              selectedValue instanceof Set
                ? selectedValue.size > 0
                  ? Array.from(selectedValue)[0]
                  : undefined
                : selectedValue;
            onChange(singleValue);
          }
        };

        // Convert value to Set for defaultSelectedKeys
        const selectedKeys = Array.isArray(value)
          ? new Set<string>(value)
          : value !== undefined
            ? new Set<string>([value])
            : undefined;
        return (
          <HeroSelect<O>
            ref={ref}
            errorMessage={error?.message}
            validationBehavior="aria"
            isInvalid={invalid}
            label={label}
            name={name}
            defaultSelectedKeys={selectedKeys || []}
            value={value}
            selectionMode={selectionMode || "single"}
            onBlur={onBlur}
            onSelectionChange={handleSelectionChange}
            {...props}
          />
        );
      }}
    />
  );
}

const SelectItem = HeroSelectItem;

export { Select, SelectItem };
